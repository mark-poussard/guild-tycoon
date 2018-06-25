import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import Quest from 'model/Quest';
import Resource, { ResourceType } from 'components/generic/resource/Resource';
import GameModelDispatcher from 'store/game-model/GameModelDispatcher';
import { GameModelActionTypes } from 'store/game-model/GameModelActionTypes';
import { QuestDataArray } from 'data/QuestData';
import BaseQuest from 'model/BaseQuest';
import Timer from 'components/generic/Timer';
import QuestProgressBar from 'components/generic/quest/QuestProgressBar';
import EnnemyInfo from 'components/generic/ennemy/EnnemyInfo';
import GameModelStore from 'store/game-model/GameModelStore';
import QuestAction from 'components/body/quest-tab/QuestAction';

interface IQuestInfoProps {
    quest: Quest;
    doEndQuest: (quest: Quest) => void;
    doSelectQuest: (quest: Quest) => void;
}

interface IQuestInfoState {
    quest: Quest;
}

export default class QuestInfo extends React.Component<IQuestInfoProps, IQuestInfoState>{
    questData: BaseQuest;
    gameStoreListener: fbEmitter.EventSubscription;

    constructor(props: IQuestInfoProps) {
        super(props);
        this.questData = QuestDataArray.get(this.props.quest.id);
        this.state = { quest: this.props.quest };
    }

    componentWillMount() {
        this.gameStoreListener = GameModelStore.addListener(() => {
            this.setState({
                quest: GameModelStore.getState().quests[this.props.quest.id]
            });
        });
    }

    componentWillUnmount() {
        if (this.gameStoreListener) {
            this.gameStoreListener.remove();
        }
    }

    render() {
        const questData = this.questData;
        return (
            <div className='container'>
                <h3>{questData.title}</h3>
                <p>{questData.description}</p>
                {this.renderClassReq()}
                {this.renderQuestDetails()}
                {this.renderQuestAction()}
            </div>
        );
    }

    renderClassReq = () => {
        if(this.questData.classReq && this.questData.classReq.length > 0){
            const classReqList :JSX.Element[] = [];
            for(const cls of this.questData.classReq){
                classReqList.push(<span>{`${cls} `}</span>)
            }
            return (
                <p>
                    {`Required class : `}
                    {classReqList}
                </p>
            )
        }
        return null;
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
                            {this.questData.reward.shard !== 0 && 
                                <Resource type={ResourceType.SHARD} value={this.questData.reward.shard} modifier />}
                            <Resource type={ResourceType.TIME} value={this.questData.duration.toString()} />
                        </td>
                        {this.renderEnnemyCells()}
                    </tr>
                </tbody>
            </table>
        );
    }

    renderEnnemyCells = () => {
        if (!this.questData.ennemies) {
            return null;
        }
        const result: JSX.Element[] = [];
        let i = 0;
        if (this.questData.ennemies.length > 0) {
            result.push(<td key={`ENNEMY_${i++}`}>Ennemies - </td>);
        }
        for (let ennemy of this.questData.ennemies) {
            result.push(<td key={`ENNEMY_${i++}`}><EnnemyInfo ennemy={ennemy} /></td>)
        }
        return result;
    }

    renderQuestAction = () => {
        return (
            <QuestAction 
            quest={this.state.quest} 
            questData={this.questData} 
            startTxt={`Start`} start={this.startQuest}
            endTxt={`Finish quest`} end={this.endQuest} />
        )
    }

    endQuest = () => {
        this.props.doEndQuest(this.state.quest);
    }

    startQuest = () => {
        this.props.doSelectQuest(this.state.quest);
    }
}