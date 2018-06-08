import * as FbEmitter from 'fbemitter';
import { ReduceStore } from 'flux/utils';
import GameModelState, { StartingGameState, GameStateSerializer, GameStateDeserializer } from './GameModelState';
import GameModelPayload, {
    AddResourcePayload,
    AssignQuestPayload,
    RecruitHeroPayload,
    SetAutoQuestPayload,
    HeroLevelUpPayload,
    CompleteQuestPayload,
    CompleteDungeonPayload,
    SetImprovementPayload,
    StartQuestPayload,
    EndQuestFailPayload,
    RegisterCFHResultPayload,
    EndQuestWinPayload
} from './GameModelPayload';
import GameModelDispatcher from './GameModelDispatcher';
import { GameModelActionTypes } from './GameModelActionTypes';
import Hero from 'model/Hero';
import IndexedArray from 'business/collection/IndexedArray';
import AchievementsHelper from 'store/achievements/AchievementsHelper';
import { TrainingHelper } from 'store/TrainingHelper';
import HeroHelper from 'business/HeroHelper';
import { QuestDataArray } from 'data/QuestData';

export const CACHE_GAME_STATE_KEY = "game-state";

class GameModelStore extends ReduceStore<GameModelState, GameModelPayload> {
    eventEmitter: FbEmitter.EventEmitter;

    achievementsHelper: AchievementsHelper;
    constructor() {
        super(GameModelDispatcher);
        this.eventEmitter = new FbEmitter.EventEmitter();
        this.achievementsHelper = new AchievementsHelper();
    }

    getInitialState() {
        let gameState = localStorage.getItem(CACHE_GAME_STATE_KEY);
        if (gameState) {
            return GameStateDeserializer(gameState);
        }
        return StartingGameState();
    }

    subscribe = (action: GameModelActionTypes, listener: Function) => {
        return this.eventEmitter.addListener(action, listener);
    }

    reduce(state: GameModelState, action: GameModelPayload) {
        const newState = Object.assign({}, state);
        let payload;
        switch (action.type) {
            case GameModelActionTypes.ADD_GOLD:
                payload = action.payload as AddResourcePayload;
                newState.gold += payload.quantity;
                this.eventEmitter.emit(GameModelActionTypes.ADD_GOLD, newState);
                break;

            case GameModelActionTypes.ADD_EXP:
                payload = action.payload as AddResourcePayload;
                newState.exp += payload.quantity;
                this.eventEmitter.emit(GameModelActionTypes.ADD_EXP, newState);
                break;

            case GameModelActionTypes.ADD_FAME:
                payload = action.payload as AddResourcePayload;
                newState.fame += payload.quantity;
                this.eventEmitter.emit(GameModelActionTypes.ADD_FAME, newState);
                break;

            case GameModelActionTypes.ASSIGN_QUEST:
                payload = action.payload as AssignQuestPayload;
                if (newState.heroes.contains(payload.heroId)) {
                    //newState.heroes.get(payload.heroId).quest = payload.quest;
                }
                this.eventEmitter.emit(GameModelActionTypes.ASSIGN_QUEST, newState);
                break;

            case GameModelActionTypes.RECRUIT_HERO:
                payload = action.payload as RecruitHeroPayload;
                if (newState.heroes.size() < newState.guildSize) {
                    newState.heroes.add(payload.hero);
                }
                this.eventEmitter.emit(GameModelActionTypes.RECRUIT_HERO, newState);
                break;

            case GameModelActionTypes.SET_AUTO_QUEST:
                {
                    payload = action.payload as SetAutoQuestPayload;
                    const hero = newState.heroes.get(payload.heroId)
                    if (payload.autoQuest /*&& hero.quest && (hero.quest.quest.power > 0 || hero.quest.heroes.length > 1)*/) {
                        //Don't allow setting autoquest during quest with multiple participants or that wasn't auto-generated (dungeon quests)
                        return newState;
                    }
                    //hero.autoQuest = payload.autoQuest;
                    this.eventEmitter.emit(GameModelActionTypes.SET_AUTO_QUEST, newState);
                    break;
                }

            case GameModelActionTypes.COMPLETE_QUEST:
                payload = action.payload as CompleteQuestPayload;
                newState.statistics.questCompleted += 1;
                //this.achievementsHelper.computeQuestStat(newState);
                this.eventEmitter.emit(GameModelActionTypes.COMPLETE_QUEST, newState);
                break;

            case GameModelActionTypes.COMPLETE_DUNGEON:
                payload = action.payload as CompleteDungeonPayload;
                newState.completedDungeons.add(payload.dungeonId);
                break;

            case GameModelActionTypes.HERO_LVL_UP:
                {
                    payload = action.payload as HeroLevelUpPayload;
                    const hero = newState.heroes.get(payload.heroId);
                    const requiredExp = HeroHelper.expRequiredToLevel(hero);
                    if (newState.exp >= requiredExp) {
                        newState.exp -= requiredExp;
                        hero.level += 1;
                        this.eventEmitter.emit(GameModelActionTypes.HERO_LVL_UP, newState);
                    }
                    break;
                }

            case GameModelActionTypes.SET_IMPROVEMENT:
                {
                    payload = action.payload as SetImprovementPayload;
                    newState.improvements[payload.improvementKey] = payload.value;
                    break;
                }

            case GameModelActionTypes.TRAIN_CLICK:
                {
                    newState.statistics.trainClicks += 1;
                    if (newState.statistics.trainClicks > 0 && newState.statistics.trainClicks % TrainingHelper.computeReqClicks(newState) == 0) {
                        newState.exp += TrainingHelper.computeExpReward(newState);
                    }
                    break;
                }

            case GameModelActionTypes.START_QUEST:
                {
                    //Modifying state by side effect
                    payload = action.payload as StartQuestPayload;
                    payload.quest.startedAt = new Date().getTime();
                    for (let i = 0; i < payload.heroes.length; i++) {
                        payload.heroes[i].questId = payload.quest.id;
                    }
                    break;
                }

            case GameModelActionTypes.END_QUEST_SUCCEED:
                {
                    //Modifying state by side effect
                    payload = action.payload as EndQuestWinPayload;
                    payload.quest.completedAt = new Date().getTime();
                    //Remove ended quest id from participating heroes
                    for (let hero of newState.heroes) {
                        if (hero.questId === payload.quest.id) {
                            hero.questId = null;
                        }
                    }
                    //Add rewards
                    const questData = QuestDataArray.get(payload.quest.id);
                    newState.gold += questData.reward.gold;
                    newState.exp += questData.reward.exp;
                    //Add drops
                    for (let drop of payload.drops) {
                        if (!newState.items.hasOwnProperty(drop.item.id)) {
                            newState.items[drop.item.id] = 0;
                        }
                        newState.items[drop.item.id] += drop.quantity;
                    }
                    //Add switch
                    newState.gameSwitches[payload.quest.id] = true;
                    //Remove from active quests if non-repeatable
                    if (questData.repeat == null) {
                        let index = newState.quests.indexOf(payload.quest);
                        if (index > -1) {
                            newState.quests.splice(index, 1);
                        }
                    }
                    //Add activated quests
                    for (let questId of questData.activates) {
                        newState.quests.push({
                            id: questId,
                            completedAt: null,
                            startedAt: null
                        });
                    }
                    break;
                }

            case GameModelActionTypes.END_QUEST_FAIL:
                {
                    //Modifying state by side effect
                    payload = action.payload as EndQuestFailPayload;
                    payload.quest.startedAt = null;
                    payload.quest.completedAt = null;
                    for (let hero of newState.heroes) {
                        if (hero.questId === payload.quest.id) {
                            hero.questId = null;
                        }
                    }
                    break;
                }

            case GameModelActionTypes.REGISTER_CFH_RESULT:
                {
                    payload = action.payload as RegisterCFHResultPayload;
                    if (!newState.statistics.hasOwnProperty(payload.cfh.id)) {
                        newState.statistics[payload.cfh.id] = 0;
                    }
                    newState.statistics[payload.cfh.id] += 1;

                    if (payload.hero) {
                        newState.heroes.add(payload.hero);
                    }

                    if (payload.dupId) {
                        newState.heroes.get(payload.dupId).dupLevel += 1;
                    }
                    break;
                }

            case GameModelActionTypes.CLEAR_GAME_DATA:
                {
                    localStorage.removeItem(CACHE_GAME_STATE_KEY);
                    return StartingGameState();
                }
        }
        localStorage.setItem(CACHE_GAME_STATE_KEY, GameStateSerializer(newState));
        return newState;
    }
}

export default new GameModelStore();