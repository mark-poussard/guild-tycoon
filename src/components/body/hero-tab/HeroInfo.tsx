import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import Hero from 'model/Hero';
import RankStar from 'components/generic/hero-info/RankStar';
import './HeroInfo.css';
import GameModelStore from 'store/game-model/GameModelStore';
import { GameModelActionTypes } from 'store/game-model/GameModelActionTypes';
import GameModelDispatcher from 'store/game-model/GameModelDispatcher';
import HeroHelper from 'business/HeroHelper';
import ClassInfo from 'components/generic/hero-info/ClassInfo';
import BaseHero from 'model/BaseHero';
import { HeroDataArray } from 'data/HeroData';
import ClassHelper from 'business/ClassHelper';
import Level from 'components/body/hero-tab/Level';

interface IHeroInfoProps {
    hero: Hero;
}

export default class HeroInfo extends React.Component<IHeroInfoProps>{
    storeSubscribe: fbEmitter.EventSubscription;
    heroData: BaseHero;
    constructor(props: IHeroInfoProps) {
        super(props);
        this.heroData = HeroDataArray.get(this.props.hero.data);
    }

    render() {
        return (
            <div className="container hero-info-container">
                <div className="divider">
                    {this.renderHeroName()}
                    <Level className="lvl" hero={this.props.hero} />
                    <div className="icon"><img src={this.heroData.imgUrl} /></div>
                </div>
                <div className="divider">
                    <span className="rank">{RankStar.generateRank(this.props.hero.rank)}</span>
                </div>
                <div className="divider">
                    Class : <ClassInfo classList={ClassHelper.computeClassList(this.heroData.class, this.props.hero.rank)} />
                </div>
                <div className="divider">
                    {this.renderBattleAbility()}
                </div>
                <div className="divider">
                    {this.props.children}
                </div>
            </div>
        );
    }

    renderHeroName = () => {
        let txtSize = '';
        if (this.heroData.name.length > 6) {
            txtSize = 'small';
        }
        return <span className={`txt ${txtSize}`}>{this.heroData.name}</span>
    }

    renderBattleAbility = () => {
        const ba = HeroHelper.computeHeroBA(this.props.hero);
        return (
            <span>{`Battle Ability : ${ba}`}</span>
        );
    }
}