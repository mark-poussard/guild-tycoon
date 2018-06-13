import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import Hero from 'model/Hero';
import RankStar from 'components/generic/hero-info/RankStar';
import QuestInfo from 'components/body/hero-tab/QuestInfo';
import './HeroInfo.css';
import GameModelStore from 'store/game-model/GameModelStore';
import { GameModelActionTypes } from 'store/game-model/GameModelActionTypes';
import GameModelDispatcher from 'store/game-model/GameModelDispatcher';
import GameModelState from 'store/game-model/GameModelState';
import HeroHelper from 'business/HeroHelper';
import ClassInfo from 'components/generic/hero-info/ClassInfo';

interface IHeroInfoProps {
    hero: Hero;
}

interface IHeroInfoState {
    exp: number;
}

export default class HeroInfo extends React.Component<IHeroInfoProps, IHeroInfoState>{
    storeSubscribe: fbEmitter.EventSubscription;
    constructor(props: IHeroInfoProps) {
        super(props);
        this.state = { exp: GameModelStore.getState().exp };
    }

    render() {
        return (
            <div className="container hero-info-container">
                <div className="divider">
                    {this.renderHeroName()}
                    <div className="lvl">
                        <span className="txt">{`lvl: ${this.props.hero.level}`}</span>
                        {this.renderLevelUp()}
                    </div>
                    <div className="icon"><img src={this.props.hero.data.imgUrl} /></div>
                </div>
                <div className="divider">
                    <ClassInfo class={this.props.hero.data.class} forRank={this.props.hero.rank}/>
                </div>
                <div className="divider">
                    <span className="rank">{RankStar.generateRank(this.props.hero.rank)}</span>
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

    componentDidMount() {
        this.storeSubscribe = GameModelStore.addListener(() => {
            this.setState({ exp: GameModelStore.getState().exp });
        })
    }

    componentWillUnmount() {
        this.storeSubscribe.remove();
    }

    renderHeroName = () => {
        let txtSize = '';
        if (this.props.hero.data.name.length > 6) {
            txtSize = 'small';
        }
        return <span className={`txt ${txtSize}`}>{this.props.hero.data.name}</span>
    }

    renderLevelUp = () => {
        const hero = this.props.hero
        const requiredExp = HeroHelper.expRequiredToLevel(hero);
        if (this.state.exp >= requiredExp) {
            return (
                <input className="level-up" type="image" src="img/plus.png" onClick={this.heroLevelUp} />
            );
        }
        return null;
    }

    heroLevelUp = () => {
        GameModelDispatcher.dispatch({
            type: GameModelActionTypes.HERO_LVL_UP,
            payload: { heroId: this.props.hero.data.id }
        });
    }

    renderBattleAbility = () => {
        const ba = HeroHelper.computeHeroBA(this.props.hero);
        return (
            <span>{`Battle Ability : ${ba}`}</span>
        );
    }
}