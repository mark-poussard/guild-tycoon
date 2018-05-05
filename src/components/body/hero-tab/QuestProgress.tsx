import * as React from 'react';
import * as FbEmitter from 'fbemitter';
import Quest from 'model/Quest';
import QuestStore from 'store/quest/QuestStore';
import './QuestProgress.css';

interface IQuestProgressProps {
    heroId: string;
}

interface IQuestProgressState {
    progress: number;
}

export default class QuestProgress extends React.Component<IQuestProgressProps, IQuestProgressState>{
    questProgressListener: FbEmitter.EventSubscription;
    intervalId: number;

    constructor(props: IQuestProgressProps) {
        super(props);
        this.state = { progress: QuestStore.getQuestProgress(this.props.heroId) };
    }

    render() {
        return (
            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${this.state.progress}%` }} />
            </div>
        );
    }

    componentDidMount() {
        this.questProgressListener = QuestStore.registerQuestProgressListener((progress: number, heroId: string) => {
            if (heroId == this.props.heroId) {
                this.setState({ progress: progress });
            }
        });
    }

    componentWillUnmount() {
        this.questProgressListener.remove();
    }
}