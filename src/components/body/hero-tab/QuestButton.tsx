import * as React from 'react';
import Hero from 'model/Hero';
import Quest from 'model/Quest';
import QuestStore from 'store/quest/QuestStore';
import './QuestButton.css';

interface IQuestButtonProps {
    heroId: string;
}

interface IQuestButtonState {

}

export default class QuestButton extends React.Component<IQuestButtonProps, IQuestButtonState>{
    constructor(props: IQuestButtonProps) {
        super(props);
    }

    render() {
        return (
            <button className="start-quest-button" type="button" onClick={this.startQuest}>Quest</button>
        );
    }

    startQuest = () => {
        QuestStore.startQuest(this.props.heroId);
    };
}