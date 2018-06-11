import * as React from 'react';
import HeroTab from 'components/body/hero-tab/HeroTab';
import RecruitmentTab from 'components/body/recruitment-tab/RecruitmentTab';
import DungeonTab from 'components/body/dungeon-tab/DungeonTab';
import ImprovementsTab from 'components/body/improvements-tab/ImprovementsTab';
import './Content.css';
import { TabType } from 'store/navigation/NavigationStore';
import CallTab from 'components/body/call-tab/CallTab';
import QuestTab from 'components/body/quest-tab/QuestTab';
import ItemsTab from 'components/body/items-tab/ItemsTab';

interface IContentProps {
    currentTab: TabType;
}

interface IContentState {
}

export default class Content extends React.Component<IContentProps, IContentState>{
    constructor(props: IContentProps) {
        super(props);
    }

    render() {
        return (
            <div className="main-content">
                {this.tabSwitch()}
            </div>
        );
    }

    tabSwitch = () => {
        switch (this.props.currentTab) {
            case TabType.HEROES:
                return <HeroTab />
            case TabType.CFH:
                return <CallTab />
            case TabType.QUESTS:
                return <QuestTab />
            case TabType.IMPROVEMENTS:
                return <ImprovementsTab />
            case TabType.ITEMS:
                return <ItemsTab />
            case TabType.RECRUIT:
                return <RecruitmentTab />
            case TabType.DUNGEON:
                return <DungeonTab />
            default:
                return null;
        }
    }
}