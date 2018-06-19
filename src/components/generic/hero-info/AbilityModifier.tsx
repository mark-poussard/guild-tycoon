import * as React from 'react';
import ModifierAbility from 'model/ModifierAbility';

interface IAbilityModifierProps {
    modifier: number;
    klass: string;
}

export default class AbilityModifier extends React.Component<IAbilityModifierProps> {
    render() {
        const isPositive = this.props.modifier >= 0;
        const modifierSign = (isPositive) ? '+' : '';
        const modifierClassname = (isPositive) ? 'ability-modifier-positive' : 'ability-modifier-negative';
        return (
            <div>
                <span className={modifierClassname}>
                    {`${modifierSign}${this.props.modifier}`}
                </span>
                <span>
                    {' against '}
                </span>
                <span>
                    {this.props.klass}
                </span>
            </div>
        )
    }
}