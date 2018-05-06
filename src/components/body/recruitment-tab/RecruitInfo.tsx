import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import Recruit from 'model/Recruit';
import RankStar from 'components/generic/hero-info/RankStar';
import GameModelStore from 'store/game-model/GameModelStore';
import { GameModelActionTypes } from 'store/game-model/GameModelActionTypes';
import './RecruitInfo.css';
import Resource, { ResourceType } from 'components/generic/resource/Resource';

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
                <div className="recruit-info-positioning">
                    <div>
                        {this.props.recruit.hero.name}
                    </div>
                    <div>
                        {RankStar.generateRank(this.props.recruit.hero.rank)}
                    </div>
                    <img className="recruit-img" src={this.props.recruit.hero.imgUrl} />
                    {this.renderGoldCost()}
                    {this.renderFameWon()}
                    <button className="recruit-button" disabled={this.state.isTooExpensive} onClick={this.doRecruit}>Recruit</button>
                </div>
            </div>
        );
    }

    renderGoldCost = () => {
        if (this.props.recruit.gold > 0) {
            return (
                <Resource type={ResourceType.GOLD} value={this.props.recruit.gold} modifier remove />
            );
        }
        else {
            return null;
        }
    }

    renderFameWon = () => {
        if (this.props.recruit.fameWon > 0) {
            return (
                <Resource type={ResourceType.FAME} value={this.props.recruit.fameWon} modifier />
            );
        }
        else {
            return null;
        }
    }

    isRecruitTooExpensive = () => {
        const currentGold = GameModelStore.getState().gold;
        const currentFame = GameModelStore.getState().fame;
        const isNoMoreGuildRoom = GameModelStore.getState().heroes.size() >= GameModelStore.getState().guildSize;
        return this.props.recruit.fameReq > currentFame || this.props.recruit.gold > currentGold || isNoMoreGuildRoom;
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
            dispatcher.dispatch({
                type: GameModelActionTypes.ADD_FAME,
                payload: {
                    quantity: this.props.recruit.fameWon
                }
            });
        }
    }
}