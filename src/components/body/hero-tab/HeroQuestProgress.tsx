import * as React from 'react';
import QuestProgressBar from 'components/generic/quest/QuestProgressBar';
import Hero from 'model/Hero';
import Quest from 'model/Quest';
import GameModelStore from 'store/game-model/GameModelStore';
import NavigationStore, { TabType } from 'store/navigation/NavigationStore';

interface IHeroQuestProgressProps {
    hero: Hero;
}

interface IHeroQuestProgressState {
    quest: Quest;
    questFinished: boolean;
}

export default class HeroQuestProgress extends React.Component<IHeroQuestProgressProps, IHeroQuestProgressState>{

    constructor(props: IHeroQuestProgressProps) {
        super(props);
        this.state = { quest: this.getHeroQuest(), questFinished: false };
    }

    render() {
        if (this.state.questFinished) {
            return (
                <button onClick={this.goToQuests}>Quest is finished</button>
            )
        }
        else if (this.state.quest) {
            return (
                <QuestProgressBar quest={this.state.quest} doQuestOver={() => this.setState({ questFinished : true })} widthPrct={100} />
            );
        }
        return null;
    }

    componentWillReceiveProps(nextProps: IHeroQuestProgressProps) {
        this.setState({ quest: this.getHeroQuest(nextProps), questFinished: false });
    }

    getHeroQuest = (nxtProps?: IHeroQuestProgressProps) => {
        const props = nxtProps || this.props;
        if (props.hero.questId != null) {
            return GameModelStore.getState().quests[props.hero.questId];
        }
        return null;
    }

    goToQuests = () => {
        NavigationStore.navigateTo(TabType.QUESTS);
    }
}