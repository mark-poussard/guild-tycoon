import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import Recruit from 'model/Recruit';
import RankStar from 'components/generic/hero-info/RankStar';
import GameModelStore from 'store/game-model/GameModelStore';
import { GameModelActionTypes } from 'store/game-model/GameModelActionTypes';
import './RecruitInfo.css';

interface IRecruitInfoProps {
    recruit: Recruit;
}

interface IRecruitInfoState {
    isTooExpensive: boolean;
}

export default class RecruitInfo extends React.Component<IRecruitInfoProps, IRecruitInfoState>{
    storeSubscribe: fbEmitter.EventSubscription;

    constructor(props: IRecruitInfoProps) {
        super(props);
        this.state = { isTooExpensive: this.isRecruitTooExpensive() };
    }

    render() {
        return (
            <div className="recruit-info-container">
                <div>
                    {this.props.recruit.hero.name}
                </div>
                <div>
                    {RankStar.generateRank(this.props.recruit.hero)}
                </div>
                <img className="recruit-img" src={this.props.recruit.hero.imgUrl} />
                <div className="resource-container">
                    <img src="img/gold.png" />
                    <span className="resource-value">{this.props.recruit.gold}</span>
                </div>
                <div className="resource-container">
                    <img src="img/fame.png" />
                    <span className="resource-value">{this.props.recruit.fame}</span>
                </div>
                <button className="recruit-button" disabled={this.state.isTooExpensive} onClick={this.doRecruit}>Recruit</button>
            </div>
        );
    }

    isRecruitTooExpensive = () => {
        const currentGold = GameModelStore.getState().gold;
        const currentFame = GameModelStore.getState().fame;
        const isNoMoreGuildRoom = GameModelStore.getState().heroes.size() >= GameModelStore.getState().guildSize;
        return (this.props.recruit.fame > currentFame && this.props.recruit.gold > currentGold) || isNoMoreGuildRoom;
    }

    componentDidMount() {
        this.storeSubscribe = GameModelStore.addListener(() => {
            this.setState({ isTooExpensive: this.isRecruitTooExpensive() })
        });
    }

    componentWillUnmount() {
        this.storeSubscribe.remove();
    }

    doRecruit = () => {
        if (!this.state.isTooExpensive) {
            const dispatcher = GameModelStore.getDispatcher();
            dispatcher.dispatch({
                type: GameModelActionTypes.RECRUIT_HERO,
                payload: {
                    hero: this.props.recruit.hero
                }
            });
            dispatcher.dispatch({
                type: GameModelActionTypes.ADD_GOLD,
                payload: {
                    quantity: -this.props.recruit.gold
                }
            });
        }
    }
}