import Item from "model/items/Item";
import { ItemData } from "data/ItemData";

export default class UpgradeRequirements {
    [rank: number]: { item: Item, quantity: number }[];
}

export const WARRIOR_REQUIREMENTS: UpgradeRequirements = {
    1: [
        {
            item: ItemData.COURAGE_ORB,
            quantity: 5
        }
    ]
}

export const MINSTREL_REQUIREMENTS: UpgradeRequirements = {
    1: [
        {
            item: ItemData.SENSES_ORB,
            quantity: 5
        }
    ]
}

export const MAGE_REQUIREMENTS: UpgradeRequirements = {
    1: [
        {
            item: ItemData.SPIRIT_ORB,
            quantity: 5
        }
    ]
}