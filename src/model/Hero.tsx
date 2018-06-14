import BaseHero from 'model/BaseHero';
import EquipmentSet from 'model/EquipmentSet';

export default class Hero {
    data : string;
    rank: number;
    level: number;
    dupLevel : number;
    questId: string;
    equipment: EquipmentSet;
}