import * as React from 'react';
import Quest from 'model/Quest';
import Resource, { ResourceType } from 'components/generic/resource/Resource';
import Overlay from 'components/generic/Overlay';

interface IQuestInfoProps {
    quest: Quest;
}

export default class QuestInfo extends React.Component<IQuestInfoProps, {}>{
    constructor(props: IQuestInfoProps) {
        super(props);
    }

    render() {
        const quest = this.props.quest;
        return (
            <div>
                <h3>{quest.title}</h3>
                <p>{quest.description}</p>
                <Resource type={ResourceType.GOLD} value={quest.reward.gold} modifier />
                <Resource type={ResourceType.EXP} value={quest.reward.exp} modifier />
                <Resource type={ResourceType.TIME} value={quest.duration.toString()} />
            </div>
        );
    }

    renderQuestAction = () => {
        if (!this.props.quest.startedAt) {
            return (
                <button>Start</button>
            );
        }
    }
}