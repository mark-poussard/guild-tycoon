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

export const ItemData : {[itemId : string] : Item} = {
    // ---------------------------------- 0-1000 Weapons -------------------------------------
    WOODEN_STICK: new Equipment({
        id: "ITEM1",
        name: 'Wooden Stick',
        description : 'A sturdy branch fallen from a tree. You could throw it at something but honestly you\'re better off just keeping it for firewood.',
        icon: 'img/items/stick.png',
        ba: 1,
        classRestriction: [],
        type : EquipmentType.ONE_HANDED,
        price : 0
    }),
    STONE_SLING: new Equipment({
        id: "ITEM2",
        name: 'Stone Sling',
        description : 'A rudimentary sling to throw stones at your ennemies.',
        icon: '',
        ba: 8,
        classRestriction: [ClassData.MINSTREL_CLASS.name],
        type : EquipmentType.TWO_HANDED,
        price : 2
    }),
    WOODEN_SWORD: new Equipment({
        id: "ITEM3",
        name: 'Wooden Sword',
        description : 'Careful with that, you might actually manage to hurt someone.',
        icon: '',
        ba: 5,
        classRestriction: [ClassData.WARRIOR_CLASS.name],
        type : EquipmentType.ONE_HANDED,
        price : 2
    }),
    OLD_OAK_TWIG: new Equipment({
        id: "ITEM4",
        name: 'Old Oak Twig',
        description : 'Some people say oak is a magical catalyst, maybe you could try casting a spell using this twig.',
        icon: 'img/items/stick.png',
        ba: 4,
        classRestriction: [ClassData.MAGE_CLASS.name],
        type : EquipmentType.ONE_HANDED,
        price : 5
    }),
    BIG_ROCK: new Equipment({
        id: "ITEM5",
        name: 'Big Rock',
        description : 'A rock, it\'s quite big.',
        icon: '',
        ba: 2,
        classRestriction: [],
        type : EquipmentType.TWO_HANDED,
        price : 0
    }),
    // ---------------------------------- 1000-6000 Equipment -------------------------------------
    RAGGED_SHIRT: new Equipment({
        id: "ITEM1000",
        name: 'Ragged Shirt',
        description : 'A piece of cloth that passes for a shirt.',
        icon: '',
        ba: 3,
        classRestriction: [],
        type : EquipmentType.TORSO,
        price : 1
    }),
    RAGGED_GLOVES: new Equipment({
        id: "ITEM1001",
        name: 'Ragged Gloves',
        description : 'Looks like an old sock in which someone would had pocked holes.',
        icon: '',
        ba: 1,
        classRestriction: [],
        type : EquipmentType.HANDS,
        price : 1
    }),
    RAGGED_BREACHES: new Equipment({
        id: "ITEM1002",
        name: 'Ragged Breaches',
        description : 'Barely covers up your underwear.',
        icon: '',
        ba: 2,
        classRestriction: [],
        type : EquipmentType.LEGS,
        price : 1
    }),
    RAGGED_BOOTS: new Equipment({
        id: "ITEM1003",
        name: 'Ragged Boots',
        description : 'Somehow manages to protect the sole of your feet.',
        icon: '',
        ba: 1,
        classRestriction: [],
        type : EquipmentType.FEET,
        price : 1
    }),
    // ---------------------------------- 6000-7000 Orbs / Rank up materials -------------------------------------
    COURAGE_ORB:{
        id: "ITEM6000",
        name: 'Orb of courage',
        description : 'There is power brewing inside this glass sphere. Keep it preciously.',
        icon: 'img/items/courage_orb.png',
        price : 5
    },
    SPIRIT_ORB:{
        id: "ITEM6001",
        name: 'Orb of spirit',
        description : 'There is power brewing inside this glass sphere. Keep it preciously.',
        icon: 'img/items/spirit_orb.png',
        price : 5
    },
    SENSES_ORB:{
        id: "ITEM6002",
        name: 'Orb of senses',
        description : 'There is power brewing inside this glass sphere. Keep it preciously.',
        icon: 'img/items/senses_orb.png',
        price : 5
    },
};

export const ItemDataArray = new IndexedArray<string, Item>(x => x.id, ...ObjectUtils.getValues(ItemData));