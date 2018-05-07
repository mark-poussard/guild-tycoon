import * as React from 'react';
import Dungeon from 'model/Dungeon';
import DungeonInfo from 'components/body/dungeon-tab/DungeonInfo';
import SelectHeroOverlay from 'components/body/dungeon-tab/SelectHeroOverlay';

interface IDungeonTabProps {

}

interface IDungeonTabState {
    selectedDungeon: Dungeon;
    questCallback: (questId: string) => void;
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

    doDungeonSelection = (dungeon: Dungeon, callback: (questId: string) => void) => {
        this.setState({ selectedDungeon: dungeon, questCallback: callback });
    }
}

const dungeons: Dungeon[] = [
    {
        id: '1',
        name: 'Haunted Windmill',
        imgUrl: 'img/haunted_windmill.png',
        duration: 45000,
        partySize: 1,
        reward: {
            gold: 200,
            exp: 20,
            fame: 5
        },
        recRank: 1,
        recLvl: 10,
    },
    {
        id: '2',
        name: 'Creepy Crypt',
        imgUrl: 'img/haunted_windmill.png',
        duration: 75000,
        partySize: 2,
        reward: {
            gold: 500,
            exp: 40,
            fame: 10
        },
        recRank: 1,
        recLvl: 30,
    },
    {
        id: '3',
        name: 'Gassy Swamp',
        imgUrl: 'img/haunted_windmill.png',
        duration: 90000,
        partySize: 2,
        reward: {
            gold: 1000,
            exp: 80,
            fame: 15
        },
        recRank: 2,
        recLvl: 20,
    },
    {
        id: '4',
        name: 'Cursed Castle',
        imgUrl: 'img/haunted_windmill.png',
        duration: 120000,
        partySize: 4,
        reward: {
            gold: 2000,
            exp: 200,
            fame: 30
        },
        recRank: 3,
        recLvl: 15,
    },
    {
        id: '5',
        name: 'Dragon Cave',
        imgUrl: 'img/haunted_windmill.png',
        duration: 300000,
        partySize: 8,
        reward: {
            gold: 7500,
            exp: 800,
            fame: 50
        },
        recRank: 4,
        recLvl: 10,
    }
];