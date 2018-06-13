import * as React from 'react';
import Equipment, { EquipmentType } from 'model/items/Equipment';
import Hero from 'model/Hero';
import EquipmentSet from 'model/EquipmentSet';
import { NO_ICON_PATH, ItemData, ItemDataArray } from 'data/ItemData';
import EquipmentSetHelper from 'business/EquipmentSetHelper';
import GameModelDispatcher from 'store/game-model/GameModelDispatcher';
import { GameModelActionTypes } from 'store/game-model/GameModelActionTypes';

interface IEquipmentPieceProps {
    hero: Hero;
    type: keyof EquipmentSet
}

export default class EquipmentPiece extends React.Component<IEquipmentPieceProps>{
    render() {
        const pieceId = this.props.hero.equipment[this.props.type];
        const piece = ItemDataArray.get(pieceId);
        let imgElement;
        if (piece) {
            imgElement = <img src={piece.icon} />
        }
        else {
            imgElement = <img src={NO_ICON_PATH} />
        }
        return (
            <div onDrop={this.onDrop}>
                {imgElement}
            </div>
        );
    }

    onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        const itemId = e.dataTransfer.getData("itemId");
        const item = ItemDataArray.get(itemId);
        if (item instanceof Equipment) {
            const equipment = item as Equipment;
            if (EquipmentSetHelper.isEquipableInSlot(equipment, this.props.type)) {
                GameModelDispatcher.dispatch({
                    type: GameModelActionTypes.EQUIP_ITEM,
                    payload: {
                        hero: this.props.hero,
                        itemId: item.id,
                        slot: this.props.type
                    }
                })
            }
        }
    }
}