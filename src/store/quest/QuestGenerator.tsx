import Quest from 'model/Quest';
import Hero, { HeroHelper } from 'model/Hero';
import GameModelStore from 'store/game-model/GameModelStore';

export default class QuestGenerator {
    constructor() {
    }

    generateQuest = (heroId: string): Quest => {
        const hero = GameModelStore.getState().heroes.get(heroId);
        const fame = GameModelStore.getState().fame;
        return {
            startTime: new Date(),
            duration: 6000,
            reward: {
                gold: this.computeGoldReward(fame, hero),
                exp: this.computeExpReward(hero)
            }
        }
    }

    computeGoldReward = (fame: number, hero: Hero) => {
        let result = fame / 5;
        if (result < 1) {
            result = 1;
        }
        return Math.round(result) + HeroHelper.getPower(hero);
    }

    computeExpReward = (hero: Hero) => {
        return Math.pow(10, hero.rank - 1);
    }
}