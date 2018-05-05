import * as React from 'react';
import MenuButton from 'components/menu/MenuButton';
import './Menu.css';
import HeroTab from 'components/body/hero-tab/HeroTab';
import { TabType } from 'App';

interface IMenuProps {
    onTabChange: (tab: TabType) => void;
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
            </div>
        );
    }

    onMenuClick = (tab: TabType) => {
        return () => {
            this.props.onTabChange(tab);
        }
    }
}