import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import GameModelStore from 'store/game-model/GameModelStore';
import ItemInfo from 'components/body/items-tab/ItemInfo';
import { ItemData, ItemDataArray } from 'data/ItemData';

interface IItemsTabState{
    items : {[id : string] : number};
}

export default class ItemsTab extends React.Component<{}, IItemsTabState>{
    storeSubscribe: fbEmitter.EventSubscription;

    constructor(props : {}){
        super(props);
        this.state = {items : Object.assign({}, GameModelStore.getState().items)};
    }

    componentDidMount() {
        this.storeSubscribe = GameModelStore.addListener(() => {
            this.setState({
                items : Object.assign({}, GameModelStore.getState().items)
            });
        });
    }

    componentWillUnmount() {
        this.storeSubscribe.remove();
    }

    render(){
        return (
        <div>
            {this.renderItems()}
        </div>
        );
    }

    renderItems = () => {
        const result : JSX.Element[] = [];
        let i=0;
        for(let objectId in this.state.items){
            result.push(<ItemInfo key={`ITEM_${i++}`} item={ItemDataArray.get(objectId)} quantity={this.state.items[objectId]}/>)
        }
        return result;
    }
}