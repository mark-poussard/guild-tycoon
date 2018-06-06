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
        for (let i = 0; i < QuestData.length; i++) {
            if (this.shouldRenderQuest(QuestData[i])) {
                result.push(<QuestInfo key={`QUEST_${i}`} quest={QuestData[i]} doEndQuest={this.endQuest} doSelectQuest={this.doSelectQuest} />);
            }
        }
        return result;
    }

    shouldRenderQuest = (quest: Quest) => {
        let isRender = true;
        const dependencies = quest.switchDependencies;
        for (let i = 0; i < dependencies.length; i++) {
            const dependency = dependencies[i];
            if (!this.state.gameSwitches[dependency]) {
                return false;
            }
        }
        return quest.completedAt == null || quest.repeat != null;
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
            return (
                <SelectHeroOverlay
                    display={!!this.state.questSelect}
                    maxSelection={this.state.questSelect.maxPartySize}
                    doCancelSelection={() => this.setState({ questSelect: null })}
                    doConfirmSelection={(heroes: Hero[]) => this.startQuest(this.state.questSelect, heroes)}>
                    <h3>{this.state.questSelect.title}</h3>
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
        return (
            <div>
                <h3>{quest.title}</h3>
                <h2>WIN !</h2>
                <Resource type={ResourceType.GOLD} value={quest.reward.gold} modifier />
                <Resource type={ResourceType.EXP} value={quest.reward.exp} modifier />
            </div>
        );
    }

    renderQuestLose = (quest: Quest) => {
        return (
            <div>
                <h3>{quest.title}</h3>
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