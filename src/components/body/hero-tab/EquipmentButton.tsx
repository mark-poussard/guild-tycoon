import * as React from 'react';
import Hero from 'model/Hero';
import EquipmentOverlay from 'components/generic/equip-overlay/EquipmentOverlay';

interface IEquipmentButtonProps{
    hero : Hero;
    className?:string;
}

interface IEquipmentButtonState{
    display : boolean;
}

export default class EquipmentButton extends React.Component<IEquipmentButtonProps, IEquipmentButtonState>{

    constructor(props : IEquipmentButtonProps){
        super(props);
        this.state = {display : false};
    }
    
    render(){
        return (
            <>
                <button className={`${this.props.className}`} onClick={this.showOverlay} disabled={this.cantChangeHeroEquipment()}>Equipment</button>
                <EquipmentOverlay display={this.state.display} doCancelSelection={() => this.setState({display : false})} hero={this.props.hero}/>
            </>
        )
    }

    showOverlay = () => {
        this.setState({display : true});
    }

    cantChangeHeroEquipment = () => {
        return this.props.hero.questId != null;
    }
}