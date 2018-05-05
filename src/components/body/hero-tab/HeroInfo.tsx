import * as React from 'react';
import Hero from 'model/Hero';
import RankStar from 'components/generic/hero-info/RankStar';
import QuestInfo from 'components/body/hero-tab/QuestInfo';
import './HeroInfo.css';

interface IHeroInfoProps {
    hero: Hero;
}

interface IHeroInfoState {

}

export default class HeroInfo extends React.Component<IHeroInfoProps, IHeroInfoState>{
    constructor(props: IHeroInfoProps) {
        super(props);
    }

    render() {
        return (
            <div className="hero-info-container">
                <div className="divider">
                    <span className="txt name">{this.props.hero.name}</span>
                    <span className="txt lvl">{`lvl: ${this.props.hero.level}`}</span>
                    <div className="icon"><img src={this.props.hero.imgUrl} /></div>
                </div>
                <div className="divider">
                    <span className="rank">{RankStar.generateRank(this.props.hero)}</span>
                </div>
                <div className="divider">
                    <QuestInfo hero={this.props.hero} />
                </div>
            </div>
        );
    }
}