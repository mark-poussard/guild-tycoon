import * as React from 'react';
import * as FbEmitter from 'fbemitter';
import Hero from 'model/Hero';
import Quest from 'model/Quest';
import QuestProgress from 'components/generic/quest/QuestProgress';
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
        const quest = GameModelStore.getState().heroes.get(this.props.hero.id).quest;
        const questId = (quest) ? quest.id : null;
        this.state = { autoQuest: this.props.hero.autoQuest, questId: questId };
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
                <QuestProgress questId={this.state.questId} />
            );
        }
        else {
            return (
                <QuestButton heroId={this.props.hero.id} doSetQuestId={this.doSetQuestId} />
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
        this.questEndedListener = QuestStore.registerQuestEndedListener((quest) => {
            if (quest.id == this.state.questId) {
                this.doSetQuestId(null);
            }
        });
        this.questStartedListener = QuestStore.registerQuestStartedListener((quest) => {
            if (quest.heroes.indexOf(this.props.hero.id) > -1) {
                this.doSetQuestId(quest.id);
            }
        });
        this.gameModelListener = GameModelStore.addListener(() => {
            const hero = GameModelStore.getState().heroes.get(this.props.hero.id);
            const questId = (hero.quest) ? hero.quest.id : null;
            this.setState({ autoQuest: hero.autoQuest, questId: questId });
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
        if (!this.state.questId) {
            const questId = QuestStore.startQuest([this.props.hero.id], this.questGenerator.generateAutoQuest(this.props.hero.id));
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
                heroId: this.props.hero.id,
                autoQuest: false
            }
        });
    }
}