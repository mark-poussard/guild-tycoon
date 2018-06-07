import Quest from "model/Quest";
import GameModelStore from "store/game-model/GameModelStore";
import { GameModelActionTypes } from "store/game-model/GameModelActionTypes";
import BattleEngine from "business/BattleEngine";
import GameModelDispatcher from "store/game-model/GameModelDispatcher";
import Hero from "model/Hero";
import { QuestData } from "data/QuestData";

class QuestHelper {

    // Linear success chance between 80% to 120% of the reqPower
    // <80% -> 0% chance success | >120% -> 100% chance success
    computeSuccessRate = (questPower: number, heroPower: number) => {
        return (5 * heroPower) / (2 * questPower) - 2;
    }

    endQuest = (quest: Quest) => {
        const questData = QuestData.get(quest.id);
        const questHeroes = this.getQuestHeroes(quest);
        const isWin = (questData.ennemies)?BattleEngine.computeBattleResult(questHeroes, questData.ennemies):true;
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
        const heroes = GameModelStore.getState().heroes;
        const questHeroes = [];
        for (let hero of heroes) {
            if (hero.questId === quest.id) {
                questHeroes.push(hero);
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

    durationToString(duration : number) {
        const hours = Math.floor(duration / (60000 * 60000));
        const minutes = Math.floor((duration - hours*(60000 * 60000)) / 60000);
        const seconds = Math.floor((duration - hours*(60000 * 60000) - minutes*60000) / 1000)

        let hourStr = hours.toString();
        if (hourStr.length < 2) {
            hourStr = '0' + hourStr;
        }
        let minutesStr = minutes.toString();
        if (minutesStr.length < 2) {
            minutesStr = '0' + minutesStr;
        }
        let secondsStr = seconds.toString();
        if (secondsStr.length < 2) {
            secondsStr = '0' + secondsStr;
        }
        return hourStr + ':' + minutesStr + ':' + secondsStr;
    }
}

export default new QuestHelper();