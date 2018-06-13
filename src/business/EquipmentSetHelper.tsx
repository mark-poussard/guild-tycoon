import EquipmentSet from "model/EquipmentSet";
import Equipment, { EquipmentType } from "model/items/Equipment";
import { ItemDataArray } from "data/ItemData";

class EquipmentSetHelper {
    computeBA = (set: EquipmentSet) => {
        let result = 0;
        const toSetItem = (id : string) => ItemDataArray.get(id) as Equipment;
        if (set.head) {
            result += toSetItem(set.head).ba;
        }
        if (set.torso) {
            result += toSetItem(set.torso).ba;
        }
        if (set.hands) {
            result += toSetItem(set.hands).ba;
        }
        if (set.legs) {
            result += toSetItem(set.legs).ba;
        }
        if (set.feet) {
            result += toSetItem(set.feet).ba;
        }
        if (set.leftHand) {
            result += toSetItem(set.leftHand).ba;
        }
        if (set.rightHand) {
            result += toSetItem(set.rightHand).ba;
        }
        return result;
    }

    isEquipableInSlot = (item: Equipment, slot: keyof EquipmentSet): boolean => {
        switch (item.type) {
            case EquipmentType.HEAD:
                return slot === 'head';
            case EquipmentType.TORSO:
                return slot === 'torso';
            case EquipmentType.HANDS:
                return slot === 'hands';
            case EquipmentType.LEGS:
                return slot === 'legs';
            case EquipmentType.FEET:
                return slot === 'feet';
            case EquipmentType.ONE_HANDED:
            case EquipmentType.TWO_HANDED:
                return slot === 'leftHand' || slot === 'rightHand';
            default:
                return false;
        }
    }
}

export default new EquipmentSetHelper();