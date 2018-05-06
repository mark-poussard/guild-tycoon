import Quest from 'model/Quest';

export default class Hero {
    id: string;
    name: string;
    rank: number;
    level: number;
    imgUrl: string;
    quest: Quest;
    autoQuest: boolean;
}

class _HeroHelper {
    getPower = (hero: Hero) => {
        return this.powerFormula(hero.level, hero.rank);
    }

    powerFormula = (lvl : number, rank : number) => {
        return lvl * Math.pow(3, rank - 1);
    }

    expRequiredToLevel = (hero: Hero) => {
        return hero.level * Math.pow(10, hero.rank - 1);
    }
}

export const HeroHelper = new _HeroHelper();