import QuestReward from 'model/QuestReward';
import Activity from 'model/Activity';
import BattleEntity from 'model/BattleEntity';
import Drop from 'model/Drop';
import Duration from 'model/Duration';

export default class Quest extends Activity {
    id: string;
    title: string;
    description: string;
    ennemies: BattleEntity[];
    maxPartySize: number;
    reward: QuestReward;
    drop: Drop[];
    switchDependencies: string[];
    repeat: number;
}