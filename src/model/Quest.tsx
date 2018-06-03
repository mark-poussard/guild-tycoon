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
    reward: QuestReward;
    drop: Drop[];
    switchDependencies: string[];
    repeat: Duration;
}

class _QuestHelper {

    // Linear success chance between 80% to 120% of the reqPower
    // <80% -> 0% chance success | >120% -> 100% chance success
    computeSuccessRate = (questPower: number, heroPower: number) => {
        return (5 * heroPower) / (2 * questPower) - 2;
    }
}

export const QuestHelper = new _QuestHelper();