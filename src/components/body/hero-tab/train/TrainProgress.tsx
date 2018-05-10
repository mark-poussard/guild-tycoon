import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import GameModelStore from 'store/game-model/GameModelStore';
import { ProgressBar } from 'components/generic/quest/ProgressBar';
import { TrainingHelper } from 'store/TrainingHelper';
import './TrainProgress.css'

interface ITrainProgressProps {
    totalClicks: number;
}

interface ITrainProgressState {
}

export default class TrainProgress extends React.Component<ITrainProgressProps, ITrainProgressState>{

    constructor(props: ITrainProgressProps) {
        super(props);
    }

    render() {
        const progress = this.computeProgress(this.props.totalClicks);
        return (
            <ProgressBar className='train-progress' progress={progress} />
        );
    }

    computeProgress = (totalClicks: number) => {
        const reqClicks = TrainingHelper.computeReqClicks(GameModelStore.getState());
        return (this.props.totalClicks % reqClicks) * 100 / (reqClicks - 1);
    }
}