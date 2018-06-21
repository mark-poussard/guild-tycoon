import * as FbEmitter from 'fbemitter';
import GameModelStore from 'store/game-model/GameModelStore';
import GameModelDispatcher from 'store/game-model/GameModelDispatcher';
import GameModelState from 'store/game-model/GameModelState';
import Statistics from 'model/Statistics';
import { GameModelActionTypes } from 'store/game-model/GameModelActionTypes';

export default class AchievementsHelper {
    questCompleteLastState: number;
    constructor() {
        this.questCompleteLastState = 0;
    }

    computeQuestStat = (gameState: GameModelState) => {
        const questCompleted = gameState.statistics.questCompleted;
        if (questCompleted > this.questCompleteLastState && questCompleted % 5 == 0) {
            this.questCompleteLastState = questCompleted;
            gameState.shards += 1;
        }
        return gameState;
    }
}