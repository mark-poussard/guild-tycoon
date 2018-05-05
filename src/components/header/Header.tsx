import * as React from 'react';
import Resource from 'components/header/Resource';
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
    constructor(props: IHeaderProps) {
        super(props);
        this.state = { gold: 0, xp: 0, fame: 0 };
    }

    componentDidMount() {
        GameModelStore.addListener(() => {
            const gameState = GameModelStore.getState();
            this.setState({ gold: gameState.gold, xp: gameState.exp, fame: gameState.fame });
        });
    }

    render() {
        return (
            <div className="header">
                <Resource value={this.state.gold} iconUrl="img/gold.png" />
                <Resource value={this.state.xp} iconUrl="img/xp.png" />
                <Resource value={this.state.fame} iconUrl="img/fame.png" />
            </div>
        );
    }
}