import * as React from 'react';
import DungeonBase, { DungeonMode, dungeonToQuestData } from 'model/DungeonBase';
import Tabs from 'components/generic/tabs/Tabs';
import Tab from 'components/generic/tabs/Tab';
import Ennemy from 'model/BattleEntity';
import EnnemyInfo from '../../generic/ennemy/EnnemyInfo';
import Resource, { ResourceType } from '../../generic/resource/Resource';
import QuestHelper from 'business/QuestHelper';
import SelectHeroOverlay from 'components/generic/select-hero-overlay/SelectHeroOverlay';
import Hero from 'model/Hero';
import QuestMap from 'model/serializable/QuestMap';
import QuestAction from 'components/body/quest-tab/QuestAction';
import BaseQuest from 'model/BaseQuest';
import Quest from 'model/Quest';
import GameModelDispatcher from 'store/game-model/GameModelDispatcher';
import { GameModelActionTypes } from 'store/game-model/GameModelActionTypes';
import EndQuestResult from 'business/EndQuestResult';
import QuestResultOverlay from 'components/body/quest-tab/QuestResultOverlay';

interface IDungeonInfoProps {
    dungeon: DungeonBase;
    activeQuests : QuestMap;
}

interface IDungeonInfoState {
    overlayDisplayed : boolean;
    questResult : EndQuestResult;
}

export default class DungeonInfo extends React.Component<IDungeonInfoProps, IDungeonInfoState>{

    constructor(props : IDungeonInfoProps){
        super(props);
        this.state = {overlayDisplayed : false, questResult : null};
    }

    render() {
        const difficultyTabs: JSX.Element[] = [];
        for (const mode in this.props.dungeon.modes) {
            difficultyTabs.push(
                <Tab key={`TAB_${mode}`} name={mode}>
                    {this.renderDungeonMode(mode as DungeonMode)}
                </Tab>
            );
        }
        return (
            <div className='container'>
                <h3>{this.props.dungeon.name}</h3>
                <Tabs>
                    {difficultyTabs}
                </Tabs>
            </div>
        );
    }

    renderDungeonMode = (mode: DungeonMode): React.ReactChild => {
        const dungeonModeData = this.props.dungeon.modes[mode];
        const questData = this.getQuestData(mode);
        const quest = this.getQuest();
        return (
            <div>
                <h2>{mode}</h2>
                {this.renderEnnemies(dungeonModeData.ennemies)}
                <Resource type={ResourceType.GOLD} value={dungeonModeData.reward.gold} />
                <Resource type={ResourceType.EXP} value={dungeonModeData.reward.exp} />
                <Resource type={ResourceType.TIME} value={QuestHelper.durationToString(dungeonModeData.duration.toMs())} />
                {this.renderStatusButton(quest, questData)}
                <SelectHeroOverlay 
                    display={this.state.overlayDisplayed} 
                    maxSelection={this.props.dungeon.modes[mode].maxPartySize} 
                    doCancelSelection={this.closeHeroSelect}
                    doConfirmSelection={this.confirmHeroes(quest)} />
                <QuestResultOverlay questResult={this.state.questResult} questData={questData} closeOverlay={() => this.setState({questResult : null})} />
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
        this.setState({overlayDisplayed : false});
    }

    openHeroSelect = () => {
        this.setState({overlayDisplayed : true});
    }

    confirmHeroes = (quest : Quest) => {
        return (heroes : Hero[]) => {
            QuestHelper.startQuest(quest, heroes);
            this.closeHeroSelect();
        }
    }

    renderStatusButton = (quest : Quest, questData: BaseQuest) => {
        return (
            <QuestAction quest={quest} 
            questData={questData} 
            start={this.start} startTxt={`Challenge`} 
            end={this.end(quest, questData)} endTxt={`Complete`}/>
        )
    }

    getQuest = () => {
        if(this.props.activeQuests.hasOwnProperty(this.props.dungeon.id)){
            return this.props.activeQuests[this.props.dungeon.id];
        }
        return null;
    }

    getQuestData = (mode: DungeonMode) => {
        return dungeonToQuestData(this.props.dungeon, mode);
    }

    start = () => {
        this.setState({overlayDisplayed : true});
    }

    end = (quest : Quest, questData : BaseQuest) => {
        return () => {
            this.setState({questResult : QuestHelper.endQuest(quest, questData) });
        }
    }
}