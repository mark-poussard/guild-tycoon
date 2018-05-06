import * as React from 'react';
import Dungeon, { DungeonHelper } from 'model/Dungeon';
import Resource, { ResourceType } from 'components/generic/resource/Resource';
import './DungeonInfo.css'

interface IDungeonInfoProps {
    dungeon: Dungeon;
    doDungeonSelection: (dungeon: Dungeon) => void;
}

interface IDungeonInfoState {

}

export default class DungeonInfo extends React.Component<IDungeonInfoProps, IDungeonInfoState>{
    constructor(props: IDungeonInfoProps) {
        super(props);
    }

    render() {
        //<div className="dungeon-illustration" style={{background: `url(${this.props.dungeon.imgUrl})`}} />
        const durationStr = DungeonHelper.durationToString(this.props.dungeon);
        return (
            <div className="dungeon-container">
                <div>
                    <span>{this.props.dungeon.name}</span>
                </div>
                <div>
                    <span>{`Recommended : rank ${this.props.dungeon.recRank} lvl. ${this.props.dungeon.recLvl}`}</span>
                </div>
                <div>
                    <Resource type={ResourceType.GOLD} value={this.props.dungeon.reward.gold} modifier />
                    <Resource type={ResourceType.EXP} value={this.props.dungeon.reward.exp} modifier />
                    <Resource type={ResourceType.FAME} value={this.props.dungeon.reward.fame} modifier />
                    <Resource type={ResourceType.TIME} value={durationStr} />
                </div>
                <button onClick={this.dungeonSelection}>Challenge</button>
            </div>
        );
    }

    dungeonSelection = () => {
        this.props.doDungeonSelection(this.props.dungeon);
    }
}