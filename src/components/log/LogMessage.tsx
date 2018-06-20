import * as React from 'react';

interface ILogMessageProps{
    msg : string;
}

export default class LogMessage extends React.Component<ILogMessageProps>{
    render(){
        return (
            <div className='container'>
                {this.props.msg}
            </div>
        );
    }
}