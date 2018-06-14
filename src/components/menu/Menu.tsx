import * as React from 'react';
import MenuButton from 'components/menu/MenuButton';
import './Menu.css';
import HeroTab from 'components/body/hero-tab/HeroTab';
import NavigationHandler, { TabType } from 'store/navigation/NavigationStore';

interface IMenuProps {
}

interface IMenuState {

}

export default class Menu extends React.Component<IMenuProps, IMenuState>{
    constructor(props: IMenuProps) {
        super(props);
    }

    render() {
        return (
            <div className="menu-container">
                <MenuButton txt="Heroes" onClick={this.onMenuClick(TabType.HEROES)} />
                <MenuButton txt="Call For Heroes" onClick={this.onMenuClick(TabType.CFH)} />
                <MenuButton txt="Quests" onClick={this.onMenuClick(TabType.QUESTS)} />
                <MenuButton txt="Improvements" onClick={this.onMenuClick(TabType.IMPROVEMENTS)} />
                <MenuButton txt="Items" onClick={this.onMenuClick(TabType.ITEMS)} />
            </div>
        );
    }

    onMenuClick = (tab: TabType) => {
        return () => {
            NavigationHandler.navigateTo(tab);
        }
    }
}