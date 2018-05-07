import * as React from 'react';
import Hero from 'model/Hero';
import Quest from 'model/Quest';
import QuestStore from 'store/quest/QuestStore';
import './QuestButton.css';
import QuestGenerator from 'store/quest/QuestGenerator';

interface IQuestButtonProps {
    heroId: string;
    doSetQuestId : (questId : string) => void;
}

interface IQuestButtonState {

}

export default class QuestButton extends React.Component<IQuestButtonProps, IQuestButtonState>{
    questGenerator: QuestGenerator;

    constructor(props: IQuestButtonProps) {
        super(props);
        this.questGenerator = new QuestGenerator();
    }

    render() {
        return (
            <button className="start-quest-button" type="button" onClick={this.startQuest}>Quest</button>
        );
    }

    startQuest = () => {
        const questId = QuestStore.startQuest([this.props.heroId], this.questGenerator.generateAutoQuest(this.props.heroId));
        this.props.doSetQuestId(questId);
    };
}