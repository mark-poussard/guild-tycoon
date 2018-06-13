import * as React from 'react';
import Overlay from 'components/generic/Overlay';
import Hero from 'model/Hero';

interface IEquipmentOverlayProps{
    display : boolean;
    doCancelSelection: () => void;
    hero : Hero;
}

export default class EquipmentOverlay extends React.Component<IEquipmentOverlayProps>{
    render(){
        return (
            <Overlay display={this.props.display} closeOverlayCallback={this.props.doCancelSelection} width={80} height={80}>
                <div style={{width:'50%', float:'left'}}>
                </div>
                <div style={{width:'50%', float:'left'}}>
                </div>
            </Overlay>
        );
    }
}