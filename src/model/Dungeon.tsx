import QuestReward from 'model/QuestReward';
import { HeroHelper } from 'model/Hero';

export default class Dungeon {
    id: string;
    name: string;
    imgUrl: string;
    duration: number;
    reward: QuestReward;
    power: number;
    partyMaxSize: number;
}

class _DungeonHelper {
    getRecLevel = (dungeon: Dungeon, rank : number) => {
        return Math.ceil(dungeon.power / HeroHelper.powerMultiplier(rank));
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

    getRecommendedRank = (power : number) => {
        let rank = 1;
        let lvl = power;
        while(lvl > 30){
            rank += 1;
            lvl = power / HeroHelper.powerMultiplier(rank);
        }
        return rank;
    }

    getRecommendedLevel = (power : number) => {
        return power / HeroHelper.powerMultiplier(DungeonHelper.getRecommendedRank(power));
    }
}

export const DungeonHelper = new _DungeonHelper();