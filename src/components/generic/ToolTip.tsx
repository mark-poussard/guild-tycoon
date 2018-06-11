import * as React from 'react';
import './ToolTip.css';

interface IToolTipProps {
    toolTipContent: React.ReactNode;
    position ?: ToolTipPosition;
}

export default class ToolTip extends React.Component<IToolTipProps>{
    position : ToolTipPosition;

    constructor(props: IToolTipProps) {
        super(props);
        this.position = this.props.position || ToolTipPosition.RIGHT;
    }

    render() {
        return (
            <div className="tooltip">
                {this.props.children}
                <span className={`tooltiptext ${this.position}`}>
                    {this.props.toolTipContent}
                </span>
            </div>
        );
    }
}

export enum ToolTipPosition{
    TOP = ('top'), BOTTOM=('bottom'), LEFT=('left'), RIGHT=('right')
}