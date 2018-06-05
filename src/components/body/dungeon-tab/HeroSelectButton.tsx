import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import Hero from 'model/Hero';
import GameModelStore from 'store/game-model/GameModelStore';
import './HeroSelectButton.css';

interface IHeroSelectButtonProps {
    selectedHeroes: Set<Hero>;
    hero: Hero;
    doSelectHero: (hero: Hero) => void;
    doUnselectHero: (hero: Hero) => void;
    partySize: number;
}

interface IHeroSelectButtonState {
    isHeroBusy: boolean;
}

export default class HeroSelectButton extends React.Component<IHeroSelectButtonProps, IHeroSelectButtonState>{
    storeSubscribe: fbEmitter.EventSubscription;
    constructor(props: IHeroSelectButtonProps) {
        super(props);
        this.state = { isHeroBusy: this.isHeroBusy() };
    }

    render() {
        return (
            <button
                className="hero-select"
                disabled={this.isButtonDisabled()}
                onClick={this.doButtonCall}>
                {this.renderTxt()}
            </button>
        );
    }

    renderTxt = () => {
        if (this.state.isHeroBusy) {
            return 'Hero is busy';
        }
        else if (this.isHeroSelected()) {
            return 'Unselect';
        }
        else if (this.areAllHeroSelected()) {
            return 'Max party size';
        }
        return 'Select';
    }

    isButtonDisabled = () => {
        return this.state.isHeroBusy || (this.areAllHeroSelected() && !this.isHeroSelected());
    }

    areAllHeroSelected = () => {
        return (this.props.selectedHeroes.size >= this.props.partySize);
    }

    doButtonCall = () => {
        if (this.isHeroSelected()) {
            this.props.doUnselectHero(this.props.hero);
        }
        else {
            this.props.doSelectHero(this.props.hero);
        }
    }

    doUnselectHero = () => {
        this.props.doUnselectHero(this.props.hero);
    }

    isHeroBusy = () => {
        return this.props.hero.questId !== null;
    }

    isHeroSelected = () => {
        return this.props.selectedHeroes.has(this.props.hero);
    }

    componentDidMount() {
        this.storeSubscribe = GameModelStore.addListener(() => {
            this.setState({ isHeroBusy: this.isHeroBusy() });
        });
    }

    componentWillUnmount() {
        this.storeSubscribe.remove();
    }
}