import * as React from 'react';
import * as FbEmitter from 'fbemitter';
import Quest from 'model/Quest';
import QuestStore from 'store/quest/QuestStore';
import QuestWrapper from 'model/QuestWrapper';
import {ProgressBar} from './ProgressBar';

interface IQuestProgressContainerProps {
    questId: string;
}

interface IQuestProgressContainerState {
    progress: number;
}

export default class QuestProgressContainer extends React.Component<IQuestProgressContainerProps, IQuestProgressContainerState>{
    questProgressListener: FbEmitter.EventSubscription;
    intervalId: number;

    constructor(props: IQuestProgressContainerProps) {
        super(props);
        this.state = { progress: QuestStore.getQuestProgress(this.props.questId) };
    }

    render() {
        return (
            <ProgressBar progress={this.state.progress}/>
        );
    }

    componentDidMount() {
        this.questProgressListener = QuestStore.registerQuestProgressListener((progress: number, quest: QuestWrapper) => {
            if (quest.id == this.props.questId) {
                this.setState({ progress: progress });
            }
        });
    }

    componentWillUnmount() {
        this.questProgressListener.remove();
    }
}