import Hero from "model/Hero";
import EquipmentSetHelper from "business/EquipmentSetHelper";
import { SortOrder } from "model/Sorting";
import { HeroDataArray } from "data/HeroData";
import { rarityMaxRank } from "model/Rarity";

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

    computeHeroBA = (hero: Hero) => {
        const heroData = HeroDataArray.get(hero.data);
        const dupBonus = this.computeDupBonusBA(hero);
        const bba = heroData.bbaMult * hero.level * 4 * dupBonus;
        return bba + EquipmentSetHelper.computeBA(hero.equipment);
    }

    computeDupBonusBA = (hero: Hero) => {
        return -(1 / (0.5 * hero.dupLevel + 1)) + 2
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
            const h1Data = HeroDataArray.get(h1.data);
            const h2Data = HeroDataArray.get(h2.data);
            return h1Data.name.localeCompare(h2Data.name) * nameOrder;
        }
    }

    isMaxLevel = (hero: Hero) => {
        return hero.level >= (hero.rank * 100);
    }

    isMaxRank = (hero: Hero) => {
        const heroData = HeroDataArray.get(hero.data);
        let maxRank;
        if (heroData.maxRank) {
            maxRank = heroData.maxRank;
        }
        else {
            maxRank = rarityMaxRank[heroData.rarity];
        }
        return hero.rank >= maxRank;
    }
}

export default new HeroHelper();