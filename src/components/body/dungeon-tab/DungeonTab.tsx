import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import GameModelStore from 'store/game-model/GameModelStore';
import DungeonBase from 'model/DungeonBase';
import { DungeonData } from 'data/DungeonData';
import DungeonInfo from './DungeonInfo';
import SerializableMap from 'model/serializable/SerializableMap';
import Dungeon from 'model/Dungeon';
import Quest from 'model/Quest';
import BaseQuest from 'model/BaseQuest';
import DungeonHelper from 'business/DungeonHelper';
import QuestHelper from 'business/QuestHelper';
import EndQuestResult from 'business/EndQuestResult';
import QuestResultOverlay from 'components/body/quest-tab/QuestResultOverlay';

interface IDungeonTabProps {

}

interface IDungeonTabState {
    dungeons: DungeonBase[];
    dungeonStates : SerializableMap<Dungeon>;
    questResult: EndQuestResult;
    questResultData : BaseQuest;
}

export default class DungeonTab extends React.Component<IDungeonTabProps, IDungeonTabState>{
    storeSubscribe: fbEmitter.EventSubscription;

    constructor(props: IDungeonTabProps) {
        super(props);
        this.state = { dungeons: this.computeAvailableDungeons(), dungeonStates : this.getDungeonStates(), questResult : null, questResultData : null };
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
            dungeonComponents.push(<DungeonInfo key={`DUNGEON_${dungeon.id}_${dungeonStateMode}`} dungeon={dungeon} dungeonState={dungeonState} doEndQuest={this.endQuest} />);
        }
        return (
            <div>
                <h2>Dungeons</h2>
                {dungeonComponents}
                <QuestResultOverlay questResult={this.state.questResult} questData={this.state.questResultData} closeOverlay={() => this.setState({ questResult: null, questResultData : null })} />
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

    endQuest = (quest: Quest, questData: BaseQuest) => {
        DungeonHelper.endDungeon(quest);
        this.setState({ questResult: QuestHelper.endQuest(quest, questData), questResultData: questData });
    }
}