import * as React from 'react';
import Item from 'model/items/Item';
import ToolTip from 'components/generic/ToolTip';
import './ItemInfo.css';
import Equipment from 'model/items/Equipment';
import GameModelDispatcher from 'store/game-model/GameModelDispatcher';
import { GameModelActionTypes } from 'store/game-model/GameModelActionTypes';
import Hero from 'model/Hero';
import ItemHelper from 'business/ItemHelper';

interface IItemInfoProps {
    item: Item;
    quantity: number;
    equipHero?: Hero;
    className?: string;
    txtColor ?: string;
    inline ?: boolean;
}

export default class ItemInfo extends React.Component<IItemInfoProps> {
    constructor(props: IItemInfoProps) {
        super(props);
    }

    render() {
        const containerStyle : React.CSSProperties = (this.props.inline)?{display:'inline-block'}:{};
        const txtStyle = (this.props.txtColor)?{color:this.props.txtColor}:{};
        return (
            <div className={`item-container ${this.props.className}`} style={containerStyle} onDragStart={this.onItemDrag} onDoubleClick={this.onDoubleClick} draggable>
                <ToolTip toolTipContent={this.renderItemInfo()}>
                    <div className='item-img-container'>
                        <img src={this.props.item.icon} />
                        <div className='item-quantity-txt' style={txtStyle}>{this.props.quantity}</div>
                    </div>
                </ToolTip>
            </div>
        );
    }

    renderItemInfo = () => {
        let statsInfo;
        if (this.props.item instanceof Equipment) {
            const equipment = this.props.item as Equipment;
            statsInfo = (
                <div className='item-stats'>
                    <div>
                        Battle Ability : {equipment.ba}
                    </div>
                    <div>
                        Type : {equipment.type}
                    </div>
                </div>
            );
        }
        return (
            <div>
                <div className='item-name'>
                    {this.props.item.name}
                </div>
                <div className='item-description'>
                    {this.props.item.description}
                </div>
                {statsInfo}
            </div>
        )
    }

    onItemDrag = (event: React.DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData("itemId", this.props.item.id);
    }

    onDoubleClick = () => {
        if (this.props.equipHero && ItemHelper.isEquipable(this.props.item)) {
            GameModelDispatcher.dispatch({
                type: GameModelActionTypes.EQUIP_ITEM,
                payload: {
                    hero: this.props.equipHero,
                    itemId: this.props.item.id,
                    slot: ItemHelper.computeSlotForItem(this.props.item, this.props.equipHero)
                }
            })
        }
    }

}