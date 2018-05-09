import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import GameModelStore from 'store/game-model/GameModelStore';
import {ProgressBar} from 'components/generic/quest/ProgressBar';

interface ITrainProgressProps{
    totalClicks : number;
}

interface ITrainProgressState{
}

export default class TrainProgress extends React.Component<ITrainProgressProps, ITrainProgressState>{
    progress : number;

    constructor(props:ITrainProgressProps){
        super(props);
        const progress = this.props.totalClicks % 5;
        this.progress = progress;
    }

    render(){
        return (
            <ProgressBar progress={this.progress}/>
        );
    }
}