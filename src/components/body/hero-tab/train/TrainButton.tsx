import * as React from 'react';
import GameModelStore from 'store/game-model/GameModelStore';
import GameModelDispatcher from 'store/game-model/GameModelDispatcher';
import {GameModelActionTypes} from 'store/game-model/GameModelActionTypes';

interface ITrainButtonProps{
    className?: string;
}

interface ITrainButtonState{

}

export default class TrainButton extends React.Component<ITrainButtonProps, ITrainButtonState>{
    constructor(props:ITrainButtonProps){
        super(props);
    }

    render(){
        return (
            <button onClick={this.doTrain} className={this.props.className}>Train</button>
        );
    }

    doTrain = () => {
        GameModelDispatcher.dispatch({
            type:GameModelActionTypes.TRAIN_CLICK,
            payload:{ }
        });
    }
}