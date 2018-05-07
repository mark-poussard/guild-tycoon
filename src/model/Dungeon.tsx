import QuestReward from 'model/QuestReward';
import { HeroHelper } from 'model/Hero';

export default class Dungeon {
    id: string;
    name: string;
    imgUrl: string;
    duration: number;
    reward: QuestReward;
    recRank: number;
    recLvl: number;
    partySize: number;
}

class _DungeonHelper {
    getPower = (dungeon: Dungeon) => {
        return HeroHelper.powerFormula(dungeon.recLvl, dungeon.recRank);
    }

    durationToString(dungeon: Dungeon) {
        const hours = Math.floor(dungeon.duration / (60000 * 60000));
        const minutes = Math.floor((dungeon.duration - hours*(60000 * 60000)) / 60000);
        const seconds = Math.floor((dungeon.duration - hours*(60000 * 60000) - minutes*60000) / 1000)

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

export const DungeonHelper = new _DungeonHelper();