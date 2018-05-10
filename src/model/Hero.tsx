import Quest from 'model/Quest';
import QuestWrapper from 'model/QuestWrapper';
import { SortOrder } from 'model/Sorting';

export default class Hero {
    id: string;
    name: string;
    rank: number;
    level: number;
    imgUrl: string;
    quest: QuestWrapper;
    autoQuest: boolean;
}

class _HeroHelper {
    getPower = (hero: Hero) => {
        return this.powerFormula(hero.level, hero.rank);
    }

    powerFormula = (lvl: number, rank: number) => {
        return lvl * HeroHelper.powerMultiplier(rank);
    }

    powerMultiplier = (rank: number) => {
        return Math.pow(3, rank - 1);
    }

    expRequiredToLevel = (hero: Hero) => {
        return hero.level * Math.pow(3, hero.rank - 1);
    }

    //Sort by rank, then level, then name
    createHeroSort = (rankOrder: SortOrder, lvlOrder: SortOrder, nameOrder: SortOrder) => {
        return (h1: Hero, h2: Hero) => {
            let result = h1.rank - h2.rank;
            if (result != 0) {
                return result * rankOrder;
            }
            result = h1.level - h2.level;
            if (result != 0) {
                return result * lvlOrder;
            }
            return h1.name.localeCompare(h2.name) * nameOrder;
        }
    }
}

export const HeroHelper = new _HeroHelper();