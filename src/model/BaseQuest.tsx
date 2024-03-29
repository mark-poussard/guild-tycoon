import QuestReward from 'model/QuestReward';
import Activity from 'model/Activity';
import Ennemy from 'model/BattleEntity';
import Drop from 'model/Drop';
import Duration from 'model/Duration';

export default class BaseQuest {
    id: string;
    title: string;
    description: string;
    ennemies: Ennemy[];
    maxPartySize: number;
    reward: QuestReward;
    drop: Drop[];
    activates: string[];
    repeat: Duration;
    duration: Duration;
    classReq : string[];
}