export default class ModifierAbility{
    classes : string[];
    modPrct : number;
    type : ModifierAbilityType;
}

export enum ModifierAbilityType{
    BOOST = 'boost',
    WEAK = 'weak'
}