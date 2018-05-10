import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import GameModelStore from 'store/game-model/GameModelStore';
import {ProgressBar} from 'components/generic/quest/ProgressBar';
import './TrainProgress.css'

interface ITrainProgressProps{
    totalClicks : number;
}

interface ITrainProgressState{
}

export default class TrainProgress extends React.Component<ITrainProgressProps, ITrainProgressState>{

    constructor(props:ITrainProgressProps){
        super(props);
    }

    render(){
        const progress = this.computeProgress(this.props.totalClicks);
        return (
            <ProgressBar className='train-progress' progress={progress}/>
        );
    }

    computeProgress = (totalClicks : number) => {
        return (this.props.totalClicks % 5)*100/4;
    }
}