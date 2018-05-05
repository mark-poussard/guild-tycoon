import * as React from 'react';
import './Resource.css';

interface IResourceProps {
    value: number;
    iconUrl: string;
}

interface IResourceState {
}

export default class Resource extends React.Component<IResourceProps, IResourceState>{
    constructor(props: IResourceProps) {
        super(props);
    }

    render() {
        return (
            <span className="resource-container">
                <img src={this.props.iconUrl} />
                <span className="resource-value">{this.props.value}</span>
            </span>
        );
    }
}