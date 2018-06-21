import Item from "model/items/Item";
import IndexedArray from "business/collection/IndexedArray";
import Weapon from "model/items/Weapon";
import Equipment, { EquipmentType } from "model/items/Equipment";
import * as ClassData from 'data/ClassData';
import ObjectUtils from "business/utils/ObjectUtils";

export const NO_ICON_PATH = "img/items/none.png";

/*
    Item identification organisation :
    0-1000 : Weapons
    1000-6000 : Equipment
    6000-7000 : Orbs - rank up material
    7000-10000 : Craft materials
 */

export const ItemData = {
    // ---------------------------------- 0-1000 Weapons -------------------------------------
    WOODEN_STICK: new Equipment({
        id: "ITEM1",
        name: 'Wooden Stick',
        description : 'A sturdy branch fallen from a tree. You could throw it at something but honestly you\'re better off just keeping it for firewood.',
        icon: 'img/items/stick.png',
        ba: 1,
        classRestriction: [],
        type : EquipmentType.ONE_HANDED
    }),
    STONE_SLING: new Equipment({
        id: "ITEM2",
        name: 'Stone Sling',
        description : 'A rudimentary sling to throw stones at your ennemies.',
        icon: '',
        ba: 5,
        classRestriction: [ClassData.MINSTREL_CLASS.name],
        type : EquipmentType.TWO_HANDED
    }),
    WOODEN_SWORD: new Equipment({
        id: "ITEM3",
        name: 'Wooden Sword',
        description : '',
        icon: '',
        ba: 3,
        classRestriction: [ClassData.WARRIOR_CLASS.name],
        type : EquipmentType.ONE_HANDED
    }),
    OLD_OAK_TWIG: new Equipment({
        id: "ITEM4",
        name: 'Old Oak Twig',
        description : 'Some people say oak is a magical catalyst, maybe you could try casting a spell using this twig.',
        icon: 'img/items/stick.png',
        ba: 4,
        classRestriction: [ClassData.MAGE_CLASS.name],
        type : EquipmentType.ONE_HANDED
    }),
    BIG_ROCK: new Equipment({
        id: "ITEM5",
        name: 'Big Rock',
        description : 'A rock, it\'s quite big.',
        icon: '',
        ba: 2,
        classRestriction: [],
        type : EquipmentType.TWO_HANDED
    }),
    // ---------------------------------- 1000-6000 Equipment -------------------------------------
    LEATHER_TUNIQUE: new Equipment({
        id: "ITEM1000",
        name: 'Leather Tunique',
        description : '',
        icon: '',
        ba: 1,
        classRestriction: [],
        type : EquipmentType.TORSO
    }),
    LEATHER_GLOVES: new Equipment({
        id: "ITEM1001",
        name: 'Leather Gloves',
        description : '',
        icon: '',
        ba: 1,
        classRestriction: [],
        type : EquipmentType.HANDS
    }),
    LEATHER_BREACHES: new Equipment({
        id: "ITEM1002",
        name: 'Leather Breaches',
        description : '',
        icon: '',
        ba: 1,
        classRestriction: [],
        type : EquipmentType.LEGS
    }),
    LEATHER_BOOTS: new Equipment({
        id: "ITEM1003",
        name: 'Leather BOOTS',
        description : '',
        icon: '',
        ba: 1,
        classRestriction: [],
        type : EquipmentType.FEET
    }),
    // ---------------------------------- 6000-7000 Orbs / Rank up materials -------------------------------------
    COURAGE_ORB:{
        id: "ITEM6000",
        name: 'Orb of courage',
        description : 'There is power brewing inside this glass sphere. Keep it preciously.',
        icon: 'img/items/courage_orb.png'
    },
    SPIRIT_ORB:{
        id: "ITEM6001",
        name: 'Orb of spirit',
        description : 'There is power brewing inside this glass sphere. Keep it preciously.',
        icon: 'img/items/spirit_orb.png'
    },
    SENSES_ORB:{
        id: "ITEM6002",
        name: 'Orb of senses',
        description : 'There is power brewing inside this glass sphere. Keep it preciously.',
        icon: 'img/items/senses_orb.png'
    },
};

export const ItemDataArray = new IndexedArray<string, Item>(x => x.id, ...ObjectUtils.getValues(ItemData));