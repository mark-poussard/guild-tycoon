import * as React from 'react';
import AbilityModifier from './AbilityModifier';
import ModifierAbility from 'model/ModifierAbility';

interface IBonusInfoProps {
    modAbilityList: ModifierAbility[];
}

export default class AbilityModifierList extends React.Component<IBonusInfoProps>{
    render() {
        const modifierList: JSX.Element[] = [];
        const modAbilityList = this.props.modAbilityList;
        for (const modAbility of modAbilityList) {
            for (const klass of modAbility.classes) {
                modifierList.push(<AbilityModifier key={`${klass}_MODIFIER`} modifier={modAbility.modPrct} klass={klass} />)
            }
        }
        return (
            <div>
                {modifierList}
            </div>
        );
    }
}