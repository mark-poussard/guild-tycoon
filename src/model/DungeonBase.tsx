import Duration from "model/Duration";
import QuestReward from "./QuestReward";
import Drop from "model/Drop";
import Ennemy from "./BattleEntity";

export default class DungeonBase {
    id: string;
    name: string;
    requireSwitches : string[];
    repeatIn : Duration;
    modes: { [mode in DungeonMode]?: DungeonModeBase };
}

export enum DungeonMode {
    EASY = 'easy',
    NORMAL = 'normal',
    HARD = 'hard',
    INSANE = 'insane'
}

export class DungeonModeBase {
    ennemies: Ennemy[];
    duration: Duration;
    reward: QuestReward;
    drop: Drop[];
}