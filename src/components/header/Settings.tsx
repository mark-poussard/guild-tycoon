import * as React from 'react';
import Overlay from 'components/generic/Overlay';
import GameModelDispatcher from 'store/game-model/GameModelDispatcher';
import { GameModelActionTypes } from 'store/game-model/GameModelActionTypes';

interface ISettingsProps {

}

interface ISettingsState {
    displayed: boolean;
}

export default class Settings extends React.Component<ISettingsProps, ISettingsState>{
    constructor(props: ISettingsProps) {
        super(props);
        this.state = { displayed: false };
    }

    render() {
        return (
            <div>
                <i style={{fontSize:"32px", margin:"3px"}} onClick={this.displayOverlay} className="fa fa-cog"></i>
                <Overlay display={this.state.displayed} closeOverlayCallback={this.closeOverlay} width={40} height={60}>
                    <button>Clear saved game data</button>
                </Overlay>
            </div>
        );
    }

    displayOverlay = () => {
        this.setState({ displayed: true });
    }

    closeOverlay = () => {
        this.setState({ displayed: false });
    }

    clearGameData = () => {
        GameModelDispatcher.dispatch({ type: GameModelActionTypes.CLEAR_GAME_DATA, payload: {} });
    }
}