import * as React from 'react';
import Hero from 'model/Hero';
import Quest from 'model/Quest';
import QuestProgress from 'components/body/hero-tab/QuestProgress';
import QuestButton from 'components/body/hero-tab/QuestButton';
import GameModelDispatcher from 'store/game-model/GameModelDispatcher';
import { GameModelActionTypes } from 'store/game-model/GameModelActionTypes';
import './QuestInfo.css';

interface IQuestInfoProps {
    hero: Hero;
}

interface IQuestInfoState {
    autoQuest: boolean;
    quest: Quest;
}

export default class QuestInfo extends React.Component<IQuestInfoProps, IQuestInfoState>{
    constructor(props: IQuestInfoProps) {
        super(props);
        this.state = { autoQuest: this.props.hero.autoQuest, quest: this.props.hero.quest }
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
        if (this.state.quest != null) {
            return (
                <QuestProgress quest={this.state.quest} questEnded={this.questEnded} />
            );
        }
        else {
            return (
                <QuestButton startQuest={this.startQuest} />
            );
        }
    }

    renderAuto = () => {
        if (this.state.autoQuest) {
            return <input className="auto-quest" type="image" src="img/cross.png" onClick={this.stopAutoQuest} />
        }
        else {
            return <input className="auto-quest" type="image" src="img/auto.png" onClick={this.startAutoQuest} />

        }
    }

    startAutoQuest = () => {
        this.setState({ autoQuest: true });
        if (this.state.quest == null) {
            this.startQuest();
        }
    }

    stopAutoQuest = () => {
        this.setState({ autoQuest: false });
    }

    startQuest = () => {
        const quest: Quest = {
            startTime: new Date(),
            duration: 6000,
            reward: {
                gold: 10,
                exp: 2,
                fame: 1
            }
        }
        GameModelDispatcher.dispatch({ type: GameModelActionTypes.ASSIGN_QUEST, payload: { heroId: this.props.hero.id, quest: quest } });
        this.setState({ quest: quest });
    }

    questEnded = (quest: Quest) => {
        GameModelDispatcher.dispatch({ type: GameModelActionTypes.ADD_EXP, payload: { quantity: quest.reward.exp } });
        GameModelDispatcher.dispatch({ type: GameModelActionTypes.ADD_FAME, payload: { quantity: quest.reward.fame } });
        GameModelDispatcher.dispatch({ type: GameModelActionTypes.ADD_GOLD, payload: { quantity: quest.reward.gold } });
        if (this.state.autoQuest) {
            this.startQuest();
        }
        else {
            GameModelDispatcher.dispatch({ type: GameModelActionTypes.ASSIGN_QUEST, payload: { heroId: this.props.hero.id, quest: null } });
            this.props.hero.quest = null;
            this.setState({ quest: null });
        }
    }
}