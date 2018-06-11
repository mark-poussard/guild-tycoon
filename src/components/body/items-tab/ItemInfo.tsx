import * as React from 'react';
import Item from 'model/items/Item';
import ToolTip from 'components/generic/ToolTip';

interface IItemInfoProps{
    item : Item;
    quantity : number;
}

export default class ItemInfo extends React.Component<IItemInfoProps> {
    constructor(props : IItemInfoProps){
        super(props);
    }

    render() {
        return (
            <ToolTip toolTipContent={this.renderItemInfo()}>
                <img src={this.props.item.icon} />
                {this.props.quantity}
            </ToolTip>
        );
    }

    renderItemInfo = () => {
        return (
            <div>
                <div>
                    {this.props.item.name}
                </div>
                <div>
                    {this.props.item.description}
                </div>
            </div>
        )
    }

}