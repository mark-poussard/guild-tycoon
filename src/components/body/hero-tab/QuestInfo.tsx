import * as React from 'react';
import * as FbEmitter from 'fbemitter';
import Hero from 'model/Hero';
import Quest from 'model/Quest';
import QuestProgressContainer from 'components/generic/quest/QuestProgressContainer';
import QuestButton from 'components/body/hero-tab/QuestButton';
import GameModelDispatcher from 'store/game-model/GameModelDispatcher';
import { GameModelActionTypes } from 'store/game-model/GameModelActionTypes';
import QuestStore from 'store/quest/QuestStore';
import './QuestInfo.css';
import GameModelStore from 'store/game-model/GameModelStore';
import QuestGenerator from 'store/quest/QuestGenerator';

interface IQuestInfoProps {
    hero: Hero;
}

interface IQuestInfoState {
    autoQuestImprovement: boolean;
    autoQuest: boolean;
    questId: string;
}

export default class QuestInfo extends React.Component<IQuestInfoProps, IQuestInfoState>{
    questEndedListener: FbEmitter.EventSubscription;
    questStartedListener: FbEmitter.EventSubscription;
    gameModelListener: FbEmitter.EventSubscription;

    questGenerator: QuestGenerator;
    constructor(props: IQuestInfoProps) {
        super(props);
        const gameState = GameModelStore.getState();
        const questId = gameState.heroes.get(this.props.hero.data.id).questId;
        this.state = { autoQuest: false, questId: questId, autoQuestImprovement: gameState.improvements.autoQuest };
        this.questGenerator = new QuestGenerator();
    }

    render() {
        return (
            <div>
                {this.renderQuest()}
                {this.renderAuto()}
            </div>
        );
    }

    renderQuest = () => {
        if (this.state.questId) {
            return (
                <QuestProgressContainer questId={this.state.questId} />
            );
        }
        else {
            return (
                <QuestButton heroId={this.props.hero.data.id} doSetQuestId={this.doSetQuestId} />
            );
        }
    }

    renderAuto = () => {
        if (this.state.autoQuestImprovement) {
            if (this.state.autoQuest) {
                return <input className="auto-quest" type="image" src="img/cross.png" onClick={this.stopAutoQuest} />
            }
            else {
                return <input className="auto-quest" type="image" src="img/auto.png" onClick={this.startAutoQuest} />
            }
        }
        return null;
    }

    componentDidMount() {
        this.questEndedListener = QuestStore.registerQuestEndedListener((quest) => {
            if (quest.id == this.state.questId) {
                this.doSetQuestId(null);
            }
        });
        this.questStartedListener = QuestStore.registerQuestStartedListener((quest) => {
            if (quest.heroes.indexOf(this.props.hero.data.id) > -1) {
                this.doSetQuestId(quest.id);
            }
        });
        this.gameModelListener = GameModelStore.addListener(() => {
            const gameState = GameModelStore.getState();
            const hero = gameState.heroes.get(this.props.hero.data.id);
            const questId = hero.questId;
            this.setState({ autoQuest: false, questId: questId, autoQuestImprovement: gameState.improvements.autoQuest });
        });
    }

    componentWillUnmount() {
        if (this.questEndedListener) {
            this.questEndedListener.remove();
        }
        if (this.questStartedListener) {
            this.questStartedListener.remove();
        }
        if (this.gameModelListener) {
            this.gameModelListener.remove();
        }
    }

    startAutoQuest = () => {
        GameModelDispatcher.dispatch({
            type: GameModelActionTypes.SET_AUTO_QUEST,
            payload: {
                heroId: this.props.hero.data.id,
                autoQuest: true
            }
        });
        if (!this.state.questId) {
            const questId = QuestStore.startQuest([this.props.hero.data.id], this.questGenerator.generateAutoQuest(this.props.hero.data.id));
            this.doSetQuestId(questId);
        }
    }

    doSetQuestId = (questId: string) => {
        this.setState({ questId: questId });
    }

    stopAutoQuest = () => {
        GameModelDispatcher.dispatch({
            type: GameModelActionTypes.SET_AUTO_QUEST,
            payload: {
                heroId: this.props.hero.data.id,
                autoQuest: false
            }
        });
    }
}