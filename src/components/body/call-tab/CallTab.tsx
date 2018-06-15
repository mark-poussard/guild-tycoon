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
        this.state = { beginnerCFH: this.isBeginnerCFH() };
    }

    render() {
        return (
            <div>
                <h2>Perform a Call For Heroes !</h2>
                {this.renderAvailableCFH()}
            </div>
        );
    }

    componentWillMount() {
        this.storeSubscribe = GameModelStore.addListener(() => {
            const beginnerCFH = this.isBeginnerCFH();
            this.setState({
                beginnerCFH: beginnerCFH
            });
        });
    }

    isBeginnerCFH = () => {
        const CFH1nbr = GameModelStore.getState().statistics[CFHData.CFH1.id];
        const CFH2nbr = GameModelStore.getState().statistics[CFHData.CFH2.id];
        const CFH3nbr = GameModelStore.getState().statistics[CFHData.CFH3.id];
        return (!CFH1nbr || CFH1nbr == 0) && (!CFH2nbr || CFH2nbr == 0) && (!CFH3nbr || CFH3nbr == 0);
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