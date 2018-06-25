import * as React from 'react';
import DungeonBase, { DungeonMode } from 'model/DungeonBase';
import Tabs from 'components/generic/tabs/Tabs';
import Tab from 'components/generic/tabs/Tab';
import QuestMap from 'model/serializable/QuestMap';
import DungeonModeInfo from 'components/body/dungeon-tab/DungeonModeInfo';

interface IDungeonInfoProps {
    dungeon: DungeonBase;
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
                    <DungeonModeInfo dungeon={this.props.dungeon} mode={mode as DungeonMode} />
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
}