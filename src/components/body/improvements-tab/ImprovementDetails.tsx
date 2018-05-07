import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import GameModelStore from 'store/game-model/GameModelStore';
import { ImprovementInfo } from 'model/Improvements';
import Resource, { ResourceType } from 'components/generic/resource/Resource';
import GameModelDispatcher from 'store/game-model/GameModelDispatcher';
import { GameModelActionTypes } from 'store/game-model/GameModelActionTypes';
import './ImprovementDetails.css';

interface ImprovementDetailsProps {
    improvement: ImprovementInfo;
}

interface ImprovementDetailsState {
    gold: number;
}

export default class ImprovementDetails extends React.Component<ImprovementDetailsProps, ImprovementDetailsState>{
    storeSubscribe: fbEmitter.EventSubscription;

    constructor(props: ImprovementDetailsProps) {
        super(props);
        this.state = { gold: GameModelStore.getState().gold };
    }

    render() {
        return (
            <div className='improvement-container'>
                <h3>{this.props.improvement.title}</h3>
                <Resource style={{ float: 'right' }} value={this.props.improvement.cost} type={ResourceType.GOLD} modifier remove inline />
                <p>{this.props.improvement.desc}</p>
                <button disabled={this.isTooExpensive()} onClick={this.buyImprovement}>Buy</button>
            </div>
        );
    }

    componentDidMount() {
        this.storeSubscribe = GameModelStore.addListener(() => {
            this.setState({ gold: GameModelStore.getState().gold });
        });
    }

    componentWillUnmount() {
        this.storeSubscribe.remove();
    }

    isTooExpensive = () => {
        return this.props.improvement.cost > this.state.gold;
    }

    buyImprovement = () => {
        GameModelDispatcher.dispatch({
            type: GameModelActionTypes.ADD_GOLD,
            payload: {
                quantity: -this.props.improvement.cost
            }
        });
        GameModelDispatcher.dispatch({
            type: GameModelActionTypes.SET_IMPROVEMENT,
            payload: {
                improvementKey: this.props.improvement.key,
                value: true
            }
        });
    }
}