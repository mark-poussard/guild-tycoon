import * as React from 'react';
import QuestHelper from 'business/QuestHelper';

interface ITimerProps {
    until: Date;
    doEnd ?: () => void;
}

interface ITimerState {
    timeLeft: number;
}

export default class Timer extends React.Component<ITimerProps, ITimerState>{
    intervalId: number;

    constructor(props: ITimerProps) {
        super(props);
        this.state = { timeLeft: this.computeTimeLeft() }
        this.intervalId = null;
    }

    render() {
        return (
            <div>
                {this.renderTimeLeft()}
            </div>
        )
    }

    componentDidMount() {
        this.intervalId = window.setInterval(() => {
            let timeLeft = this.computeTimeLeft()
            if(timeLeft <= 0){
                window.clearInterval(this.intervalId);
                this.intervalId = null;
                timeLeft = 0;
                this.props.doEnd();
            }
            this.setState({ timeLeft: timeLeft })
        },
            500);
    }

    componentWillUnmount(){
        if(this.intervalId !== null){
            window.clearInterval(this.intervalId);
        }
    }

    computeTimeLeft = () => {
        return this.props.until.getTime() - new Date().getTime();
    }

    renderTimeLeft = () => {
        return QuestHelper.durationToString(this.state.timeLeft);
    }
}