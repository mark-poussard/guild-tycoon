import Duration from "model/Duration";
import QuestReward from "./QuestReward";
import Drop from "model/Drop";
import Ennemy from "./BattleEntity";
import BaseQuest from "model/BaseQuest";

export default class DungeonBase {
    id: string;
    name: string;
    requireSwitches : string[];
    repeatIn : Duration;
    modes: { [mode in DungeonMode]?: DungeonModeBase };
}

export enum DungeonMode {
    EASY = 'EASY',
    NORMAL = 'NORMAL',
    HARD = 'HARD',
    INSANE = 'INSANE'
}

export class DungeonModeBase {
    ennemies: Ennemy[];
    duration: Duration;
    reward: QuestReward;
    drop: Drop[];
    maxPartySize : number;
}

export const dungeonToQuestData = (dungeon : DungeonBase, mode : keyof typeof DungeonMode) => {
        if(dungeon.modes.hasOwnProperty(mode)){
            const quest = new BaseQuest();
            quest.id = dungeon.id;
            quest.title = `${dungeon.name} : ${mode} mode`;
            quest.repeat = dungeon.repeatIn;
            quest.ennemies = dungeon.modes[mode].ennemies;
            quest.drop = dungeon.modes[mode].drop;
            quest.duration = dungeon.modes[mode].duration;
            quest.reward = dungeon.modes[mode].reward;
            quest.maxPartySize = dungeon.modes[mode].maxPartySize;
            quest.activates = [];
            quest.classReq = [];
            quest.description = '';
            return quest;
        }
        return null;
}