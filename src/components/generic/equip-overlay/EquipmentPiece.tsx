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
import './EquipmentPiece.css'

export const NO_ICON_PATH_SPECIFIC = (type: keyof EquipmentSet) => `img/items/none_${type}.png`

interface IEquipmentPieceProps {
    hero: Hero;
    type: keyof EquipmentSet
}

interface IEquipmentPieceState {
    pieceId: string;
    isDropHover: boolean
}

export default class EquipmentPiece extends React.Component<IEquipmentPieceProps, IEquipmentPieceState>{
    storeSubscribe: fbEmitter.EventSubscription;

    constructor(props: IEquipmentPieceProps) {
        super(props);
        this.state = { pieceId: this.getPieceId(), isDropHover: false };
    }

    componentDidMount() {
        this.storeSubscribe = GameModelStore.addListener(() => {
            this.setState({
                pieceId: this.getPieceId()
            });
        });
    }

    componentWillUnmount() {
        this.storeSubscribe.remove();
    }

    render() {
        let classname = 'equipment-piece';
        if (this.state.isDropHover) {
            classname += ' drag-hover';
        }
        const piece = ItemDataArray.get(this.state.pieceId);
        let imgElement;
        if (piece) {
            imgElement = <img className={classname} src={piece.icon} />
        }
        else {
            imgElement = <img className={classname} src={NO_ICON_PATH_SPECIFIC(this.props.type)} />
        }
        return (
            <div onDrop={this.onDrop} onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDragEnter={this.preventDefault} onDoubleClick={this.onDoubleClick}>
                {imgElement}
            </div>
        );
    }

    onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        this.setState({ isDropHover: false });
        const itemId = e.dataTransfer.getData("itemId");
        if (this.checkItemValidity(itemId)) {
            GameModelDispatcher.dispatch({
                type: GameModelActionTypes.EQUIP_ITEM,
                payload: {
                    hero: this.props.hero,
                    itemId: itemId,
                    slot: this.props.type
                }
            })
        }
    }

    checkItemValidity = (itemId: string) => {
        const item = ItemDataArray.get(itemId);
        if (item instanceof Equipment) {
            const equipment = item as Equipment;
            if (EquipmentSetHelper.isEquipableInSlot(equipment, this.props.type)) {
                return true;
            }
        }
        return false;
    }

    preventDefault = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }

    onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const itemId = e.dataTransfer.getData("itemId");
        if (this.checkItemValidity(itemId)) {
            this.setState({ isDropHover: true });
        }
    }

    onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        this.setState({ isDropHover: false });
    }

    getPieceId = () => {
        return GameModelStore.getState().heroes.get(this.props.hero.data).equipment[this.props.type];
    }

    onDoubleClick = () => {
        if (this.state.pieceId) {
            GameModelDispatcher.dispatch({
                type: GameModelActionTypes.REMOVE_ITEM,
                payload: {
                    user: this.props.hero,
                    slot: this.props.type
                }
            });
        }
    }
}