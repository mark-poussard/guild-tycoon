import * as React from 'react';
import './Overlay.css';

interface IOverlayProps {
    display: boolean;
    closeOverlayCallback: () => void;
    width: number;
    height: number;
}

interface IOverlayState {

}

export default class Overlay extends React.Component<IOverlayProps, IOverlayState>{
    constructor(props: IOverlayProps) {
        super(props);
    }

    render() {
        const heightOffset = (100 - this.props.height) / 2;
        const widthOffset = (100 - this.props.width) / 2;
        if (this.props.display) {
            return (
                <div className="blackout" onClick={this.closeOverlay}>
                    <div style={{
                        top: `${heightOffset}%`,
                        bottom: `${heightOffset}%`,
                        left: `${widthOffset}%`,
                        right: `${widthOffset}%`,
                    }} className="overlay" onClick={this.dontCloseOverlay}>
                        <input className="cross" type="image" src="img/cross.png" onClick={this.closeOverlay} />
                        {this.props.children}
                    </div>
                </div>
            );
        }
        return null;
    }

    closeOverlay = () => {
        this.props.closeOverlayCallback();
    }

    dontCloseOverlay = (e: any) => {
        e.stopPropagation();
    }
}