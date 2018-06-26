import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import GameModelStore from 'store/game-model/GameModelStore';
import TrainProgress from './TrainProgress';
import TrainButton from './TrainButton';
import './TrainInfo.css'
import Improvements from 'model/Improvements';

interface ITrainInfoProps{

}

interface ITrainInfoState{
    nbHeroes : number;
    totalTrainClicks : number;
    improvements : Improvements;
}

export default class TrainInfo extends React.Component<ITrainInfoProps, ITrainInfoState>{
    storeSubscribe : fbEmitter.EventSubscription;

    constructor(props:ITrainInfoProps){
        super(props);
        const nbHeroes = GameModelStore.getState().heroes.size();
        const totalTrainClicks = GameModelStore.getState().statistics.trainClicks;
        const improvements = Object.assign({}, GameModelStore.getState().improvements);
        this.state = {nbHeroes, totalTrainClicks, improvements};
    }

    render(){
        if(this.state.nbHeroes > 0 && this.state.improvements.train1){
            return (
                <div className="train-container container">
                    <TrainProgress totalClicks={this.state.totalTrainClicks}/>
                    <TrainButton className='train-button'/>
                </div>
            );
        }
        return null;
    }

    componentDidMount(){
        this.storeSubscribe = GameModelStore.addListener(() => {
            const nbHeroes = GameModelStore.getState().heroes.size();
            const totalTrainClicks = GameModelStore.getState().statistics.trainClicks;
            const improvements = Object.assign({}, GameModelStore.getState().improvements);
            this.setState({nbHeroes, totalTrainClicks, improvements});
        });
    }

    componentWillUnmount(){
        this.storeSubscribe.remove();
    }
}