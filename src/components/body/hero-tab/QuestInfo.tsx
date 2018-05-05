import * as React from 'react';
import * as FbEmitter from 'fbemitter';
import Hero from 'model/Hero';
import Quest from 'model/Quest';
import QuestProgress from 'components/body/hero-tab/QuestProgress';
import QuestButton from 'components/body/hero-tab/QuestButton';
import GameModelDispatcher from 'store/game-model/GameModelDispatcher';
import { GameModelActionTypes } from 'store/game-model/GameModelActionTypes';
import QuestStore from 'store/quest/QuestStore';
import './QuestInfo.css';
import GameModelStore from 'store/game-model/GameModelStore';

interface IQuestInfoProps {
    hero: Hero;
}

interface IQuestInfoState {
    autoQuest: boolean;
    isInProgress: boolean;
}

export default class QuestInfo extends React.Component<IQuestInfoProps, IQuestInfoState>{
    questEndedListener: FbEmitter.EventSubscription;
    questStartedListener: FbEmitter.EventSubscription;
    gameModelListener: FbEmitter.EventSubscription;
    constructor(props: IQuestInfoProps) {
        super(props);
        this.state = { autoQuest: this.props.hero.autoQuest, isInProgress: QuestStore.isQuestInProgress(this.props.hero.id) };
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
        if (this.state.isInProgress) {
            return (
                <QuestProgress heroId={this.props.hero.id} />
            );
        }
        else {
            return (
                <QuestButton heroId={this.props.hero.id} />
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

    componentDidMount() {
        this.questEndedListener = QuestStore.registerQuestEndedListener((heroId) => {
            if(heroId == this.props.hero.id){
                this.setState({ isInProgress: false });
            }
        });
        this.questStartedListener = QuestStore.registerQuestStartedListener((heroId) => {
            if(heroId == this.props.hero.id){
            this.setState({ isInProgress: true });
            }
        });
        this.gameModelListener = GameModelStore.addListener(() => {
            const heroes = GameModelStore.getState().heroes;
            const autoQuest = heroes.get(this.props.hero.id).autoQuest;
            this.setState({ autoQuest: autoQuest });
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
                heroId: this.props.hero.id,
                autoQuest: true
            }
        });
        if (!this.state.isInProgress) {
            QuestStore.startQuest(this.props.hero.id);
        }
    }

    stopAutoQuest = () => {
        GameModelDispatcher.dispatch({
            type: GameModelActionTypes.SET_AUTO_QUEST,
            payload: {
                heroId: this.props.hero.id,
                autoQuest: false
            }
        });
    }
}