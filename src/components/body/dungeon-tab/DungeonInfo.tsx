import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import Dungeon, { DungeonHelper } from 'model/Dungeon';
import Quest from 'model/Quest';
import Resource, { ResourceType } from 'components/generic/resource/Resource';
import RankStar from 'components/generic/hero-info/RankStar';
import QuestStore from 'store/quest/QuestStore';
import './DungeonInfo.css'

interface IDungeonInfoProps {
    dungeon: Dungeon;
    doDungeonSelection: (dungeon: Dungeon, callback: Function) => void;
}

interface IDungeonInfoState {
    inProgress : boolean;
}

export default class DungeonInfo extends React.Component<IDungeonInfoProps, IDungeonInfoState>{
    questStoreListener : fbEmitter.EventSubscription;

    constructor(props: IDungeonInfoProps) {
        super(props);
        this.state = {inProgress : false};
    }

    render() {
        //<div className="dungeon-illustration" style={{background: `url(${this.props.dungeon.imgUrl})`}} />
        const durationStr = DungeonHelper.durationToString(this.props.dungeon);
        return (
            <div className="dungeon-container">
                <div>
                    <h3>{this.props.dungeon.name}</h3>
                </div>
                <div>
                    <span>
                        {`Recommended : `}
                        {RankStar.generateRank(this.props.dungeon.recRank)}
                        {` lvl. ${this.props.dungeon.recLvl}`}
                    </span>
                </div>
                <div>
                    <span>{`Party size : ${this.props.dungeon.partySize}`}</span>
                </div>
                <div>
                    <Resource type={ResourceType.GOLD} value={this.props.dungeon.reward.gold} modifier />
                    <Resource type={ResourceType.EXP} value={this.props.dungeon.reward.exp} modifier />
                    <Resource type={ResourceType.FAME} value={this.props.dungeon.reward.fame} modifier />
                    <Resource type={ResourceType.TIME} value={durationStr} />
                </div>
                {this.renderDungeonButton()}
            </div>
        );
    }

    dungeonSelection = () => {
        this.props.doDungeonSelection(this.props.dungeon, this.questCallback);
    }

    renderDungeonButton = () => {
        if (this.state.inProgress) {
            return (<button disabled={true}>Dungeon in progress</button>);
        }
        else {
            return (
                <button onClick={this.dungeonSelection}>Challenge</button>
            );
        }
    }

    questCallback = (heroes : Set<string>) => {
        this.setState({inProgress : true});
        this.questStoreListener = QuestStore.registerQuestEndedListener((heroId : string) => {
            if(heroes.has(heroId)){
                this.setState({inProgress : false});
                this.questStoreListener.remove()
                this.questStoreListener = null;
            }
        });
    }

    componentWillUnmount(){
        if(this.questStoreListener){
            this.questStoreListener.remove();
        }
    }
}