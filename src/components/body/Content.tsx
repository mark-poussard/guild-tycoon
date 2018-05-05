import * as React from 'react';
import HeroTab from 'components/body/hero-tab/HeroTab';
import RecruitmentTab from 'components/body/recruitment-tab/RecruitmentTab';
import './Content.css';
import { TabType } from 'store/navigation/NavigationStore';

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
            case TabType.RECRUIT:
                return <RecruitmentTab />
            default:
                return null;
        }
    }
}