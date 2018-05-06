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
                <MenuButton txt="Recruit" onClick={this.onMenuClick(TabType.RECRUIT)} />
                <MenuButton txt="Dungeon" onClick={this.onMenuClick(TabType.DUNGEON)} />
            </div>
        );
    }

    onMenuClick = (tab: TabType) => {
        return () => {
            NavigationHandler.navigateTo(tab);
        }
    }
}