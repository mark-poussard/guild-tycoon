import * as FbEmitter from 'fbemitter';
import { ReduceStore } from 'flux/utils';
import GameModelState from './GameModelState';
import GameModelPayload, { AddResourcePayload, AssignQuestPayload, RecruitHeroPayload, SetAutoQuestPayload, HeroLevelUpPayload } from './GameModelPayload';
import GameModelDispatcher from './GameModelDispatcher';
import { GameModelActionTypes } from './GameModelActionTypes';
import Hero, { HeroHelper } from 'model/Hero';
import IndexedArray from 'business/collection/IndexedArray';
import AchievementsHelper from 'store/achievements/AchievementsHelper';

class GameModelStore extends ReduceStore<GameModelState, GameModelPayload> {
    eventEmitter: FbEmitter.EventEmitter;

    achievementsHelper: AchievementsHelper;
    constructor() {
        super(GameModelDispatcher);
        this.eventEmitter = new FbEmitter.EventEmitter();
        this.achievementsHelper = new AchievementsHelper();
    }

    getInitialState() {
        return {
            gold: 0,
            fame: 0,
            exp: 0,
            heroes: new IndexedArray<string, Hero>(x => x.id),
            guildSize: 10,
            statistics: {
                questCompleted: 0
            }
        } as GameModelState;
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
                return newState;

            case GameModelActionTypes.ADD_EXP:
                payload = action.payload as AddResourcePayload;
                newState.exp += payload.quantity;
                this.eventEmitter.emit(GameModelActionTypes.ADD_EXP, newState);
                return newState;

            case GameModelActionTypes.ADD_FAME:
                payload = action.payload as AddResourcePayload;
                newState.fame += payload.quantity;
                this.eventEmitter.emit(GameModelActionTypes.ADD_FAME, newState);
                return newState;

            case GameModelActionTypes.ASSIGN_QUEST:
                payload = action.payload as AssignQuestPayload;
                if (newState.heroes.contains(payload.heroId)) {
                    newState.heroes.get(payload.heroId).quest = payload.quest;
                }
                this.eventEmitter.emit(GameModelActionTypes.ASSIGN_QUEST, newState);
                return newState;

            case GameModelActionTypes.RECRUIT_HERO:
                payload = action.payload as RecruitHeroPayload;
                if (newState.heroes.size() < newState.guildSize) {
                    newState.heroes.add(payload.hero);
                }
                this.eventEmitter.emit(GameModelActionTypes.RECRUIT_HERO, newState);
                return newState;

            case GameModelActionTypes.SET_AUTO_QUEST:
                {
                    payload = action.payload as SetAutoQuestPayload;
                    const hero = newState.heroes.get(payload.heroId)
                    if (payload.autoQuest && hero.quest && (hero.quest.quest.power > 0 || hero.quest.heroes.length > 1)) {
                        //Don't allow setting autoquest during quest with multiple participants or that wasn't auto-generated (dungeon quests)
                        return newState;
                    }
                    hero.autoQuest = payload.autoQuest;
                    this.eventEmitter.emit(GameModelActionTypes.SET_AUTO_QUEST, newState);
                    return newState;
                }

            case GameModelActionTypes.COMPLETE_QUEST:
                newState.statistics.questCompleted += 1;
                this.achievementsHelper.computeQuestStat(newState);
                this.eventEmitter.emit(GameModelActionTypes.COMPLETE_QUEST, newState);
                return newState;

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
                    return newState;
                }

            default:
                return newState;
        }
    }
}

export default new GameModelStore();