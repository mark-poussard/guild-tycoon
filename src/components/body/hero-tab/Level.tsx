import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import Hero from 'model/Hero';
import HeroHelper from 'business/HeroHelper';
import GameModelStore from 'store/game-model/GameModelStore';
import GameModelDispatcher from 'store/game-model/GameModelDispatcher';
import { GameModelActionTypes } from 'store/game-model/GameModelActionTypes';

interface ILevelProps {
    hero: Hero;
    className?: string;
}

interface ILevelState {
    exp: number;
}

export default class Level extends React.Component<ILevelProps, ILevelState>{
    storeSubscribe: fbEmitter.EventSubscription;

    constructor(props: ILevelProps) {
        super(props);
        this.state = { exp: GameModelStore.getState().exp };
    }

    componentDidMount() {
        this.storeSubscribe = GameModelStore.addListener(() => {
            this.setState({ exp: GameModelStore.getState().exp });
        });
    }

    componentWillUnmount() {
        this.storeSubscribe.remove();
    }

    render() {
        return (
            <div className={`${this.props.className}`}>
                <span className="txt">{`lvl: ${this.props.hero.level}`}</span>
                {this.renderLevelUp()}
            </div>
        );
    }

    renderLevelUp = () => {
        const hero = this.props.hero
        const requiredExp = HeroHelper.expRequiredToLevel(hero);
        if (this.state.exp >= requiredExp && !HeroHelper.isMaxLevel(hero) && this.props.hero.questId == null) {
            return (
                <input className="level-up" type="image" src="img/plus.png" onClick={this.heroLevelUp} />
            );
        }
        return null;
    }

    heroLevelUp = (e: React.MouseEvent<HTMLInputElement>) => {
        if (e.ctrlKey) {
            GameModelDispatcher.dispatch({
                type: GameModelActionTypes.HERO_BULK_LVL_UP,
                payload: { heroId: this.props.hero.data }
            });
        }
        else {
            GameModelDispatcher.dispatch({
                type: GameModelActionTypes.HERO_LVL_UP,
                payload: { heroId: this.props.hero.data }
            });
        }
    }
}