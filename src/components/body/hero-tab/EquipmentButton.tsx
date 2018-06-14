import * as React from 'react';
import Hero from 'model/Hero';
import EquipmentOverlay from 'components/generic/equip-overlay/EquipmentOverlay';

interface IEquipmentButtonProps{
    hero : Hero;
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
                <button onClick={this.showOverlay}>Equipment</button>
                <EquipmentOverlay display={this.state.display} doCancelSelection={() => this.setState({display : false})} hero={this.props.hero}/>
            </>
        )
    }

    showOverlay = () => {
        this.setState({display : true});
    }
}