import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import Hero from 'model/Hero';
import GameModelStore from 'store/game-model/GameModelStore';
import './HeroSelectButton.css';
import BaseHero from 'model/BaseHero';
import { HeroDataArray } from 'data/HeroData';
import ClassHelper from 'business/ClassHelper';

interface IHeroSelectButtonProps {
    selectedHeroes: Set<Hero>;
    hero: Hero;
    doSelectHero: (hero: Hero) => void;
    doUnselectHero: (hero: Hero) => void;
    partySize: number;
    reqClass?: string;
}

interface IHeroSelectButtonState {
    isHeroBusy: boolean;
}

export default class HeroSelectButton extends React.Component<IHeroSelectButtonProps, IHeroSelectButtonState>{
    storeSubscribe: fbEmitter.EventSubscription;
    heroData: BaseHero;
    constructor(props: IHeroSelectButtonProps) {
        super(props);
        this.state = { isHeroBusy: this.isHeroBusy() };
        this.heroData = HeroDataArray.get(this.props.hero.data);
    }

    render() {
        const validClass = this.isHeroValidClass();
        return (
            <button
                className="hero-select"
                disabled={this.isButtonDisabled(validClass)}
                onClick={this.doButtonCall}>
                {this.renderTxt(validClass)}
            </button>
        );
    }

    renderTxt = (validClass: boolean) => {
        if (this.state.isHeroBusy) {
            return 'Hero is busy';
        }
        else if (!validClass) {
            return `Requires class ${this.props.reqClass}`
        }
        else if (this.isHeroSelected()) {
            return 'Unselect';
        }
        else if (this.areAllHeroSelected()) {
            return 'Max party size';
        }
        return 'Select';
    }

    isButtonDisabled = (validClass: boolean) => {
        return this.state.isHeroBusy || !validClass || (this.areAllHeroSelected() && !this.isHeroSelected());
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

    isHeroValidClass = () => {
        if (!this.props.reqClass) {
            return true;
        }
        return ClassHelper.contains(this.heroData.class, this.props.hero.rank, this.props.reqClass);
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