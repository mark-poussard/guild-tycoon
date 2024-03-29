import * as React from 'react';
import './ToolTip.css';

interface IToolTipProps {
    toolTipContent: React.ReactNode;
    position?: ToolTipPosition;
    width?: number;
}

interface IToolTipState {
    displayed: boolean;
}

export default class ToolTip extends React.Component<IToolTipProps, IToolTipState>{
    position: ToolTipPosition;

    constructor(props: IToolTipProps) {
        super(props);
        this.position = this.props.position || ToolTipPosition.RIGHT;
        this.state = { displayed: false };
    }

    render() {
        let classname;
        const positionClass = this.computePositionClass();
        if (this.state.displayed) {
            classname = 'tooltip-displayed';
        }
        else {
            classname = 'tooltip-hidden';
        }
        let width = 300;
        if (this.props.width) {
            width = this.props.width;
        }
        return (
            <div className="tooltip">
                <div onMouseEnter={this.onHover} onMouseLeave={this.onLeave}>
                    {this.props.children}
                </div>
                <div className={`tooltip-content ${classname} ${positionClass}`} style={{ width: `${width}px` }}>
                    {this.props.toolTipContent}
                </div>
            </div>
        );
    }

    onHover = (event: React.MouseEvent<HTMLDivElement>) => {
        this.setState({ displayed: true });
    }

    onLeave = (event: React.MouseEvent<HTMLDivElement>) => {
        this.setState({ displayed: false });
    }

    computePositionClass = () => {
        switch(this.position){
            case ToolTipPosition.TOP:
            return 'tooltip-position-top';
            case ToolTipPosition.BOTTOM:
            return '';
            case ToolTipPosition.LEFT:
            return '';
            case ToolTipPosition.RIGHT:
            return 'tooltip-position-right';
        }
    }
}

export enum ToolTipPosition {
    TOP = ('top'), BOTTOM = ('bottom'), LEFT = ('left'), RIGHT = ('right')
}