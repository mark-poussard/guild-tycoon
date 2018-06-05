import BattleEntity from "model/BattleEntity";
import Hero from "model/Hero";
import HeroHelper from "business/HeroHelper";

class BattleEngine {

    //True win, False lose
    computeBattleResult = (heroes: Hero[], ennemies: BattleEntity[]) => {
        const contenders = heroes.map(v => HeroHelper.computeHeroBA(v));
        contenders.sort();
        const toBeat = ennemies.map(v => v.ba);
        toBeat.sort();
        let j = 0;
        let i = 0;
        while(i < contenders.length && j < toBeat.length){
            let heroBA = contenders[i];
            let ennemyBA = toBeat[j];
            const successPrct = this.computeSuccessRate(ennemyBA, heroBA);
            const roll = Math.random();
            if (roll <= successPrct) {
                j++;
                contenders[i] = this.downgradeBAOnWin(heroBA, ennemyBA);
            }
            else{
                i++;
                toBeat[j] = this.downgradeBAOnWin(ennemyBA, heroBA);
            }
        }
        return i < contenders.length;
    }

    downgradeBAOnWin = (winBA : number, loseBA : number) => {
        return winBA - (loseBA*0.1);
    }

    // Linear success chance between 80% to 120% of the reqPower
    // <80% -> 0% chance success | >120% -> 100% chance success
    computeSuccessRate = (questPower: number, heroPower: number) => {
        return (5 * heroPower) / (2 * questPower) - 2;
    }

}

export default new BattleEngine();