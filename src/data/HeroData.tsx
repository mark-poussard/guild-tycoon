import BaseHero from "model/BaseHero";
import * as ClassData from 'data/ClassData';
import { ModifierAbilityType } from "model/ModifierAbility";
import { Rarity } from "model/Rarity";
import IndexedArray from "business/collection/IndexedArray";
import ObjectUtils from "business/utils/ObjectUtils";

export const HeroData = {
    HERO1: {
        id: 'HERO1',
        name: 'Axel',
        rarity: Rarity.SP,
        imgUrl: 'img/char/squire.png',
        bbaMult: 1.0,
        class: ClassData.SWORDSMAN_CLASS,
        description: '',
        modAbilityList: [
            {
                classes: [ClassData.MINSTREL_CLASS.name],
                modPrct: 50,
                type: ModifierAbilityType.BOOST
            },
            {
                classes: [ClassData.RASCAL_CLASS.name],
                modPrct: 20,
                type: ModifierAbilityType.BOOST
            }
        ]
    },
    HERO2 : {
        id: 'HERO2',
        name: 'Ak\'man',
        rarity: Rarity.SP,
        imgUrl: 'img/char/battle_monk.png',
        bbaMult: 1.0,
        class: ClassData.MAGE_CLASS,
        description: '',
        modAbilityList: [
            {
                classes: [ClassData.WARRIOR_CLASS.name],
                modPrct: 50,
                type: ModifierAbilityType.BOOST
            },
            {
                classes: [ClassData.MAGICAL_CLASS.name],
                modPrct: 20,
                type: ModifierAbilityType.BOOST
            }
        ]
    },
    HERO3 :{
        id: 'HERO3',
        name: 'Julia',
        rarity: Rarity.SP,
        imgUrl: 'img/char/julie.png',
        bbaMult: 1.0,
        class: ClassData.ARCHER_CLASS,
        description: '',
        modAbilityList: [
            {
                classes: [ClassData.MAGE_CLASS.name],
                modPrct: 50,
                type: ModifierAbilityType.BOOST
            },
            {
                classes: [ClassData.BEAST_CLASS.name],
                modPrct: 20,
                type: ModifierAbilityType.BOOST
            }
        ]
    }
}

export const HeroDataArray = new IndexedArray<string, BaseHero>(x => x.id, ...ObjectUtils.getValues(HeroData));