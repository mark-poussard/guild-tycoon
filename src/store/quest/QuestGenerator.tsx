import Quest from 'model/Quest';
import Hero, { HeroHelper } from 'model/Hero';
import Dungeon, { DungeonHelper } from 'model/Dungeon';
import GameModelStore from 'store/game-model/GameModelStore';

export default class QuestGenerator {
    constructor() {
    }

    generateAutoQuest = (heroId: string): Quest => {
        const hero = GameModelStore.getState().heroes.get(heroId);
        const fame = GameModelStore.getState().fame;
        return {
            duration: 6000,
            power: 0,
            challengingPower: HeroHelper.getPower(hero),
            reward: {
                gold: this.computeGoldReward(fame, hero),
                exp: this.computeExpReward(hero),
                fame: 0,
            }
        }
    }

    generateQuestFromDungeon = (dungeon: Dungeon, combinedPower : number): Quest => {
        return {
            duration: dungeon.duration,
            reward: dungeon.reward,
            power: DungeonHelper.getPower(dungeon),
            challengingPower: combinedPower,
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
        return Math.pow(3, hero.rank - 1);
    }
}