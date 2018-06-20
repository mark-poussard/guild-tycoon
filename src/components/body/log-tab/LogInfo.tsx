import * as React from 'react';
import Log from 'model/log/Log';
import './LogInfo.css'

interface ILogInfoProps {
    log: Log;
}

export default class LogInfo extends React.Component<ILogInfoProps>{
    render() {
        return (
            <div className='container'>
                <span>{` ${this.props.log.msg}`}</span>
                <span className='log-info-date'>{` ${new Date(this.props.log.producedAt)}`}</span>
            </div>
        );
    }
}