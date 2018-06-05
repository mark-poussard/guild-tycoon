import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import Dungeon from 'model/Dungeon';
import DungeonInfo from 'components/body/dungeon-tab/DungeonInfo';
import SelectHeroOverlay from 'components/body/dungeon-tab/SelectHeroOverlay';
import GameModelStore from 'store/game-model/GameModelStore';
import GameModelDispatcher from 'store/game-model/GameModelDispatcher';
import Overlay from 'components/generic/Overlay';

interface IDungeonTabProps {

}

interface IDungeonTabState {
    completedDungeons: Set<string>;
    selectedDungeon: Dungeon;
    questCallback: (questId: string) => void;
}

export default class DungeonTab extends React.Component<IDungeonTabProps, IDungeonTabState>{
    storeSubscribe: fbEmitter.EventSubscription;

    constructor(props: IDungeonTabProps) {
        super(props);
        const completedDungeons = GameModelStore.getState().completedDungeons;
        this.state = { selectedDungeon: null, questCallback: null, completedDungeons: completedDungeons };
    }

    render() {
        return (
            <div>
                {this.renderDungeons()}
                {this.renderOverlay()}
            </div>
        );
    }

    componentDidMount() {
        this.storeSubscribe = GameModelStore.addListener(() => {
            this.setState({ completedDungeons: GameModelStore.getState().completedDungeons });
        });
    }

    componentWillUnmount() {
        this.storeSubscribe.remove();
    }

    renderDungeons = () => {
        const result: JSX.Element[] = [];
        for (let i = 0; i < dungeons.length; i++) {
            if (!this.state.completedDungeons.has(dungeons[i].id)) {
                result.push(<DungeonInfo key={`DUNGEONINFO_${i}`} dungeon={dungeons[i]} doDungeonSelection={this.doDungeonSelection} />);
            }
        }
        return result;
    }

    renderOverlay = () => {
        return (
            <Overlay display={!!this.state.selectedDungeon} closeOverlayCallback={() => this.doDungeonSelection(null, null)} width={80} height={80}>
                <SelectHeroOverlay quest={this.state.selectedDungeon} callback={this.state.questCallback} doDungeonSelection={this.doDungeonSelection} />
            </Overlay>
        );
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
        partyMaxSize: 1,
        reward: {
            gold: 300,
            exp: 50,
            fame: 10
        },
        power: 10,
    },
    {
        id: '2',
        name: 'Creepy Crypt',
        imgUrl: 'img/haunted_windmill.png',
        duration: 75000,
        partyMaxSize: 2,
        reward: {
            gold: 600,
            exp: 80,
            fame: 20
        },
        power: 20,
    },
    {
        id: '3',
        name: 'Gassy Swamp',
        imgUrl: 'img/haunted_windmill.png',
        duration: 90000,
        partyMaxSize: 2,
        reward: {
            gold: 1000,
            exp: 200,
            fame: 30
        },
        power: 60,
    },
    {
        id: '4',
        name: 'Cursed Castle',
        imgUrl: 'img/haunted_windmill.png',
        duration: 120000,
        partyMaxSize: 4,
        reward: {
            gold: 2000,
            exp: 400,
            fame: 50
        },
        power: 135,
    },
    {
        id: '5',
        name: 'Dragon Cave',
        imgUrl: 'img/haunted_windmill.png',
        duration: 300000,
        partyMaxSize: 8,
        reward: {
            gold: 7500,
            exp: 800,
            fame: 100
        },
        power: 270,
    }
];