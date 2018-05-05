import * as React from 'react';
import './GuildVisu.css'

interface IGuildVisuProps {

}

interface IGuildVisuState {

}

export default class GuildVisu extends React.Component<IGuildVisuProps, IGuildVisuState>{
    constructor(props: IGuildVisuProps) {
        super(props);
    }

    render() {
        return (
            <div className="guild-visualisation">
            </div>
        );
    }
}