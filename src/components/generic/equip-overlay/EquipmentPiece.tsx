import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import Equipment, { EquipmentType } from 'model/items/Equipment';
import Hero from 'model/Hero';
import EquipmentSet from 'model/EquipmentSet';
import { NO_ICON_PATH, ItemData, ItemDataArray } from 'data/ItemData';
import EquipmentSetHelper from 'business/EquipmentSetHelper';
import GameModelDispatcher from 'store/game-model/GameModelDispatcher';
import { GameModelActionTypes } from 'store/game-model/GameModelActionTypes';
import GameModelStore from 'store/game-model/GameModelStore';

interface IEquipmentPieceProps {
    hero: Hero;
    type: keyof EquipmentSet
}

interface IEquipmentPieceState {
    pieceId : string;
}

export default class EquipmentPiece extends React.Component<IEquipmentPieceProps, IEquipmentPieceState>{
    storeSubscribe: fbEmitter.EventSubscription;

    constructor(props : IEquipmentPieceProps){
        super(props);
        this.state = {pieceId : this.getPieceId()};
    }

    componentDidMount() {
        this.storeSubscribe = GameModelStore.addListener(() => {
            this.setState({
                pieceId : this.getPieceId()
            });
        });
    }

    componentWillUnmount() {
        this.storeSubscribe.remove();
    }

    render() {
        const piece = ItemDataArray.get(this.state.pieceId);
        let imgElement;
        if (piece) {
            imgElement = <img src={piece.icon} />
        }
        else {
            imgElement = <img src={NO_ICON_PATH} />
        }
        return (
            <div onDrop={this.onDrop} onDragOver={this.preventDefault} onDragEnter={this.preventDefault}>
                {imgElement}
            </div>
        );
    }

    onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
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

    preventDefault = (e : React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }

    getPieceId = () => {
        return GameModelStore.getState().heroes.get(this.props.hero.data.id).equipment[this.props.type];
    }
}