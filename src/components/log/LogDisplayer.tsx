import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import LogStore from 'store/log/LogStore';
import Log from 'model/log/Log';
import LogDispatcher from 'store/log/LogDispatcher';
import { LogActionTypes } from 'store/log/LogActionTypes';
import LogMessage from 'components/log/LogMessage';

const LOG_TIMEOUT = 3000;

interface ILogDisplayerState{
    logQueue : Log[];
}

export default class LogDisplayer extends React.Component<{}, ILogDisplayerState>{
    logSubscription : fbEmitter.EventSubscription;
    logInterval : number;

    constructor(props : {}){
        super(props);
        this.state = {logQueue : LogStore.getState().logQueue.slice()};
    }

    componentDidMount() {
        this.logSubscription = LogStore.addListener(() => {
            this.setState({logQueue : LogStore.getState().logQueue.slice()})
        });
        this.logInterval = window.setInterval(() => {
            const logsToClear : Log[] = [];
            for(const log of this.state.logQueue){
                if(new Date().getTime() >= log.producedAt.getTime() + LOG_TIMEOUT){
                    logsToClear.push(log);
                }
            }
            if(logsToClear.length > 0){
                LogDispatcher.dispatch({
                    type : LogActionTypes.REMOVE_LOG,
                    payload : {
                        logsToClear
                    }
                });
            }
        }, 300);
    }

    componentWillUnmount() {
        this.logSubscription.remove();
        window.clearInterval(this.logInterval);
    }

    render(){
        const logMessages : JSX.Element[] = [];
        for(const log of this.state.logQueue){
            logMessages.push(<LogMessage key={`LOG_${log.id}`} msg={log.msg} />)
        }
        return (
            <div style={{position:'absolute', top:'0px', bottom:'0px', right:'0px', left:'0px'}}>
                <div style={{position:'absolute', bottom:'10px', right:'10px'}}>
                    {logMessages}
                </div>
            </div>
        );
    }
}