import Quest from "model/Quest";
import GameModelStore from "store/game-model/GameModelStore";
import { GameModelActionTypes } from "store/game-model/GameModelActionTypes";
import BattleEngine from "business/BattleEngine";
import GameModelDispatcher from "store/game-model/GameModelDispatcher";
import Hero from "model/Hero";

class QuestHelper {

    // Linear success chance between 80% to 120% of the reqPower
    // <80% -> 0% chance success | >120% -> 100% chance success
    computeSuccessRate = (questPower: number, heroPower: number) => {
        return (5 * heroPower) / (2 * questPower) - 2;
    }

    endQuest = (quest: Quest) => {
        const questHeroes = this.getQuestHeroes(quest);
        const isWin = BattleEngine.computeBattleResult(questHeroes, quest.ennemies);
        const actionType = (isWin)
            ? (GameModelActionTypes.END_QUEST_SUCCEED)
            : (GameModelActionTypes.END_QUEST_FAIL);
        GameModelDispatcher.dispatch({
            type: actionType,
            payload: {
                quest: quest
            }
        });
        return isWin;
    }

    getQuestHeroes = (quest: Quest) => {
        const heroes = GameModelStore.getState().heroes.asArray();
        const questHeroes = [];
        for (let i = 0; i < heroes.length; i++) {
            if (heroes[i].questId === quest.id) {
                questHeroes.push(heroes[i]);
            }
        }
        return questHeroes;
    }

    startQuest = (quest: Quest, heroes: Hero[]) => {
        GameModelDispatcher.dispatch({
            type: GameModelActionTypes.START_QUEST,
            payload: {
                heroes: heroes,
                quest: quest
            }
        })
    }
}

export default new QuestHelper();