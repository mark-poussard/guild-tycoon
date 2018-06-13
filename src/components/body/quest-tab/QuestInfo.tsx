import * as React from 'react';
import Quest from 'model/Quest';
import Resource, { ResourceType } from 'components/generic/resource/Resource';
import Overlay from 'components/generic/Overlay';
import { ProgressBar } from '../../generic/quest/ProgressBar';
import GameModelDispatcher from 'store/game-model/GameModelDispatcher';
import { GameModelActionTypes } from 'store/game-model/GameModelActionTypes';
import QuestHelper from 'business/QuestHelper';
import { QuestDataArray } from 'data/QuestData';
import BaseQuest from 'model/BaseQuest';
import EnnemyInfo from 'components/generic/EnnemyInfo';

interface IQuestInfoProps {
    quest: Quest;
    doEndQuest: (quest: Quest) => void;
    doSelectQuest: (quest: Quest) => void;
}

interface IQuestInfoState {
    progress: number;
}

export default class QuestInfo extends React.Component<IQuestInfoProps, IQuestInfoState>{
    intervalId: number;
    questData: BaseQuest;

    constructor(props: IQuestInfoProps) {
        super(props);
        this.questData = QuestDataArray.get(this.props.quest.id);
        this.state = { progress: this.computeProgress(this.props.quest) };
        this.intervalId = null;
        this.updateAsyncProgress();
    }

    render() {
        const questData = this.questData;
        return (
            <div className='container'>
                <h3>{questData.title}</h3>
                <p>{questData.description}</p>
                {this.renderQuestDetails()}
                {this.renderQuestAction()}
            </div>
        );
    }

    renderQuestDetails = () => {
        return (
            <table>
                <thead>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Resource type={ResourceType.GOLD} value={this.questData.reward.gold} modifier />
                            <Resource type={ResourceType.EXP} value={this.questData.reward.exp} modifier />
                            <Resource type={ResourceType.TIME} value={this.questData.duration.toString()} />
                        </td>
                        {this.renderEnnemyCells()}
                    </tr>
                </tbody>
            </table>
        );
    }

    renderEnnemyCells = () => {
        if(!this.questData.ennemies){
            return null;
        }
        const result : JSX.Element[] = [];
        let i=0;
        if(this.questData.ennemies.length > 0){
            result.push(<td key={`ENNEMY_${i++}`}>Ennemies - </td>);
        }
        for(let ennemy of this.questData.ennemies){
            result.push(<td key={`ENNEMY_${i++}`}><EnnemyInfo ennemy={ennemy} /></td>)
        }
        return result;
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

    componentWillUnmount() {
        this.stopProgressRefresh();
    }

    componentDidUpdate(){
        this.updateAsyncProgress();
    }

    updateAsyncProgress = () => {
        if(this.intervalId == null && !this.props.quest.completedAt && this.state.progress < 100){
            this.startProgressRefresh();
        }
        else if(!this.props.quest.completedAt && this.state.progress == 100){
            this.stopProgressRefresh();
        }
    }

    startProgressRefresh = () => {
        this.intervalId = window.setInterval(() => {
            this.setState({
                progress: this.computeProgress(this.props.quest)
            });
            this.updateAsyncProgress();
        }, 100);
    }

    stopProgressRefresh = () => {
        if (this.intervalId != null) {
            window.clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    computeProgress = (quest: Quest) => {
        if (quest.startedAt != null) {
            const t = new Date().getTime() - quest.startedAt;
            const duration = this.questData.duration.toMs();
            return Math.min(t / duration * 100, 100);
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