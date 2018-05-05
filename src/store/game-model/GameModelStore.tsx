import { ReduceStore } from 'flux/utils';
import GameModelState from './GameModelState';
import GameModelPayload, { AddResourcePayload, AssignQuestPayload, RecruitHeroPayload } from './GameModelPayload';
import GameModelDispatcher from './GameModelDispatcher';
import { GameModelActionTypes } from './GameModelActionTypes';
import Hero from 'model/Hero';

class GameModelStore extends ReduceStore<GameModelState, GameModelPayload> {
    constructor() {
        super(GameModelDispatcher);
    }

    getInitialState() {
        return { gold: 500, fame: 40, exp: 0, heroes: [], guildSize: 5 } as GameModelState;
    }

    reduce(state: GameModelState, action: GameModelPayload) {
        const newState = Object.assign({}, state);
        let payload;
        switch (action.type) {
            case GameModelActionTypes.QUEST_END:
                return newState;

            case GameModelActionTypes.ADD_GOLD:
                payload = action.payload as AddResourcePayload;
                newState.gold += payload.quantity;
                return newState;

            case GameModelActionTypes.ADD_EXP:
                payload = action.payload as AddResourcePayload;
                newState.exp += payload.quantity;
                return newState;

            case GameModelActionTypes.ADD_FAME:
                payload = action.payload as AddResourcePayload;
                newState.fame += payload.quantity;
                return newState;

            case GameModelActionTypes.ASSIGN_QUEST:
                payload = action.payload as AssignQuestPayload;
                if (newState.heroes.length > payload.heroId) {
                    newState.heroes[payload.heroId].quest = payload.quest;
                }
                return newState;

            case GameModelActionTypes.RECRUIT_HERO:
                payload = action.payload as RecruitHeroPayload;
                if(newState.heroes.length < newState.guildSize){
                    newState.heroes.push(payload.hero);
                }
                return newState;

            default:
                return newState;
        }
    }
}

export default new GameModelStore();