import Hero from "model/Hero";
import EquipmentSetHelper from "business/EquipmentSetHelper";
import { SortOrder } from "model/Sorting";

class HeroHelper {
    getPower = (hero: Hero) => {
        return this.powerFormula(hero.level, hero.rank);
    }

    powerFormula = (lvl: number, rank: number) => {
        return lvl * this.powerMultiplier(rank);
    }

    powerMultiplier = (rank: number) => {
        return Math.pow(3, rank - 1);
    }

    expRequiredToLevel = (hero: Hero) => {
        return hero.level * Math.pow(3, hero.rank - 1);
    }

    computeHeroBA = (hero : Hero) => {
        const dupBonus = 1.0;
        const bba = hero.data.bbaMult * hero.level * 4 * dupBonus;
        return bba + EquipmentSetHelper.computeBA(hero.equipment);
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
            return h1.data.name.localeCompare(h2.data.name) * nameOrder;
        }
    }
}

export default new HeroHelper();