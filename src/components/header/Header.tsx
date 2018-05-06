import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import Resource, { ResourceType } from 'components/generic/resource/Resource';
import './Header.css';
import GameModelStore from 'store/game-model/GameModelStore';

interface IHeaderProps {

}

interface IHeaderState {
    gold: number;
    xp: number;
    fame: number;
}

export default class Header extends React.Component<IHeaderProps, IHeaderState>{
    storeSubscribe: fbEmitter.EventSubscription;

    constructor(props: IHeaderProps) {
        super(props);
        this.state =
            {
                gold: GameModelStore.getState().gold,
                xp: GameModelStore.getState().exp,
                fame: GameModelStore.getState().fame
            };
    }

    componentDidMount() {
        this.storeSubscribe = GameModelStore.addListener(() => {
            const gameState = GameModelStore.getState();
            this.setState({ gold: gameState.gold, xp: gameState.exp, fame: gameState.fame });
        });
    }

    componentWillUnmount() {
        this.storeSubscribe.remove();
    }

    render() {
        return (
            <div className="header">
                <Resource value={this.state.gold} type={ResourceType.GOLD} inline />
                <Resource value={this.state.xp} type={ResourceType.EXP} inline />
                <Resource value={this.state.fame} type={ResourceType.FAME} inline />
            </div>
        );
    }
}