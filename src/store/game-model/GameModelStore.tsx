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
    EndQuestWinPayload,
    EquipItemPayload,
    RemoveAllItemsPayload,
    RepeatQuestPayload,
    RemoveItemPayload,
    HeroRankUpPayload
} from './GameModelPayload';
import GameModelDispatcher from './GameModelDispatcher';
import { GameModelActionTypes } from './GameModelActionTypes';
import Hero from 'model/Hero';
import IndexedArray from 'business/collection/IndexedArray';
import AchievementsHelper from 'store/achievements/AchievementsHelper';
import { TrainingHelper } from 'store/TrainingHelper';
import HeroHelper from 'business/HeroHelper';
import { QuestDataArray } from 'data/QuestData';
import { ItemDataArray } from 'data/ItemData';
import Equipment, { EquipmentType } from 'model/items/Equipment';
import EquipmentSet from 'model/EquipmentSet';
import { logUserAction, clearLogs } from '../log/LogActions';
import { HeroDataArray } from 'data/HeroData';

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
                newState.shards += payload.quantity;
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
                    payload = action.payload as StartQuestPayload;
                    newState.quests[payload.quest.id].startedAt = new Date().getTime();
                    for (let hero of payload.heroes) {
                        newState.heroes.get(hero.data).questId = payload.quest.id;
                    }
                    break;
                }

            case GameModelActionTypes.END_QUEST_SUCCEED:
                {
                    payload = action.payload as EndQuestWinPayload;
                    newState.quests[payload.quest.id].completedAt = new Date().getTime();
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
                    //Add switch & stats
                    newState.gameSwitches[payload.quest.id] = true;
                    if (!newState.statistics.hasOwnProperty(payload.quest.id)) {
                        newState.statistics[payload.quest.id] = 0;
                    }
                    newState.statistics[payload.quest.id] += 1;
                    //Remove from active quests if non-repeatable
                    if (questData.repeat == null) {
                        delete newState.quests[payload.quest.id];
                    }
                    //Add activated quests
                    for (let questId of questData.activates) {
                        newState.quests[questId] = {
                            id: questId,
                            completedAt: null,
                            startedAt: null
                        }
                    }
                    //Add success to log
                    logUserAction(`Successfuly completed quest : ${questData.title}`);
                    break;
                }

            case GameModelActionTypes.END_QUEST_FAIL:
                {
                    //Modifying state by side effect
                    payload = action.payload as EndQuestFailPayload;
                    newState.quests[payload.quest.id].startedAt = null;
                    newState.quests[payload.quest.id].completedAt = null;
                    for (let hero of newState.heroes) {
                        if (hero.questId === payload.quest.id) {
                            hero.questId = null;
                        }
                    }
                    const questData = QuestDataArray.get(payload.quest.id);
                    logUserAction(`Failed quest : ${questData.title}`);
                    break;
                }

            case GameModelActionTypes.REPEAT_QUEST:
                {
                    payload = action.payload as RepeatQuestPayload;
                    newState.quests[payload.quest.id].startedAt = null;
                    newState.quests[payload.quest.id].completedAt = null;
                    break;
                }

            case GameModelActionTypes.REGISTER_CFH_RESULT:
                {
                    payload = action.payload as RegisterCFHResultPayload;

                    newState.shards -= payload.cfh.price;

                    if (!newState.statistics.hasOwnProperty(payload.cfh.id)) {
                        newState.statistics[payload.cfh.id] = 0;
                    }
                    newState.gameSwitches.firstHero = true;
                    newState.statistics[payload.cfh.id] += 1;

                    const heroId = (payload.hero) ? payload.hero.data : payload.dupId;
                    const heroData = HeroDataArray.get(heroId);
                    if (payload.hero) {
                        newState.heroes.add(payload.hero);
                        logUserAction(`Congratulations ! Your call brought a new hero to the guild : ${heroData.name}`);
                    }

                    if (payload.dupId) {
                        newState.heroes.get(payload.dupId).dupLevel += 1;
                        logUserAction(`Congratulations ! Your call upgraded your hero : ${heroData.name}`);
                    }
                    break;
                }

            case GameModelActionTypes.EQUIP_ITEM:
                {
                    payload = action.payload as EquipItemPayload;
                    const slotsToRemove: (keyof EquipmentSet)[] = [];
                    const item = ItemDataArray.get(payload.itemId) as Equipment;
                    if (payload.slot === 'leftHand' || payload.slot === 'rightHand') {
                        const otherHand = (payload.slot === 'leftHand') ? 'rightHand' : 'leftHand';
                        const otherHandItemId = payload.hero.equipment[otherHand];
                        if (otherHandItemId) {
                            const otherHandItem = ItemDataArray.get(otherHandItemId) as Equipment;
                            if (otherHandItem.type === EquipmentType.TWO_HANDED
                                || item.type === EquipmentType.TWO_HANDED) {
                                slotsToRemove.push(otherHand);
                            }
                        }
                    }
                    slotsToRemove.push(payload.slot);
                    for (let slotToRemove of slotsToRemove) {
                        //Remove slot method
                        const slotItemId = payload.hero.equipment[slotToRemove];
                        if (slotItemId) {
                            newState.heroes.get(payload.hero.data).equipment[slotToRemove] = null;
                            if (!newState.items.hasOwnProperty(slotItemId)) {
                                newState.items[slotItemId] = 0;
                            }
                            newState.items[slotItemId] += 1;
                        }
                    }
                    newState.items[payload.itemId] -= 1;
                    newState.heroes.get(payload.hero.data).equipment[payload.slot] = payload.itemId;
                    break;
                }

            case GameModelActionTypes.REMOVE_ALL_ITEMS:
                {
                    payload = action.payload as RemoveAllItemsPayload;
                    const equipmentSlots: (keyof EquipmentSet)[] = ["head", "torso", "hands", "legs", "feet", "leftHand", "rightHand"];
                    for (let slot of equipmentSlots) {
                        //Remove slot method
                        const slotItemId = payload.hero.equipment[slot];
                        if (slotItemId) {
                            newState.heroes.get(payload.hero.data).equipment[slot] = null;
                            if (!newState.items.hasOwnProperty(slotItemId)) {
                                newState.items[slotItemId] = 0;
                            }
                            newState.items[slotItemId] += 1;
                        }
                    }
                    break;
                }

            case GameModelActionTypes.REMOVE_ITEM:
                {
                    payload = action.payload as RemoveItemPayload;
                    const slotItemId = payload.hero.equipment[payload.slot];
                    if (slotItemId) {
                        newState.heroes.get(payload.hero.data).equipment[payload.slot] = null;
                        if (!newState.items.hasOwnProperty(slotItemId)) {
                            newState.items[slotItemId] = 0;
                        }
                        newState.items[slotItemId] += 1;
                    }
                    break;
                }

                case GameModelActionTypes.HERO_RANK_UP:
                    {
                        payload = action.payload as HeroRankUpPayload;
                        const heroData = HeroDataArray.get(payload.hero.data);
                        const rankUpRequirements = heroData.upgradeRequirements[payload.hero.rank];
                        for(const req of rankUpRequirements){
                            newState.items[req.item.id] -= req.quantity;
                        }
                        newState.heroes.get(payload.hero.data).rank += 1;
                        logUserAction(`You ranked up your hero : ${heroData.name}`);
                        break;
                    }

            case GameModelActionTypes.CLEAR_GAME_DATA:
                {
                    clearLogs();
                    localStorage.removeItem(CACHE_GAME_STATE_KEY);
                    return StartingGameState();
                }
        }
        localStorage.setItem(CACHE_GAME_STATE_KEY, GameStateSerializer(newState));
        return newState;
    }
}

export default new GameModelStore();