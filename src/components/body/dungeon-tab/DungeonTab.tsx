import * as React from 'react';
import Dungeon from 'model/Dungeon';
import DungeonInfo from 'components/body/dungeon-tab/DungeonInfo';
import SelectHeroOverlay from 'components/body/dungeon-tab/SelectHeroOverlay';

interface IDungeonTabProps {

}

interface IDungeonTabState {
    selectedDungeon: Dungeon;
    questCallback: (heroes: Set<string>) => void;
}

export default class DungeonTab extends React.Component<IDungeonTabProps, IDungeonTabState>{
    constructor(props: IDungeonTabProps) {
        super(props);
        this.state = { selectedDungeon: null, questCallback: null };
    }

    render() {
        return (
            <div>
                {this.renderDungeons()}
                {this.renderOverlay()}
            </div>
        );
    }

    renderDungeons = () => {
        const result: JSX.Element[] = [];
        for (let i = 0; i < dungeons.length; i++) {
            result.push(<DungeonInfo key={`DUNGEONINFO_${i}`} dungeon={dungeons[i]} doDungeonSelection={this.doDungeonSelection} />);
        }
        return result;
    }

    renderOverlay = () => {
        if (this.state.selectedDungeon) {
            return (
                <SelectHeroOverlay dungeon={this.state.selectedDungeon} callback={this.state.questCallback} doDungeonSelection={this.doDungeonSelection} />
            );
        }
        return null;
    }

    doDungeonSelection = (dungeon: Dungeon, callback: (heroes: Set<string>) => void) => {
        this.setState({ selectedDungeon: dungeon, questCallback: callback });
    }
}

const dungeons: Dungeon[] = [
    {
        name: 'Haunted Windmill',
        imgUrl: 'img/haunted_windmill.png',
        duration: 30000,
        partySize: 1,
        reward: {
            gold: 200,
            exp: 20,
            fame: 5,
            claimed: false
        },
        recRank: 1,
        recLvl: 10,
    },
    {
        name: 'Creepy Crypt',
        imgUrl: 'img/haunted_windmill.png',
        duration: 1000,
        partySize: 2,
        reward: {
            gold: 500,
            exp: 40,
            fame: 10,
            claimed: false
        },
        recRank: 1,
        recLvl: 30,
    }
];