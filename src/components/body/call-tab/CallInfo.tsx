import * as React from 'react';
import CallForHero from 'model/CallForHero';

interface ICallInfoProps {
    cfh: CallForHero;
}

export default class CallInfo extends React.Component<ICallInfoProps, {}>{
    constructor(props: ICallInfoProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <h2>{this.props.cfh.title}</h2>
            </div>
        );
    }
}