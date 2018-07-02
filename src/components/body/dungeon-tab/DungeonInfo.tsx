import * as React from 'react';
import DungeonBase, { DungeonMode } from 'model/DungeonBase';
import Tabs from 'components/generic/tabs/Tabs';
import Tab from 'components/generic/tabs/Tab';
import QuestMap from 'model/serializable/QuestMap';
import DungeonModeInfo from 'components/body/dungeon-tab/DungeonModeInfo';
import Dungeon from 'model/Dungeon';
import Quest from 'model/Quest';
import BaseQuest from 'model/BaseQuest';

interface IDungeonInfoProps {
    dungeon: DungeonBase;
    dungeonState : Dungeon;
    doEndQuest : (quest : Quest, questData: BaseQuest) => void;
}

interface IDungeonInfoState {
}

let tabIdGenerator = 0;

export default class DungeonInfo extends React.Component<IDungeonInfoProps, IDungeonInfoState>{

    constructor(props: IDungeonInfoProps) {
        super(props);
    }

    render() {
        const difficultyTabs: JSX.Element[] = [];
        for (const mode in this.props.dungeon.modes) {
            difficultyTabs.push(
                <Tab key={`TAB_${mode}_${tabIdGenerator++}`} name={mode}>
                    <DungeonModeInfo dungeon={this.props.dungeon} mode={mode as DungeonMode} dungeonState={this.props.dungeonState} doEndQuest={this.props.doEndQuest}/>
                </Tab>
            );
        }
        let defaultTab;
        if(this.props.dungeonState){
            defaultTab = this.props.dungeonState.mode;
        }
        return (
            <div className='container'>
                <h3>{this.props.dungeon.name}</h3>
                <Tabs defaultTab={defaultTab}>
                    {difficultyTabs}
                </Tabs>
            </div>
        );
    }
}