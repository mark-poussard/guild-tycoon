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
            startTime: new Date(),
            duration: 6000,
            power: 0,
            challengingPower: HeroHelper.getPower(hero),
            reward: {
                gold: this.computeGoldReward(fame, hero),
                exp: this.computeExpReward(hero),
                fame: 0,
                claimed: false
            }
        }
    }

    generateQuestFromDungeon = (dungeon: Dungeon, combinedPower : number): Quest => {
        dungeon.reward.claimed = false;
        return {
            startTime: new Date(),
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
        return Math.pow(10, hero.rank - 1);
    }
}