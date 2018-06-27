import * as React from 'react';
import ShopItem from 'model/items/ShopItem';
import Resource, { ResourceType } from '../../generic/resource/Resource';
import GameModelDispatcher from 'store/game-model/GameModelDispatcher';
import { GameModelActionTypes } from 'store/game-model/GameModelActionTypes';
import ItemInfo from 'components/body/items-tab/ItemInfo';
import './ShopItemInfo.css';

interface IShopitemInfoProps {
    shopItem: ShopItem;
    playerGold: number;
}

export default class ShopItemInfo extends React.Component<IShopitemInfoProps>{
    render() {
        return (
            <div className={`container shop-item-container`}>
                <h3>{this.props.shopItem.item.name}</h3>
                <ItemInfo item={this.props.shopItem.item} quantity={1} />
                <Resource type={ResourceType.GOLD} value={this.props.shopItem.shopPrice} modifier remove />
                <button disabled={!this.canBuy()} onClick={this.buy}>Buy</button>
            </div>
        );
    }

    canBuy = () => {
        return this.props.playerGold >= this.props.shopItem.shopPrice;
    }

    buy = () => {
        GameModelDispatcher.dispatch({
            type: GameModelActionTypes.BUY_ITEM,
            payload: {
                itemId: this.props.shopItem.item.id,
                price: this.props.shopItem.shopPrice
            }
        });
    }
}