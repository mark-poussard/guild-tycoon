import Item from "model/items/Item";
import IndexedArray from "business/collection/IndexedArray";
import Weapon from "model/items/Weapon";
import Equipment from "model/items/Equipment";
import * as ClassData from 'data/ClassData';
import ObjectUtils from "business/utils/ObjectUtils";

export const ItemData = {
    WOODEN_STICK: {
        id: "ITEM1",
        name: 'Wooden Stick',
        icon: '',
        ba: 1,
        classRestriction: []
    } as Equipment,
    STONE_SLING: {
        id: "ITEM2",
        name: 'Stone Sling',
        icon: '',
        ba: 4,
        classRestriction: [ClassData.MINSTREL_CLASS.name]
    } as Equipment
};

export const ItemDataArray = new IndexedArray<string, Item>(x => x.id, ...ObjectUtils.getValues(ItemData));