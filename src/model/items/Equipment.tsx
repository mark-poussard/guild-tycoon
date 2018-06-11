import Item from "model/items/Item";

export default class Equipment extends Item {
    ba: number;
    classRestriction: string[];
    slot: EquipmentSlot;
}

export enum EquipmentSlot {
    HEAD = ('head'),
    TORSO = ('torso'),
    HANDS = ('hands'),
    LEGS = ('legs'),
    FEET = ('feet'),
    ONE_HANDED = ('one_handed'),
    TWO_HANDED = ('two_handed')
}