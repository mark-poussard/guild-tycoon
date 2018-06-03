import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import { QuestData } from 'data/QuestData';
import Quest from 'model/Quest';
import QuestInfo from 'components/body/quest-tab/QuestInfo';
import GameModelStore from 'store/game-model/GameModelStore';
import GameSwitches from 'model/GameSwitches';
import Overlay from 'components/generic/Overlay';

interface IQuestTabState {
    gameSwitches: GameSwitches;
    quests: Quest[];

}

export default class QuestTab extends React.Component<{}, IQuestTabState>{
    gameStoreListener: fbEmitter.EventSubscription;

    constructor(props: {}) {
        super(props);
        this.state = {
            gameSwitches: GameModelStore.getState().gameSwitches,
            quests: GameModelStore.getState().quests
        };
    }

    render() {
        return (
            <div>
                <h3 style={{ verticalAlign: 'middle' }}>Available guild quests</h3>
                {this.renderQuests()}
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
                result.push(<QuestInfo key={`QUEST_${i}`} quest={QuestData[i]} />);
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

    endQuest = (quest: Quest) => {
        const questHeroes = this.getQuestHeroes(quest);
    }

    getQuestHeroes = (quest: Quest) => {
        const heroes = GameModelStore.getState().heroes.asArray();
        const questHeroes = [];
        for (let i = 0; i < heroes.length; i++) {
            if (heroes[i].questId === quest.id) {
                questHeroes.push(heroes[i]);
            }
        }
        return questHeroes;
    }
}