import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import Log from 'model/log/Log';
import LogStore from 'store/log/LogStore';
import LogInfo from 'components/body/log-tab/LogInfo';

interface ILogTabState {
    logArchives: Log[];
}

export default class LogTab extends React.Component<{}, ILogTabState> {
    logSubscription: fbEmitter.EventSubscription;

    constructor(props: {}) {
        super(props);
        this.state = { logArchives: LogStore.getState().logArchive.slice() };
    }

    render() {
        const logInfoComponents: JSX.Element[] = [];
        for (const log of this.state.logArchives) {
            logInfoComponents.push(<LogInfo key={`LOG_${log.id}`} log={log} />);
        }
        return (
            <div>
                {logInfoComponents}
            </div>
        );
    }

    componentDidMount() {
        this.logSubscription = LogStore.addListener(() => {
            this.setState({ logArchives: LogStore.getState().logArchive.slice() })
        });
    }

    componentWillUnmount() {
        this.logSubscription.remove();
    }
}