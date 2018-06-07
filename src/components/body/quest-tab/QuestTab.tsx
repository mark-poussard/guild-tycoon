import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import { QuestData } from 'data/QuestData';
import Quest from 'model/Quest';
import QuestInfo from 'components/body/quest-tab/QuestInfo';
import GameModelStore from 'store/game-model/GameModelStore';
import GameSwitches from 'model/GameSwitches';
import Overlay from 'components/generic/Overlay';
import BattleEngine from 'business/BattleEngine';
import GameModelDispatcher from 'store/game-model/GameModelDispatcher';
import { GameModelActionTypes } from 'store/game-model/GameModelActionTypes';
import Resource, { ResourceType } from 'components/generic/resource/Resource';
import QuestHelper from 'business/QuestHelper';
import Hero from 'model/Hero';
import SelectHeroOverlay from 'components/generic/select-hero-overlay/SelectHeroOverlay';
import BaseQuest from 'model/BaseQuest';

interface IQuestTabState {
    gameSwitches: GameSwitches;
    quests: Quest[];
    questResult: Quest;
    isQuestResultWin: boolean;
    questSelect: Quest;
}

export default class QuestTab extends React.Component<{}, IQuestTabState>{
    gameStoreListener: fbEmitter.EventSubscription;

    constructor(props: {}) {
        super(props);
        this.state = {
            gameSwitches: GameModelStore.getState().gameSwitches,
            quests: GameModelStore.getState().quests,
            questResult: null,
            isQuestResultWin: false,
            questSelect: null
        };
    }

    render() {
        return (
            <div>
                <h3 style={{ verticalAlign: 'middle' }}>Available guild quests</h3>
                {this.renderQuests()}
                {this.renderQuestEndOverlay()}
                {this.renderQuestStartOverlay()}
            </div>
        );
    }

    componentWillMount() {
        this.gameStoreListener = GameModelStore.addListener(() => {
            this.setState({
                gameSwitches: GameModelStore.getState().gameSwitches,
                quests: GameModelStore.getState().quests
            });
        });
    }

    componentWillUnmount() {
        if (this.gameStoreListener) {
            this.gameStoreListener.remove();
        }
    }

    renderQuests = () => {
        const result: JSX.Element[] = [];
        let i = 0;
        for (let quest of this.state.quests) {
            result.push(<QuestInfo key={`QUEST_${i++}`} quest={quest} doEndQuest={this.endQuest} doSelectQuest={this.doSelectQuest} />);
        }
        return result;
    }

    renderQuestEndOverlay = () => {
        const quest = this.state.questResult;
        if (quest) {
            return (
                <Overlay display={!!quest} closeOverlayCallback={() => this.setState({ questResult: null })} width={80} height={80}>
                    {this.state.isQuestResultWin &&
                        this.renderQuestWin(quest)}
                    {!this.state.isQuestResultWin &&
                        this.renderQuestLose(quest)}
                    <button onClick={() => this.setState({ questResult: null })}>Acknowledge</button>
                </Overlay>
            );
        }
        return null;
    }

    renderQuestStartOverlay = () => {
        if (this.state.questSelect) {
            const questData = QuestData.get(this.state.questSelect.id);
            return (
                <SelectHeroOverlay
                    display={!!this.state.questSelect}
                    maxSelection={questData.maxPartySize}
                    doCancelSelection={() => this.setState({ questSelect: null })}
                    doConfirmSelection={(heroes: Hero[]) => this.startQuest(this.state.questSelect, heroes)}>
                    <h3>{questData.title}</h3>
                    <h2>Select heroes to go on this quest.</h2>
                </SelectHeroOverlay>
            );
        }
        return null;
    }

    renderQuestSelectOverlay = () => {
        const quest = this.state.questSelect;
        if (quest) {
            return (
                <Overlay display={!!quest} closeOverlayCallback={() => this.setState({ questSelect: null })} width={80} height={80}>
                    {this.state.isQuestResultWin &&
                        this.renderQuestWin(quest)}
                    {!this.state.isQuestResultWin &&
                        this.renderQuestLose(quest)}
                    <button onClick={() => this.setState({ questResult: null })}>Acknowledge</button>
                </Overlay>
            );
        }
        return null;
    }

    renderQuestWin = (quest: Quest) => {
        const questData = QuestData.get(quest.id);
        return (
            <div>
                <h3>{questData.title}</h3>
                <h2>WIN !</h2>
                <Resource type={ResourceType.GOLD} value={questData.reward.gold} modifier />
                <Resource type={ResourceType.EXP} value={questData.reward.exp} modifier />
            </div>
        );
    }

    renderQuestLose = (quest: Quest) => {
        const questData = QuestData.get(quest.id);
        return (
            <div>
                <h3>{questData.title}</h3>
                <h2>LOSE !</h2>
            </div>
        );
    }

    endQuest = (quest: Quest) => {
        const isWin = QuestHelper.endQuest(quest);
        this.setState({ questResult: quest, isQuestResultWin: isWin });
    }

    startQuest = (quest: Quest, heroes: Hero[]) => {
        QuestHelper.startQuest(quest, heroes);
        this.setState({ questSelect: null });
    }

    doSelectQuest = (quest: Quest) => {
        this.setState({ questSelect: quest });
    }
}