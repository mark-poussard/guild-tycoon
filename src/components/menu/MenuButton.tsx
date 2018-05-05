import * as React from 'react';
import './MenuButton.css';

interface IMenuButtonProps {
    txt: string;
    onClick : () => void;
}

interface IMenuButtonState {

}

export default class MenuButton extends React.Component<IMenuButtonProps, IMenuButtonState>{
    constructor(props: IMenuButtonProps) {
        super(props);
    }

    render() {
        return (
            <button className="menu-button" onClick={this.props.onClick}>
                {this.props.txt}
            </button>
        );
    }
}