import * as React from 'react';
import Hero from 'model/Hero';
import Quest from 'model/Quest';
import './QuestButton.css';

interface IQuestButtonProps {
    startQuest: () => void;
}

interface IQuestButtonState {

}

export default class QuestButton extends React.Component<IQuestButtonProps, IQuestButtonState>{
    constructor(props: IQuestButtonProps) {
        super(props);
    }

    render() {
        return (
            <button className="start-quest-button" type="button" onClick={this.props.startQuest}>Quest</button>
        );
    }
}