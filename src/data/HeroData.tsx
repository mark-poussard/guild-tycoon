import BaseHero from "model/BaseHero";
import * as ClassData from 'data/ClassData';
import { ModifierAbilityType } from "model/ModifierAbility";
import { Rarity } from "model/Rarity";

export const HERO1 : BaseHero = {
    id:'HERO1',
    name:'Axel',
    rarity:Rarity.SP,
    imgUrl:'img/char/squire.png',
    bbaMult:1.0,
    class : ClassData.SWORDSMAN_CLASS,
    description:'',
    modAbilityList:[
        {
            classes: [ClassData.MINSTREL_CLASS.name],
            modPrct:50,
            type:ModifierAbilityType.BOOST
        },
        {
            classes: [ClassData.RASCAL_CLASS.name],
            modPrct:20,
            type:ModifierAbilityType.BOOST
        }
    ]
}

export const HERO2 : BaseHero = {
    id:'HERO2',
    name:'Ak\'man',
    rarity:Rarity.SP,
    imgUrl:'img/char/battle_monk.png',
    bbaMult:1.0,
    class : ClassData.MAGE_CLASS,
    description:'',
    modAbilityList:[
        {
            classes: [ClassData.WARRIOR_CLASS.name],
            modPrct:50,
            type:ModifierAbilityType.BOOST
        },
        {
            classes: [ClassData.MAGICAL_CLASS.name],
            modPrct:20,
            type:ModifierAbilityType.BOOST
        }
    ]
}

export const HERO3 : BaseHero = {
    id:'HERO3',
    name:'Julia',
    rarity:Rarity.SP,
    imgUrl:'img/char/julie.png',
    bbaMult:1.0,
    class : ClassData.ARCHER_CLASS,
    description:'',
    modAbilityList:[
        {
            classes: [ClassData.MAGE_CLASS.name],
            modPrct:50,
            type:ModifierAbilityType.BOOST
        },
        {
            classes: [ClassData.BEAST_CLASS.name],
            modPrct:20,
            type:ModifierAbilityType.BOOST
        }
    ]
}