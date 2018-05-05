import * as React from 'react';
import './HeroRecruitButton.css';

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
                <img src="img/add.png" />
            </div>
        );
    }
}