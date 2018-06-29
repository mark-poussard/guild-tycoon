import Quest from "model/Quest";
import Hero from "model/Hero";
import { DungeonMode } from "model/DungeonBase";
import GameModelDispatcher from "store/game-model/GameModelDispatcher";
import { GameModelActionTypes } from "store/game-model/GameModelActionTypes";
import QuestHelper from "business/QuestHelper";

class DungeonHelper{

    startDungeon = (quest: Quest, heroes : Hero[], mode : DungeonMode) => {
        GameModelDispatcher.dispatch({
            type : GameModelActionTypes.SUBMIT_DUNGEON,
            payload : {
                questId : quest.id,
                mode : mode
            }
        });
        QuestHelper.startQuest(quest, heroes);
    }

    endDungeon = (quest : Quest) => {
        GameModelDispatcher.dispatch({
            type : GameModelActionTypes.CLEAR_DUNGEON,
            payload : {
                questId : quest.id
            }
        });
    }

}

export default new DungeonHelper();