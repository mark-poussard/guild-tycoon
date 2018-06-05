import Class from "model/Class";
import ModifierAbility from "model/ModifierAbility";
import { Rarity } from "model/Rarity";

export default class BaseHero{
    id : string;
    name : string;
    rarity : Rarity;
    imgUrl: string;
    bbaMult : number;
    class : Class;
    description : string;
    modAbilityList : ModifierAbility[];
}