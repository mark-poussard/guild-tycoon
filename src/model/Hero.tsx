import Quest from 'model/Quest';
import BaseHero from 'model/BaseHero';
import EquipmentSet from 'model/EquipmentSet';
import EquipmentSetHelper from 'business/EquipmentSetHelper';

export default class Hero {
    data : BaseHero;
    rank: number;
    level: number;
    dupLevel : number;
    questId: string;
    equipment: EquipmentSet;
}