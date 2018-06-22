import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import GameModelStore from 'store/game-model/GameModelStore';
import DungeonBase from 'model/DungeonBase';
import { DungeonData } from 'data/DungeonData';
import DungeonInfo from './DungeonInfo';

interface IDungeonTabProps {

}

interface IDungeonTabState {
    dungeons: DungeonBase[];
}

export default class DungeonTab extends React.Component<IDungeonTabProps, IDungeonTabState>{
    storeSubscribe: fbEmitter.EventSubscription;

    constructor(props: IDungeonTabProps) {
        super(props);
        this.state = { dungeons: this.computeActiveDungeons() };
    }

    render() {
        const dungeonComponents: JSX.Element[] = [];
        for (const dungeon of this.state.dungeons) {
            dungeonComponents.push(<DungeonInfo key={`DUNGEON_${dungeon.id}`} dungeon={dungeon} />);
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
                dungeons: this.computeActiveDungeons()
            });
        });
    }

    componentWillUnmount() {
        this.storeSubscribe.remove();
    }

    computeActiveDungeons = () => {
        return DungeonData.filter(value => {
            for (const req of value.requireSwitches) {
                if (!GameModelStore.getState().gameSwitches[req]) {
                    return false;
                }
            }
            return true;
        })
    }
}