import * as React from 'react';
import './Resource.css';

export enum ResourceType {
    GOLD = 'gold',
    EXP = 'exp',
    FAME = 'fame',
    TIME = 'time',
}

interface IResourceProps {
    value: number | string;
    type: ResourceType;
    modifier?: boolean;
    remove?: boolean;
    inline?: boolean;
}

interface IResourceState {

}

export default class Resource extends React.Component<IResourceProps, IResourceState>{
    constructor(props: IResourceProps) {
        super(props);
    }

    render() {
        if (this.props.inline) {
            return (
                <span className="resource-container">
                    {this.renderContent()}
                </span>
            );
        }
        else {
            return (
                <div className="resource-container">
                    {this.renderContent()}
                </div>
            );
        }
    }

    renderContent = () => {
        const iconUrl = this.computeIconUrl(this.props.type);
        const colorClass = this.computeColorClass();
        const sign = this.computeSign();

        const result: JSX.Element[] = [];
        result.push(<img className="icon" src={iconUrl} />);
        result.push(
            <span className={`resource-value ${colorClass}`}>
                {`${sign}${this.props.value}`}
            </span>
        );
        return result;
    }

    computeIconUrl = (type: ResourceType) => {
        switch (type) {
            case ResourceType.EXP:
                return "img/xp.png";
            case ResourceType.GOLD:
                return "img/gold.png";
            case ResourceType.FAME:
                return "img/fame.png";
            case ResourceType.TIME:
                return "img/clock.png";
        }
    }

    computeColorClass = () => {
        if (this.props.modifier) {
            if (this.props.remove) {
                return 'remove-txt';
            }
            else {
                return 'add-txt';
            }
        }
        return '';
    }

    computeSign = () => {
        if (this.props.modifier) {
            if (this.props.remove) {
                return '-';
            }
            else {
                return '+';
            }
        }
        return '';
    }
}