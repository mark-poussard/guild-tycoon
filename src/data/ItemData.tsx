import Item from "model/items/Item";
import IndexedArray from "business/collection/IndexedArray";
import Weapon from "model/items/Weapon";
import Equipment, { EquipmentSlot } from "model/items/Equipment";
import * as ClassData from 'data/ClassData';
import ObjectUtils from "business/utils/ObjectUtils";

export const NO_ICON_PATH = "img/items/none.png";

export const ItemData = {
    WOODEN_STICK: {
        id: "ITEM1",
        name: 'Wooden Stick',
        description : '',
        icon: 'img/items/stick.png',
        ba: 1,
        classRestriction: [],
        slot : EquipmentSlot.ONE_HANDED
    } as Equipment,
    STONE_SLING: {
        id: "ITEM2",
        name: 'Stone Sling',
        description : '',
        icon: '',
        ba: 4,
        classRestriction: [ClassData.MINSTREL_CLASS.name],
        slot : EquipmentSlot.TWO_HANDED
    } as Equipment
};

export const ItemDataArray = new IndexedArray<string, Item>(x => x.id, ...ObjectUtils.getValues(ItemData));