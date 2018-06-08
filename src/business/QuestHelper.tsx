import Quest from "model/Quest";
import GameModelStore from "store/game-model/GameModelStore";
import { GameModelActionTypes } from "store/game-model/GameModelActionTypes";
import BattleEngine from "business/BattleEngine";
import GameModelDispatcher from "store/game-model/GameModelDispatcher";
import Hero from "model/Hero";
import { QuestDataArray } from "data/QuestData";
import BaseQuest from "model/BaseQuest";
import QuestDrop from "model/QuestDrop";
import EndQuestResult from "business/EndQuestResult";

class QuestHelper {

    // Linear success chance between 80% to 120% of the reqPower
    // <80% -> 0% chance success | >120% -> 100% chance success
    computeSuccessRate = (questPower: number, heroPower: number) => {
        return (5 * heroPower) / (2 * questPower) - 2;
    }

    endQuest = (quest: Quest) => {
        const questResult = new EndQuestResult();
        questResult.quest = quest;
        const questData = QuestDataArray.get(quest.id);
        const questHeroes = this.getQuestHeroes(quest);
        const isWin = (questData.ennemies) ? BattleEngine.computeBattleResult(questHeroes, questData.ennemies) : true;
        questResult.result = isWin;
        if(isWin){
            const drops = this.computeDrops(quest, questData);
            questResult.drops = drops;
            GameModelDispatcher.dispatch({
                type: GameModelActionTypes.END_QUEST_SUCCEED,
                payload: {
                    quest: quest,
                    drops : drops
                }
            });
        }
        else{
            GameModelDispatcher.dispatch({
                type: GameModelActionTypes.END_QUEST_FAIL,
                payload: {
                    quest: quest
                }
            });
        }
        return questResult;
    }

    computeDrops = (quest: Quest, questData: BaseQuest) => {
        const drops: QuestDrop[] = [];
        for (let drop of questData.drop) {
            let quantity = 0;
            for (let rate of drop.rates) {
                if (Math.random() * 100 <= rate) {
                    quantity++;
                }
                else {
                    break;
                }
            }
            if (quantity > 0) {
                drops.push({ item: drop.item, quantity: quantity });
            }
        }
        return drops;
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

    durationToString(duration: number) {
        const hours = Math.floor(duration / (60000 * 60000));
        const minutes = Math.floor((duration - hours * (60000 * 60000)) / 60000);
        const seconds = Math.floor((duration - hours * (60000 * 60000) - minutes * 60000) / 1000)

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