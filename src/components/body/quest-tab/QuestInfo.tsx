import * as React from 'react';
import Quest from 'model/Quest';
import Resource, { ResourceType } from 'components/generic/resource/Resource';
import Overlay from 'components/generic/Overlay';
import { ProgressBar } from '../../generic/quest/ProgressBar';
import GameModelDispatcher from 'store/game-model/GameModelDispatcher';
import { GameModelActionTypes } from 'store/game-model/GameModelActionTypes';
import QuestHelper from 'business/QuestHelper';

interface IQuestInfoProps {
    quest: Quest;
    doEndQuest: (quest: Quest) => void;
    doSelectQuest: (quest: Quest) => void;
}

interface IQuestInfoState {
    progress: number;
}

export default class QuestInfo extends React.Component<IQuestInfoProps, IQuestInfoState>{
    intervalId : number;
    
    constructor(props: IQuestInfoProps) {
        super(props);
        this.state = { progress: this.computeProgress(this.props.quest) };
        this.intervalId = null;
    }

    render() {
        const quest = this.props.quest;
        return (
            <div className='container'>
                <h3>{quest.title}</h3>
                <p>{quest.description}</p>
                <Resource type={ResourceType.GOLD} value={quest.reward.gold} modifier />
                <Resource type={ResourceType.EXP} value={quest.reward.exp} modifier />
                <Resource type={ResourceType.TIME} value={QuestHelper.durationToString(quest.duration)} />
                {this.renderQuestAction()}
            </div>
        );
    }

    renderQuestAction = () => {
        if (!this.props.quest.startedAt) {
            return (
                <button onClick={this.startQuest}>Start</button>
            );
        }
        else if (!this.props.quest.completedAt && this.state.progress < 100) {
            this.startProgressRefresh();
            return (
                <ProgressBar progress={this.state.progress} />
            );
        }
        else if (!this.props.quest.completedAt && this.state.progress == 100) {
            this.stopProgressRefresh();
            return (
                <button onClick={this.endQuest}>Finish quest</button>
            );
        }
    }

    componentWillUnmount(){
        this.stopProgressRefresh();
    }

    startProgressRefresh = () => {
        this.intervalId = window.setInterval(() => {
            this.setState({
                progress: this.computeProgress(this.props.quest)
            });
        }, 100);
    }

    stopProgressRefresh = () => {
        if(this.intervalId != null){
            window.clearInterval(this.intervalId);
        }
    }

    computeProgress = (quest: Quest) => {
        if (quest.startedAt != null) {
            const t = new Date().getTime() - quest.startedAt;
            const duration = quest.duration;
            return Math.min(t / duration *100, 100);
        }
        return 0;
    }

    endQuest = () => {
        this.props.doEndQuest(this.props.quest);
    }

    startQuest = () => {
        this.props.doSelectQuest(this.props.quest);
    }
}