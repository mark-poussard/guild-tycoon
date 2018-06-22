import * as React from 'react';

export interface ITabProps {
    name: string;
}

export default class Tab extends React.Component<ITabProps>{
    render() {
        return this.props.children;
    }
}