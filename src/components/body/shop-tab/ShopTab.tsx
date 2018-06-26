import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import GameModelStore from 'store/game-model/GameModelStore';
import { shopData } from 'data/ShopData';
import ShopItemInfo from './ShopItemInfo';

interface IShopTabProps {

}

interface IShopTabState {
    gold: number;
}

export default class ShopTab extends React.Component<IShopTabProps, IShopTabState> {
    storeSubscribe: fbEmitter.EventSubscription;

    constructor(props: IShopTabProps) {
        super(props);
        this.state = { gold: GameModelStore.getState().gold };
    }

    render() {
        const shopItems: JSX.Element[] = [];
        for (const shopItem of shopData) {
            shopItems.push(<ShopItemInfo key={`SHOPITEM_${shopItem.item.id}`} shopItem={shopItem} playerGold={this.state.gold} />);
        }
        return (
            <div>
                {shopItems}
            </div>
        )
    }
    componentDidMount() {
        this.storeSubscribe = GameModelStore.addListener(() => {
            this.setState({
                gold: GameModelStore.getState().gold
            });
        });
    }

    componentWillUnmount() {
        this.storeSubscribe.remove();
    }
}