import * as React from 'react';
import Overlay from 'components/generic/Overlay';
import Hero from 'model/Hero';
import EquipmentInfo from 'components/generic/equip-overlay/EquipmentInfo';
import ItemsTab from 'components/body/items-tab/ItemsTab';
import './EquipmentOverlay.css';

interface IEquipmentOverlayProps{
    display : boolean;
    doCancelSelection: () => void;
    hero : Hero;
}

export default class EquipmentOverlay extends React.Component<IEquipmentOverlayProps>{
    render(){
        return (
            <Overlay display={this.props.display} closeOverlayCallback={this.props.doCancelSelection} width={80} height={80}>
                <div className='equipment-overlay-part'>
                    <EquipmentInfo hero={this.props.hero}/>
                </div>
                <div className='equipment-overlay-part'>
                    <ItemsTab equipHero={this.props.hero}/>
                </div>
            </Overlay>
        );
    }
}