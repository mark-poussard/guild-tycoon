import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import MenuButton from 'components/menu/MenuButton';
import './Menu.css';
import HeroTab from 'components/body/hero-tab/HeroTab';
import NavigationHandler, { TabType } from 'store/navigation/NavigationStore';
import GameModelStore from 'store/game-model/GameModelStore';
import GameSwitches from 'model/GameSwitches';
import LogStore from 'store/log/LogStore';

interface IMenuProps {

}

interface IMenuState {
    gameSwitches: GameSwitches;
    hasLogs: boolean;
}

export default class Menu extends React.Component<IMenuProps, IMenuState>{
    storeSubscribe: fbEmitter.EventSubscription;
    logSubscribe: fbEmitter.EventSubscription;

    constructor(props: {}) {
        super(props);
        this.state = {
            gameSwitches: Object.assign({}, GameModelStore.getState().gameSwitches),
            hasLogs: LogStore.getState().logArchive.length > 0
        };
    }

    componentDidMount() {
        this.storeSubscribe = GameModelStore.addListener(() => {
            this.setState({
                gameSwitches: Object.assign({}, GameModelStore.getState().gameSwitches)
            });
        });
        this.logSubscribe = LogStore.addListener(() => {
            this.setState({
                hasLogs: LogStore.getState().logArchive.length > 0
            });
        });
    }

    componentWillUnmount() {
        this.storeSubscribe.remove();
        this.logSubscribe.remove();
    }

    render() {
        const menuContent: JSX.Element[] = [];

        menuContent.push(<MenuButton key='HEROES_BUTTON' txt="Heroes" onClick={this.onMenuClick(TabType.HEROES)} />);
        menuContent.push(<MenuButton key='CFH_BUTTON' txt="Call For Heroes" onClick={this.onMenuClick(TabType.CFH)} />);
        if (this.state.gameSwitches.firstHero) {
            menuContent.push(<MenuButton key='QUESTS_BUTTON' txt="Quests" onClick={this.onMenuClick(TabType.QUESTS)} />);
        }
        if (this.state.gameSwitches.QUEST01) {
            menuContent.push(<MenuButton key='ITEMS_BUTTON' txt="Items" onClick={this.onMenuClick(TabType.ITEMS)} />);
        }
        if (this.state.gameSwitches.QUEST08) {
            menuContent.push(<MenuButton key='IMPROVEMENTS_BUTTON' txt="Improvements" onClick={this.onMenuClick(TabType.IMPROVEMENTS)} />);
        }
        if (this.state.hasLogs) {
            menuContent.push(<MenuButton key='LOG_BUTTON' txt="Logs" onClick={this.onMenuClick(TabType.LOG)} />);
        }
        return (
            <div className="menu-container">
                {menuContent}
            </div>
        );
    }

    onMenuClick = (tab: TabType) => {
        return () => {
            NavigationHandler.navigateTo(tab);
        }
    }
}