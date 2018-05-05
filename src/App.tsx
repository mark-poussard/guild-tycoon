import * as React from 'react';
import Header from 'components/header/Header';
import GuildVisu from 'components/guild-visu/GuildVisu';
import Menu from 'components/menu/Menu';
import Content from 'components/body/Content';

export enum TabType {
    HEROES = 'heroes'
}

interface IAppState {
    tabType: TabType;
}

export default class App extends React.Component<{}, IAppState>{
    constructor(props: {}) {
        super(props);
        this.state = { tabType: TabType.HEROES };
    }

    render() {
        return (
            <div>
                <Header />
                <GuildVisu />
                <Menu onTabChange={this.onTabChange} />
                <Content currentTab={this.state.tabType} />
            </div>
        );
    }

    onTabChange = (newTab: TabType) => {
        this.setState({ tabType: newTab });
    }
}