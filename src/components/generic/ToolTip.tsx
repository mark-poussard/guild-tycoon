import * as React from 'react';
import './ToolTip.css';

interface IToolTipProps {
    toolTipContent: React.ReactNode;
    position ?: ToolTipPosition;
    width ?: number;
}

interface IToolTipState{
    displayed : boolean;
}

export default class ToolTip extends React.Component<IToolTipProps, IToolTipState>{
    position : ToolTipPosition;

    constructor(props: IToolTipProps) {
        super(props);
        this.position = this.props.position || ToolTipPosition.RIGHT;
        this.state = {displayed : false};
    }

    render() {
        let classname;
        if(this.state.displayed){
            classname = 'tooltip-displayed';
        }
        else{
            classname = 'tooltip-hidden';
        }
        let width = 300;
        if(this.props.width){
            width = this.props.width;
        }
        return (
            <div className="tooltip" onMouseEnter={this.onHover} onMouseLeave={this.onLeave}>
                {this.props.children}
                <div className={`tooltip-content ${classname}`} style={{width:`${width}px`}}>
                    {this.props.toolTipContent}
                </div>
            </div>
        );
    }

    onHover = (event: React.MouseEvent<HTMLDivElement>) => {
        this.setState({displayed : true});
    }

    onLeave = (event: React.MouseEvent<HTMLDivElement>) => {
        this.setState({displayed : false});
    }
}

export enum ToolTipPosition{
    TOP = ('top'), BOTTOM=('bottom'), LEFT=('left'), RIGHT=('right')
}