import * as React from 'react';
import QuestProgressBar from 'components/generic/quest/QuestProgressBar';
import Hero from 'model/Hero';
import Quest from 'model/Quest';
import GameModelStore from 'store/game-model/GameModelStore';
import NavigationStore, { TabType } from 'store/navigation/NavigationStore';
import { dungeonToQuestData } from 'model/DungeonBase';
import { DungeonData, DungeonDataArray } from 'data/DungeonData';

interface IHeroQuestProgressProps {
    hero: Hero;
}

interface IHeroQuestProgressState {
    quest: Quest;
    isDungeon : boolean;
    questFinished: boolean;
}

export default class HeroQuestProgress extends React.Component<IHeroQuestProgressProps, IHeroQuestProgressState>{

    constructor(props: IHeroQuestProgressProps) {
        super(props);
        this.state = { quest: this.getHeroQuest(), questFinished: false, isDungeon : this.isDungeon() };
    }

    render() {
        if (this.state.questFinished) {
            return (
                <button onClick={this.goToQuests}>Quest is finished</button>
            )
        }
        else if (this.state.quest) {
            let questData;
            if(this.state.isDungeon){
                questData = dungeonToQuestData(DungeonDataArray.get(this.props.hero.questId), GameModelStore.getState().dungeons[this.props.hero.questId].mode)
            }
            return (
                <QuestProgressBar quest={this.state.quest} questData={questData} doQuestOver={() => this.setState({ questFinished : true })} widthPrct={100} />
            );
        }
        return null;
    }

    componentWillReceiveProps(nextProps: IHeroQuestProgressProps) {
        this.setState({ quest: this.getHeroQuest(nextProps), questFinished: false, isDungeon : this.isDungeon(nextProps) });
    }

    getHeroQuest = (nxtProps?: IHeroQuestProgressProps) => {
        const props = nxtProps || this.props;
        if (props.hero.questId != null) {
            return GameModelStore.getState().quests[props.hero.questId];
        }
        return null;
    }

    isDungeon = (nxtProps?: IHeroQuestProgressProps) => {
        const props = nxtProps || this.props;
        if(props.hero.questId != null){
            return GameModelStore.getState().dungeons.hasOwnProperty(props.hero.questId);
        }
        return false;
    }

    goToQuests = () => {
        if(this.state.isDungeon){
            NavigationStore.navigateTo(TabType.DUNGEONS);
        }
        else{
            NavigationStore.navigateTo(TabType.QUESTS);
        }
    }
}