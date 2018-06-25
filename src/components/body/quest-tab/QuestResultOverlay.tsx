import * as React from 'react';
import EndQuestResult from 'business/EndQuestResult';
import Overlay from 'components/generic/Overlay';
import Resource, { ResourceType } from 'components/generic/resource/Resource';
import QuestDrop from 'model/QuestDrop';
import ItemInfo from 'components/body/items-tab/ItemInfo';
import BaseQuest from 'model/BaseQuest';
import { QuestDataArray } from 'data/QuestData';

interface IQuestResultOverlayProps{
    questResult: EndQuestResult
    questData ?: BaseQuest;
    closeOverlay : () => void;
}

export default class QuestResultOverlay extends React.Component<IQuestResultOverlayProps>{
    render(){
        const quest = this.props.questResult;
        if(quest){
            return (
                <Overlay display={!!quest} closeOverlayCallback={this.props.closeOverlay} width={30} height={50}>
                    {quest.result &&
                        this.renderQuestWin(quest)}
                    {!quest.result &&
                        this.renderQuestLose(quest)}
                    <button className="input-center" onClick={this.props.closeOverlay}>Acknowledge</button>
                </Overlay>
            );
        }
        return null;
    }

    renderQuestWin = (questResult: EndQuestResult) => {
        const quest = questResult.quest;
        const questData = this.props.questData || QuestDataArray.get(quest.id);
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
            result.push(<ItemInfo key={`ITEM_${i++}`} inline item={drop.item} quantity={drop.quantity} />)
        }
        return result;
    }

    renderQuestLose = (questResult: EndQuestResult) => {
        const quest = questResult.quest;
        const questData = this.props.questData || QuestDataArray.get(quest.id);
        return (
            <div>
                <h3>{questData.title}</h3>
                <h2>LOSE !</h2>
            </div>
        );
    }
}