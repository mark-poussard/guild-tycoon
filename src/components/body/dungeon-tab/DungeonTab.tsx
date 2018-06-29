import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import GameModelStore from 'store/game-model/GameModelStore';
import DungeonBase from 'model/DungeonBase';
import { DungeonData } from 'data/DungeonData';
import DungeonInfo from './DungeonInfo';
import SerializableMap from 'model/serializable/SerializableMap';
import Dungeon from 'model/Dungeon';

interface IDungeonTabProps {

}

interface IDungeonTabState {
    dungeons: DungeonBase[];
    dungeonStates : SerializableMap<Dungeon>;
}

export default class DungeonTab extends React.Component<IDungeonTabProps, IDungeonTabState>{
    storeSubscribe: fbEmitter.EventSubscription;

    constructor(props: IDungeonTabProps) {
        super(props);
        this.state = { dungeons: this.computeAvailableDungeons(), dungeonStates : this.getDungeonStates() };
    }

    render() {
        const dungeonComponents: JSX.Element[] = [];
        for (const dungeon of this.state.dungeons) {
            let dungeonState;
            let dungeonStateMode;
            if(this.state.dungeonStates.hasOwnProperty(dungeon.id)){
                dungeonState = this.state.dungeonStates[dungeon.id];
                dungeonStateMode = dungeonState.mode;
            }
            dungeonComponents.push(<DungeonInfo key={`DUNGEON_${dungeon.id}_${dungeonStateMode}`} dungeon={dungeon} dungeonState={dungeonState} />);
        }
        return (
            <div>
                <h2>Dungeons</h2>
                {dungeonComponents}
            </div>
        );
    }

    componentDidMount() {
        this.storeSubscribe = GameModelStore.addListener(() => {
            this.setState({
                dungeons: this.computeAvailableDungeons(),
                dungeonStates: this.getDungeonStates(),
            });
        });
    }

    componentWillUnmount() {
        this.storeSubscribe.remove();
    }

    computeAvailableDungeons = () => {
        return DungeonData.filter(value => {
            for (const req of value.requireSwitches) {
                if (!GameModelStore.getState().gameSwitches[req]) {
                    return false;
                }
            }
            return true;
        })
    }

    getDungeonStates = () => {
        return Object.assign({}, GameModelStore.getState().dungeons);
    }
}