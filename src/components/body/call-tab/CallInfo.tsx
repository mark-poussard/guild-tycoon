import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import CallForHero from 'model/CallForHero';
import CFHHelper from 'business/CFHHelper';
import GameModelStore from 'store/game-model/GameModelStore';
import Resource, { ResourceType } from 'components/generic/resource/Resource';

interface ICallInfoProps {
    cfh: CallForHero;
}

interface ICallInfoState {
    shards: number;
}

export default class CallInfo extends React.Component<ICallInfoProps, ICallInfoState>{
    storeSubscribe: fbEmitter.EventSubscription;

    constructor(props: ICallInfoProps) {
        super(props);
        this.state = { shards: GameModelStore.getState().shards }
    }

    render() {
        return (
            <div className='container'>
                <h3>{this.props.cfh.title}</h3>
                <p>{this.props.cfh.description}</p>
                {this.props.cfh.price !== 0 && 
                    <Resource type={ResourceType.SHARD} value={this.props.cfh.price} modifier remove />}
                <button onClick={this.doCall} disabled={!this.hasEnoughShards()}>Call</button>
            </div>
        );
    }

    componentWillMount() {
        this.storeSubscribe = GameModelStore.addListener(() => {
            this.setState({
                shards: GameModelStore.getState().shards
            });
        });
    }

    componentWillUnmount() {
        if (this.storeSubscribe) {
            this.storeSubscribe.remove();
        }
    }

    hasEnoughShards = () => {
        return this.state.shards >= this.props.cfh.price;
    }

    doCall = () => {
        CFHHelper.doCFH(this.props.cfh);
    }
}