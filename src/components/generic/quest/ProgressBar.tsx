import * as React from 'react';
import './ProgressBar.css';

interface IProgressBarProps{
    progress : number;
}

export const ProgressBar= (props :IProgressBarProps) => {
    return (
        <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${this.state.progress}%` }} />
        </div>
    );
}