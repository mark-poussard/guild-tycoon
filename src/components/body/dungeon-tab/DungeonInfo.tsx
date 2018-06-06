import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import Dungeon, { DungeonHelper } from 'model/Dungeon';
import Quest from 'model/Quest';
import Resource, { ResourceType } from 'components/generic/resource/Resource';
import RankStar from 'components/generic/hero-info/RankStar';
import QuestStore from 'store/quest/QuestStore';
import './DungeonInfo.css'
import QuestWrapper from 'model/QuestWrapper';
import QuestProgressContainer from 'components/generic/quest/QuestProgressContainer';
import GameModelStore from 'store/game-model/GameModelStore';

interface IDungeonInfoProps {
    dungeon: Dungeon;
    doDungeonSelection: (dungeon: Dungeon, callback: Function) => void;
}

interface IDungeonInfoState {
    quest: QuestWrapper;
    guildMemberCount: number;
}

export default class DungeonInfo extends React.Component<IDungeonInfoProps, IDungeonInfoState>{
    questStoreListener: fbEmitter.EventSubscription;
    gameStoreListener: fbEmitter.EventSubscription;

    constructor(props: IDungeonInfoProps) {
        super(props);
        this.state = {
            quest: QuestStore.getDungeonQuest(this.props.dungeon.id),
            guildMemberCount: GameModelStore.getState().heroes.size()
        };
    }

    render() {
        //<div className="dungeon-illustration" style={{background: `url(${this.props.dungeon.imgUrl})`}} />
        const durationStr = DungeonHelper.durationToString(this.props.dungeon);
        return (
            <div className="container dungeon-container">
                <div>
                    <h3>{this.props.dungeon.name}</h3>
                </div>
                <div>
                    <span>
                        {`Recommended : `}
                        {RankStar.generateRank(this.getRecommendedRank())}
                        {` lvl. ${this.getRecommendedLevel()}`}
                    </span>
                </div>
                <div>
                    <span>{`Max. party size : ${this.props.dungeon.partyMaxSize}`}</span>
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

    getRecommendedRank = () => {
        return DungeonHelper.getRecommendedRank(this.props.dungeon.power);
    }

    getRecommendedLevel = () => {
        return DungeonHelper.getRecommendedLevel(this.props.dungeon.power);
    }

    dungeonSelection = () => {
        this.props.doDungeonSelection(this.props.dungeon, this.questCallback);
    }

    renderDungeonButton = () => {
        if (this.state.quest) {
            return (
                <QuestProgressContainer questId={this.state.quest.id} />
            );
        }
        /*else if (this.state.guildMemberCount < this.props.dungeon.partyMaxSize) {
            return (
                <button disabled={true}>Not enough guild members</button>
            );
        }*/
        else {
            return (
                <button onClick={this.dungeonSelection}>Challenge</button>
            );
        }
    }

    questCallback = (questId: string) => {
        const quest = QuestStore.questsMap.get(questId);
        this.setState({ quest: quest });
    }

    componentWillMount() {
        this.questStoreListener = QuestStore.registerQuestEndedListener((quest: QuestWrapper) => {
            if (this.state.quest && this.state.quest.id == quest.id) {
                this.setState({ quest: null });
            }
        });
        this.gameStoreListener = GameModelStore.addListener(() => {
            this.setState({ guildMemberCount: GameModelStore.getState().heroes.size() });
        });
    }

    componentWillUnmount() {
        if (this.questStoreListener) {
            this.questStoreListener.remove();
        }
        if (this.gameStoreListener) {
            this.gameStoreListener.remove();
        }
    }
}