import * as React from 'react';
import Quest from 'model/Quest';
import { QuestDataArray } from 'data/QuestData';
import BaseQuest from 'model/BaseQuest';
import { ProgressBar } from 'components/generic/quest/ProgressBar';
import ToolTip, { ToolTipPosition } from '../ToolTip';
import Timer from '../Timer';

interface IQuestProgressBarProps {
    quest: Quest;
    doQuestOver: () => void;
}

interface IQuestProgressBarState {
    progress: number;
}

export default class QuestProgressBar extends React.Component<IQuestProgressBarProps, IQuestProgressBarState>{
    questData: BaseQuest;
    intervalId: number;

    constructor(props: IQuestProgressBarProps) {
        super(props);
        this.questData = QuestDataArray.get(this.props.quest.id);
        this.state = { progress: this.computeProgress(this.props.quest) };
        this.intervalId = null;
    }

    componentDidMount() {
        this.intervalId = window.setInterval(() => {
            let progress = this.computeProgress(this.props.quest);
            if (progress >= 100) {
                window.clearInterval(this.intervalId);
                this.intervalId = null;
                this.props.doQuestOver();
                progress = 100;
            }
            this.setState({ progress: progress });
        },
            200);
    }

    componentWillUnmount() {
        if (this.intervalId !== null) {
            window.clearInterval(this.intervalId);
        }
    }

    render() {
        return (
            <ToolTip toolTipContent={<Timer until={new Date(this.props.quest.startedAt + this.questData.duration.toMs())} />} position={ToolTipPosition.TOP}>
                <ProgressBar progress={this.state.progress} />
            </ToolTip>
        )
    }

    computeProgress = (quest: Quest) => {
        if (quest.startedAt != null) {
            const t = new Date().getTime() - quest.startedAt;
            const duration = this.questData.duration.toMs();
            return Math.min(t / duration * 100, 100);
        }
        return 0;
    }
}