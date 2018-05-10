import GameModelState from "store/game-model/GameModelState";

class _TrainingHelper{
    computeExpReward = (model : GameModelState) => {
        if(model.improvements.train3){
            return 4;
        }
        else if (model.improvements.train2){
            return 3;
        }
        else if(model.improvements.train1){
            return 2;
        }
        return 1;
    }

    computeReqClicks = (model : GameModelState) => {
        if(model.improvements.trainClickNo1){
            return 4;
        }
        return 5;
    }
}

export const TrainingHelper = new _TrainingHelper();