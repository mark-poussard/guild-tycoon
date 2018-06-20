import BaseHero from "model/BaseHero";
import * as ClassData from 'data/ClassData';
import ModifierAbility, { ModifierAbilityType } from "model/ModifierAbility";
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
        class: ClassData.ELEMENTALIST_CLASS,
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
    },
    HERO4 :{
        id: 'HERO4',
        name: 'Stefan',
        rarity: Rarity.T,
        imgUrl: 'img/char/julie.png',
        bbaMult: 1.0,
        class: ClassData.THIEF_CLASS,
        description: 'Orphaned at a young age he grew up on the busy streets of capital city surviving off larceny and small sketchy jobs. As he came of age he met a wonderful woman and together they had a beautiful baby girl. Now he sells his special set of skills to the highest bidder in order to provide for his family.',
        modAbilityList: [] as ModifierAbility[]
    },
    HERO5 :{
        id: 'HERO5',
        name: 'Caleb',
        rarity: Rarity.T,
        imgUrl: 'img/char/julie.png',
        bbaMult: 1.0,
        class: ClassData.SWORDSMAN_CLASS,
        description: 'Son of a murdered nobleman, he was brought up in a capital city orphanage. There he learned from the pious sisters about the sins of upper society that ultimately brought death to his family. When he came of age he bought an old rusty sword and swore to avenge his fallen father and bring down the country\'s degenerate aristocracy.',
        modAbilityList: [] as ModifierAbility[]
    },
    HERO6 :{
        id: 'HERO6',
        name: 'Vy',
        rarity: Rarity.T,
        imgUrl: 'img/char/julie.png',
        bbaMult: 1.0,
        class: ClassData.ELEMENTALIST_CLASS,
        description: 'Daughter of a wealthy family of merchants, her arcane education started at a young age and she studied under some of the most talented sorcerers of our time. She left her family on a disagrement as they were seeking to use her arcane abilities to expand the family business whereas she knew she was meant to serve a higher purpose.',
        modAbilityList: [] as ModifierAbility[]
    },
    HERO7 :{
        id: 'HERO7',
        name: 'Mai',
        rarity: Rarity.T,
        imgUrl: 'img/char/julie.png',
        bbaMult: 1.0,
        class: ClassData.ARCHER_CLASS,
        description: '.',
        modAbilityList: [] as ModifierAbility[]
    }
}

export const HeroDataArray = new IndexedArray<string, BaseHero>(x => x.id, ...ObjectUtils.getValues(HeroData));