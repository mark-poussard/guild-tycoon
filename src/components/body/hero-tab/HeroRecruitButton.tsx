import * as React from 'react';
import './HeroRecruitButton.css';
import { TabType } from 'App';

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
            <div className="hero-recruit-button">
                <input type="image" src="img/add.png" onClick={this.goToRecruit}/>
            </div>
        );
    }

    goToRecruit = () => {
        AppInstance.navigateTo(TabType.RECRUIT);
    }
}