import * as React from 'react';
import './ProgressBar.css';

interface IProgressBarProps {
    className?: string;
    style?: React.CSSProperties;
    progress: number;
}

export const ProgressBar = (props: IProgressBarProps) => {
    return (
        <div className={`progress-bar-container ${props.className}`} style={props.style}>
            <div className="progress-bar" style={{ width: `${props.progress}%` }} />
        </div>
    );
}