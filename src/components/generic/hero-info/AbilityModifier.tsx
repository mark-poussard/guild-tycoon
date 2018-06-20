import * as React from 'react';
import ModifierAbility from 'model/ModifierAbility';
import './AbilityModifier.css'

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
                    {`${modifierSign}${this.props.modifier}% BA`}
                </span>
                <span>
                    {' against '}
                </span>
                <span className={modifierClassname}>
                    {this.props.klass}
                </span>
            </div>
        )
    }
}