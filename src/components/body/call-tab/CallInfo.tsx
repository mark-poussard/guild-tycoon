import * as React from 'react';
import CallForHero from 'model/CallForHero';
import CFHHelper from 'business/CFHHelper';

interface ICallInfoProps {
    cfh: CallForHero;
}

export default class CallInfo extends React.Component<ICallInfoProps, {}>{
    constructor(props: ICallInfoProps) {
        super(props);
    }

    render() {
        return (
            <div className='container'>
                <h2>{this.props.cfh.title}</h2>
                <p>{this.props.cfh.description}</p>
                <button onClick={this.doCall}>Call</button>
            </div>
        );
    }

    doCall = () => {
        CFHHelper.doCFH(this.props.cfh);
    }
}