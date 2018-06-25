import * as React from 'react';
import Quest from 'model/Quest';
import BaseQuest from 'model/BaseQuest';
import QuestProgressBar from 'components/generic/quest/QuestProgressBar';
import GameModelDispatcher from 'store/game-model/GameModelDispatcher';
import { GameModelActionTypes } from 'store/game-model/GameModelActionTypes';
import Timer from 'components/generic/Timer';

interface IQuestActionProps{
    quest : Quest;
    questData : BaseQuest;
    startTxt : string;
    endTxt : string;
    end : () => void;
    start : () => void;
}

interface IQuestActionState{
    questEnded : boolean;
}

export default class QuestAction extends React.Component<IQuestActionProps, IQuestActionState>{

    constructor(props : IQuestActionProps){
        super(props);
        this.state = {questEnded : false};
    }

    render(){
        if (!this.props.quest || !this.props.quest.startedAt) {
            return (
                <button onClick={this.startQuest}>{this.props.startTxt}</button>
            );
        }
        else if (!this.props.quest.completedAt && !this.state.questEnded) {
            return (
                <QuestProgressBar quest={this.props.quest} doQuestOver={() => this.setState({ questEnded: true })} />
            );
        }
        else if (!this.props.quest.completedAt && this.state.questEnded) {
            return (
                <button onClick={this.endQuest}>{this.props.endTxt}</button>
            );
        }
        else if (this.props.questData.repeat != null) {
            return <Timer until={new Date(this.props.quest.completedAt + this.props.questData.repeat.toMs())} doEnd={this.repeatQuest} />
        }
    }

    repeatQuest = () => {
        GameModelDispatcher.dispatch({
            type: GameModelActionTypes.REPEAT_QUEST,
            payload: {
                quest: this.props.quest
            }
        })
    }

    endQuest = () => {
        this.setState({ questEnded: false });
        this.props.end();
    }

    startQuest = () => {
        this.props.start();
    }
}