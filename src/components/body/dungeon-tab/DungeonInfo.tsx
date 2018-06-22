import * as React from 'react';
import DungeonBase, { DungeonMode } from 'model/DungeonBase';
import Tabs from 'components/generic/tabs/Tabs';
import Tab from 'components/generic/tabs/Tab';
import Ennemy from 'model/BattleEntity';
import EnnemyInfo from '../../generic/ennemy/EnnemyInfo';
import Resource, { ResourceType } from '../../generic/resource/Resource';
import QuestHelper from 'business/QuestHelper';

interface IDungeonInfoProps {
    dungeon: DungeonBase;
}

interface IDungeonInfoState {

}

export default class DungeonInfo extends React.Component<IDungeonInfoProps, IDungeonInfoState>{

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
        return (
            <div>
                <h2>{mode}</h2>
                {this.renderEnnemies(dungeonModeData.ennemies)}
                <Resource type={ResourceType.GOLD} value={dungeonModeData.reward.gold} />
                <Resource type={ResourceType.EXP} value={dungeonModeData.reward.exp} />
                <Resource type={ResourceType.TIME} value={QuestHelper.durationToString(dungeonModeData.duration.toMs())} />
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
}