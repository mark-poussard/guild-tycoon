import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import DungeonBase, { DungeonMode, dungeonToQuestData } from 'model/DungeonBase';
import Ennemy from 'model/BattleEntity';
import EnnemyInfo from 'components/generic/ennemy/EnnemyInfo';
import Quest from 'model/Quest';
import Hero from 'model/Hero';
import QuestHelper from 'business/QuestHelper';
import BaseQuest from 'model/BaseQuest';
import QuestAction from 'components/body/quest-tab/QuestAction';
import Resource, { ResourceType } from 'components/generic/resource/Resource';
import SelectHeroOverlay from 'components/generic/select-hero-overlay/SelectHeroOverlay';
import QuestResultOverlay from 'components/body/quest-tab/QuestResultOverlay';
import EndQuestResult from 'business/EndQuestResult';
import QuestMap from 'model/serializable/QuestMap';
import GameModelStore from 'store/game-model/GameModelStore';
import Dungeon from 'model/Dungeon';
import DungeonHelper from 'business/DungeonHelper';

interface IDungeonModeInfoProps {
    dungeon: DungeonBase;
    dungeonState : Dungeon;
    mode: DungeonMode;
}

interface IDungeonModeInfoState {
    overlayDisplayed: boolean;
    questResult: EndQuestResult;
    activeQuests: QuestMap;
}

export default class DungeonModeInfo extends React.Component<IDungeonModeInfoProps, IDungeonModeInfoState>{
    storeSubscribe: fbEmitter.EventSubscription;

    constructor(props: IDungeonModeInfoProps) {
        super(props);
        this.state = { overlayDisplayed: false, questResult: null, activeQuests: this.copyActiveQuests() };
    }

    componentDidMount() {
        this.storeSubscribe = GameModelStore.addListener(() => {
            this.setState({
                activeQuests: this.copyActiveQuests()
            });
        });
    }

    componentWillUnmount() {
        this.storeSubscribe.remove();
    }

    render() {
        const dungeonModeData = this.props.dungeon.modes[this.props.mode];
        const questData = this.getQuestData(this.props.mode);
        const quest = this.getQuest();
        return (
            <div>
                <h2>{this.props.mode}</h2>
                {this.renderEnnemies(dungeonModeData.ennemies)}
                <Resource type={ResourceType.GOLD} value={dungeonModeData.reward.gold} />
                <Resource type={ResourceType.EXP} value={dungeonModeData.reward.exp} />
                <Resource type={ResourceType.TIME} value={QuestHelper.durationToString(dungeonModeData.duration.toMs())} />
                {this.renderStatusButton(quest, questData)}
                <SelectHeroOverlay
                    display={this.state.overlayDisplayed}
                    maxSelection={this.props.dungeon.modes[this.props.mode].maxPartySize}
                    doCancelSelection={this.closeHeroSelect}
                    doConfirmSelection={this.confirmHeroes(quest)} />
                <QuestResultOverlay questResult={this.state.questResult} questData={questData} closeOverlay={() => this.setState({ questResult: null })} />
            </div>
        );
    }

    renderEnnemies = (ennemies: Ennemy[]) => {
        const ennemyList: JSX.Element[] = [];
        let i = 0;
        for (const ennemy of ennemies) {
            ennemyList.push(<EnnemyInfo key={`ENNEMY_${i++}`} ennemy={ennemy} />)
        }
        return (
            <div>
                {ennemyList}
            </div>
        )
    }

    closeHeroSelect = () => {
        this.setState({ overlayDisplayed: false });
    }

    openHeroSelect = () => {
        this.setState({ overlayDisplayed: true });
    }

    confirmHeroes = (quest: Quest) => {
        return (heroes: Hero[]) => {
            DungeonHelper.startDungeon(quest, heroes, this.props.mode);
            this.closeHeroSelect();
        }
    }

    renderStatusButton = (quest: Quest, questData: BaseQuest) => {
        if(!this.props.dungeonState || (this.props.dungeonState && this.props.dungeonState.mode === this.props.mode)){
            return (
                <QuestAction quest={quest}
                    questData={questData}
                    start={this.openHeroSelect} startTxt={`Challenge`}
                    end={this.end(quest, questData)} endTxt={`Complete`} />
            )
        }
        else{
            return (
                <span>{`${this.props.dungeonState.mode} dungeon mode in progress...`}</span>
            );
        }
    }

    getQuest = () => {
        if (!this.state.activeQuests.hasOwnProperty(this.props.dungeon.id)) {
            const quest = new Quest();
            quest.id = this.props.dungeon.id;
            return quest;
        }
        return this.state.activeQuests[this.props.dungeon.id];
    }

    getQuestData = (mode: DungeonMode) => {
        return dungeonToQuestData(this.props.dungeon, mode);
    }

    end = (quest: Quest, questData: BaseQuest) => {
        return () => {
            DungeonHelper.endDungeon(quest);
            this.setState({ questResult: QuestHelper.endQuest(quest, questData) });
        }
    }

    copyActiveQuests = () => {
        return Object.assign({}, GameModelStore.getState().quests);
    }
}