import * as React from 'react';
import './HeroRecruitButton.css';
import './HeroInfo.css'
import NavigationStore, { TabType } from 'store/navigation/NavigationStore';

interface IHeroRecruitButtonProps {

}

interface IHeroRecruitButtonState {

}

export default class HeroRecruitButton extends React.Component<IHeroRecruitButtonProps, IHeroRecruitButtonState>{
    constructor(props: IHeroRecruitButtonProps) {
        super(props);
    }

    render() {
        return (
            <div className="hero-info-container container">
                <input className="hero-recruit-button" type="image" src="img/add.png" onClick={this.goToRecruit} />
            </div>
        );
    }

    goToRecruit = () => {
        NavigationStore.navigateTo(TabType.CFH);
    }
}