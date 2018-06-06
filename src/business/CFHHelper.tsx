import CallForHero from "model/CallForHero";
import Pool, { Rate } from "model/Pool";
import GameModelStore from "store/game-model/GameModelStore";
import Hero from "model/Hero";
import EquipmentSet from "model/EquipmentSet";
import GameModelDispatcher from "store/game-model/GameModelDispatcher";
import { GameModelActionTypes } from "store/game-model/GameModelActionTypes";

class CFHHelper{
    doCFH = (cfh : CallForHero) => {
        let dupId = undefined;
        let newHero : Hero = undefined;
        const rarity = this.computeRollRarity(cfh.pool.rates);
        const heroPull = this.computeHeroPull(rarity, cfh.pool);
        if(GameModelStore.getState().heroes.contains(heroPull.id)){
            dupId = heroPull.id;
        }
        else{
            newHero = {
                data : heroPull,
                level : 1,
                rank : 1,
                dupLevel : 0,
                questId : null,
                equipment : new EquipmentSet()
            }
        }

        GameModelDispatcher.dispatch({
            type : GameModelActionTypes.REGISTER_CFH_RESULT,
            payload : {
                cfh : cfh,
                hero : newHero,
                dupId : dupId
            }
        });
    }

    computeRollRarity = (rates : Rate[]) => {
        const roll = Math.random()*100;
        let prct = 0;
        for(let i=0; i<rates.length; i++){
            const pull = rates[i];
            prct += pull.nbr;
            if(roll <= prct){
                return pull.rarity;
            }
        }
        return null;
    }

    computeHeroPull = (rarity : string, pool : Pool) => {
        const roll = Math.floor(Math.random() * pool.content[rarity].length);
        return pool.content[rarity][roll];
    }
}

export default new CFHHelper();