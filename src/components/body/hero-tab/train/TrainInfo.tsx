import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import GameModelStore from 'store/game-model/GameModelStore';
import TrainProgress from './TrainProgress';
import TrainButton from './TrainButton';

interface ITrainInfoProps{

}

interface ITrainInfoState{
    nbHeroes : number;
    totalTrainClicks : number;
}

export default class TrainInfo extends React.Component<ITrainInfoProps, ITrainInfoState>{
    storeSubscribe : fbEmitter.EventSubscription;

    constructor(props:ITrainInfoProps){
        super(props);
        const nbHeroes = GameModelStore.getState().heroes.size();
        const totalTrainClicks = GameModelStore.getState().statistics.trainClicks;
        this.state = {nbHeroes:nbHeroes, totalTrainClicks:totalTrainClicks};
    }

    render(){
        if(this.state.nbHeroes > 0){
            return (
                <div className="container">
                    <TrainProgress totalClicks={this.state.totalTrainClicks}/>
                    <TrainButton />
                </div>
            );
        }
        return null;
    }

    componentDidMount(){
        this.storeSubscribe = GameModelStore.addListener(() => {
            const nbHeroes = GameModelStore.getState().heroes.size();
            const totalTrainClicks = GameModelStore.getState().statistics.trainClicks;
            this.setState({nbHeroes:nbHeroes, totalTrainClicks:totalTrainClicks});
        });
    }

    componentWillUnmount(){
        this.storeSubscribe.remove();
    }
}