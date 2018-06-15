import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import { QuestDataArray } from 'data/QuestData';
import Quest from 'model/Quest';
import QuestInfo from 'components/body/quest-tab/QuestInfo';
import GameModelStore from 'store/game-model/GameModelStore';
import Overlay from 'components/generic/Overlay';
import Resource, { ResourceType } from 'components/generic/resource/Resource';
import QuestHelper from 'business/QuestHelper';
import Hero from 'model/Hero';
import SelectHeroOverlay from 'components/generic/select-hero-overlay/SelectHeroOverlay';
import QuestDrop from 'model/QuestDrop';
import EndQuestResult from 'business/EndQuestResult';
import ItemInfo from 'components/body/items-tab/ItemInfo';
import ObjectUtils from 'business/utils/ObjectUtils';

interface IQuestTabState {
    quests: Quest[];
    questResult: EndQuestResult;
    questSelect: Quest;
}

export default class QuestTab extends React.Component<{}, IQuestTabState>{
    gameStoreListener: fbEmitter.EventSubscription;

    constructor(props: {}) {
        super(props);
        this.state = {
            quests: ObjectUtils.getValues(GameModelStore.getState().quests),
            questResult: null,
            questSelect: null
        };
    }

    render() {
        return (
            <div>
                <h2>Available guild quests</h2>
                {this.renderQuests()}
                {this.renderQuestEndOverlay()}
                {this.renderQuestStartOverlay()}
            </div>
        );
    }

    componentWillMount() {
        this.gameStoreListener = GameModelStore.addListener(() => {
            this.setState({
                quests: ObjectUtils.getValues(GameModelStore.getState().quests)
            });
        });
    }

    componentWillUnmount() {
        if (this.gameStoreListener) {
            this.gameStoreListener.remove();
        }
    }

    renderQuests = () => {
        const result: JSX.Element[] = [];
        for (let quest of this.state.quests) {
            if (this.shouldRenderQuest(quest)) {
                result.push(<QuestInfo key={`QUEST_${quest.id}`} quest={quest} doEndQuest={this.endQuest} doSelectQuest={this.doSelectQuest} />);
            }
        }
        return result;
    }

    shouldRenderQuest = (quest: Quest) => {
        const questData = QuestDataArray.get(quest.id);
        return quest.completedAt == null || questData.repeat != null;
    }

    renderQuestEndOverlay = () => {
        const quest = this.state.questResult;
        if (quest) {
            return (
                <Overlay display={!!quest} closeOverlayCallback={() => this.setState({ questResult: null })} width={30} height={50}>
                    {this.state.questResult.result &&
                        this.renderQuestWin(quest)}
                    {!this.state.questResult.result &&
                        this.renderQuestLose(quest)}
                    <button className="input-center" onClick={() => this.setState({ questResult: null })}>Acknowledge</button>
                </Overlay>
            );
        }
        return null;
    }

    renderQuestStartOverlay = () => {
        if (this.state.questSelect) {
            const questData = QuestDataArray.get(this.state.questSelect.id);
            return (
                <SelectHeroOverlay
                    display={!!this.state.questSelect}
                    maxSelection={questData.maxPartySize}
                    doCancelSelection={() => this.setState({ questSelect: null })}
                    doConfirmSelection={(heroes: Hero[]) => this.startQuest(this.state.questSelect, heroes)}>
                    <h3>{questData.title}</h3>
                    <h2>Select heroes to go on this quest.</h2>
                </SelectHeroOverlay>
            );
        }
        return null;
    }

    renderQuestWin = (questResult: EndQuestResult) => {
        const quest = questResult.quest;
        const questData = QuestDataArray.get(quest.id);
        return (
            <div>
                <h3>{questData.title}</h3>
                <h2>WIN !</h2>
                <Resource type={ResourceType.GOLD} value={questData.reward.gold} modifier />
                <Resource type={ResourceType.EXP} value={questData.reward.exp} modifier />
                <div>
                    {this.renderDropInfo(questResult.drops)}
                </div>
            </div>
        );
    }

    renderDropInfo = (drops: QuestDrop[]) => {
        const result: JSX.Element[] = [];
        let i = 0;
        for (let drop of drops) {
            result.push(<ItemInfo key={`ITEM_${i++}`} item={drop.item} quantity={drop.quantity} />)
        }
        return result;
    }

    renderQuestLose = (questResult: EndQuestResult) => {
        const quest = questResult.quest;
        const questData = QuestDataArray.get(quest.id);
        return (
            <div>
                <h3>{questData.title}</h3>
                <h2>LOSE !</h2>
            </div>
        );
    }

    endQuest = (quest: Quest) => {
        const questResult = QuestHelper.endQuest(quest);
        this.setState({ questResult: questResult });
    }

    startQuest = (quest: Quest, heroes: Hero[]) => {
        QuestHelper.startQuest(quest, heroes);
        this.setState({ questSelect: null });
    }

    doSelectQuest = (quest: Quest) => {
        this.setState({ questSelect: quest });
    }
}