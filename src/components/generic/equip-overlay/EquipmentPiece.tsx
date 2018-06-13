import * as React from 'react';
import { EquipmentSlot } from 'model/items/Equipment';
import Hero from 'model/Hero';
import EquipmentSet from 'model/EquipmentSet';
import { NO_ICON_PATH } from 'data/ItemData';

interface IEquipmentPieceProps{
    hero : Hero;
    type : keyof EquipmentSet
}

export default class EquipmentPiece extends React.Component<IEquipmentPieceProps>{
    render(){
        let piece = this.props.hero.equipment[this.props.type];
        let imgElement;
        if(piece){
            imgElement = <img src={piece.icon} />
        }
        else{
            imgElement = <img src={NO_ICON_PATH}/>
        }
        return (
            <div>
                {imgElement}
            </div>
        );
    }
}