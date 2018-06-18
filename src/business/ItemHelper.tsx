import Item from "model/items/Item";
import Equipment, { EquipmentType } from "model/items/Equipment";
import EquipmentSet from "model/EquipmentSet";
import Hero from "model/Hero";

class ItemHelper{

    computeSlotForItem = (item : Item, hero: Hero) : keyof EquipmentSet => {
        if(item instanceof Equipment){
            const equipment = item as Equipment;
            switch(equipment.type){
                case EquipmentType.HEAD:
                    return 'head';
                case EquipmentType.TORSO:
                    return 'torso';
                case EquipmentType.HANDS:
                    return 'hands';
                case EquipmentType.LEGS:
                    return 'legs';
                case EquipmentType.FEET:
                    return 'feet';
                case EquipmentType.TWO_HANDED:
                    return 'rightHand';
                case EquipmentType.ONE_HANDED:
                    {
                        if(hero.equipment.rightHand){
                            return 'leftHand';
                        }
                        else if(hero.equipment.leftHand){
                            return 'rightHand';
                        }
                    }
            }
        }
    }

    isEquipable = (item : Item) => {
        return item instanceof Equipment;
    }

}

export default new ItemHelper();