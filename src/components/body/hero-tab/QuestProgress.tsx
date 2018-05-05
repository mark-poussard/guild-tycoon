import * as React from 'react';
import Quest from 'model/Quest';
import './QuestProgress.css';

interface IQuestProgressProps {
    quest: Quest;
    questEnded: (quest: Quest) => void;
}

interface IQuestProgressState {
    progress: number;
    ended: boolean;
}

export default class QuestProgress extends React.Component<IQuestProgressProps, IQuestProgressState>{
    intervalId: number;

    constructor(props: IQuestProgressProps) {
        super(props);
        this.state = { progress: 0, ended: false };
    }

    render() {
        return (
            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${this.state.progress}%` }} />
            </div>
        );
    }

    componentDidUpdate(prevProps: IQuestProgressProps) {
        if (this.state.progress >= 100 && !this.state.ended) {
            this.props.questEnded(this.props.quest);
            this.setState({ ended: true });
        }
        if (prevProps.quest != this.props.quest) {
            this.setState({ progress: 0, ended: false });
        }
    }

    componentDidMount() {
        this.intervalId = window.setInterval(() => {
            this.computeProgress();
        }
            , 500);
    }

    componentWillUnmount() {
        if (this.intervalId != null) {
            clearInterval(this.intervalId);
        }
    }

    computeProgress = () => {
        if (!this.state.ended) {
            const currentDuration: number = new Date().getTime() - this.props.quest.startTime.getTime();
            let progress;
            if (this.props.quest.duration > 0) {
                progress = (currentDuration / this.props.quest.duration) * 100;
            }
            else {
                progress = 100;
            }
            this.setState({ progress: progress });
        }
    }
}