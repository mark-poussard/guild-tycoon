import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import Hero from 'model/Hero';
import GameModelStore from 'store/game-model/GameModelStore';
import './HeroSelectButton.css';

interface IHeroSelectButtonProps {
    selectedHeroes: Set<string>;
    hero: Hero;
    doSelectHero: (heroId: string) => void;
    doUnselectHero: (heroId: string) => void;
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
            this.props.doUnselectHero(this.props.hero.id);
        }
        else {
            this.props.doSelectHero(this.props.hero.id);
        }
    }

    doUnselectHero = () => {
        this.props.doUnselectHero(this.props.hero.id);
    }

    isHeroBusy = () => {
        const hero = GameModelStore.getState().heroes.get(this.props.hero.id);
        return hero.quest !== null || hero.autoQuest;
    }

    isHeroSelected = () =>{
        return this.props.selectedHeroes.has(this.props.hero.id);
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