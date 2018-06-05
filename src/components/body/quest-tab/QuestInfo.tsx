import * as React from 'react';
import Quest from 'model/Quest';
import Resource, { ResourceType } from 'components/generic/resource/Resource';
import Overlay from 'components/generic/Overlay';
import { ProgressBar } from '../../generic/quest/ProgressBar';
import GameModelDispatcher from 'store/game-model/GameModelDispatcher';
import { GameModelActionTypes } from 'store/game-model/GameModelActionTypes';

interface IQuestInfoProps {
    quest: Quest;
    doEndQuest: (quest: Quest) => void;
    doSelectQuest: (quest: Quest) => void;
}

interface IQuestInfoState {
    progress: number;
}

export default class QuestInfo extends React.Component<IQuestInfoProps, IQuestInfoState>{
    constructor(props: IQuestInfoProps) {
        super(props);
        this.state = { progress: this.computeProgress(this.props.quest) };
    }

    render() {
        const quest = this.props.quest;
        return (
            <div>
                <h3>{quest.title}</h3>
                <p>{quest.description}</p>
                <Resource type={ResourceType.GOLD} value={quest.reward.gold} modifier />
                <Resource type={ResourceType.EXP} value={quest.reward.exp} modifier />
                <Resource type={ResourceType.TIME} value={quest.duration.toString()} />
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
            return (
                <ProgressBar progress={this.state.progress} />
            );
        }
        else if (!this.props.quest.completedAt && this.state.progress == 100) {
            return (
                <button onClick={this.endQuest}>Finish quest</button>
            );
        }
    }

    computeProgress = (quest: Quest) => {
        if (quest.startedAt != null) {
            const t = new Date().getTime() - quest.startedAt.getTime();
            const duration = quest.duration.toMs();
            return Math.min(t / duration, 100);
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