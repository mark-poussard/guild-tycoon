import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import * as CFHData from 'data/CFHData';
import GameModelStore from 'store/game-model/GameModelStore';
import CallInfo from 'components/body/call-tab/CallInfo';

interface ICallTabState {
    beginnerCFH: boolean;
}

export default class CallTab extends React.Component<{}, ICallTabState>{
    storeSubscribe: fbEmitter.EventSubscription;

    constructor(props: {}) {
        super(props);
        this.state = { beginnerCFH: false };
    }

    render() {
        return (
            <div>
                <h3>Perform a Call For Heroes !</h3>
            </div>
        );
    }

    componentWillMount() {
        this.storeSubscribe = GameModelStore.addListener(() => {
            this.setState({
                beginnerCFH: GameModelStore.getState().gameSwitches['beginnerCFH']
            });
        });
    }

    componentWillUnmount() {
        if (this.storeSubscribe) {
            this.storeSubscribe.remove();
        }
    }

    renderAvailableCFH = () => {
        if (this.state.beginnerCFH) {
            return (
                <div>
                    <CallInfo cfh={CFHData.CFH1} />
                    <CallInfo cfh={CFHData.CFH2} />
                    <CallInfo cfh={CFHData.CFH3} />
                </div>
            );
        }
        return null;
    }
}