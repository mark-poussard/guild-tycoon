import * as React from 'react';
import HeroTab from 'components/body/hero-tab/HeroTab';
import './Content.css';
import {TabType} from 'App';

interface IContentProps {
    currentTab : TabType;
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
        switch(this.props.currentTab){
            case TabType.HEROES:
                return <HeroTab />
            default :
            return null;
        }
    }
}