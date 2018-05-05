import * as React from 'react';
import Hero from 'model/Hero';
import HeroInfo from 'components/body/hero-tab/HeroInfo';
import GameModelStore from 'store/game-model/GameModelStore';
import HeroRecruitButton from 'components/body/hero-tab/HeroRecruitButton';

interface IHeroTabProps {

}

interface IHeroTabState {
    heroes: Hero[];
    isRoomLeft: boolean;
}

const hero1: Hero = {
    name: 'Marcel',
    rank: 3,
    level: 65,
    imgUrl: 'img/squire.png',
    quest: null,
    autoQuest: false
}

export default class HeroTab extends React.Component<IHeroTabProps, IHeroTabState>{
    constructor(props: IHeroTabProps) {
        super(props);
        this.state = { heroes: GameModelStore.getState().heroes, isRoomLeft: this.computeIsRoomLeft() };
    }

    render() {
        return (
            <div>
                <HeroInfo hero={hero1} />
                {this.renderHeroes()}
                {this.renderHeroRecruit()}
            </div>
        );
    }

    componentDidMount() {
        GameModelStore.addListener(() => {
            this.setState({
                heroes: GameModelStore.getState().heroes,
                isRoomLeft: this.computeIsRoomLeft()
            });
        });
    }

    computeIsRoomLeft = () => {
        return GameModelStore.getState().guildSize > GameModelStore.getState().heroes.length;
    }

    renderHeroes = () => {
        const result: JSX.Element[] = [];
        for (let i = 0; i < this.state.heroes.length; i++) {
            result.push(<HeroInfo key={`HEROINFO_${i}`} hero={this.state.heroes[i]} />);
        }
    }

    renderHeroRecruit = () => {
        if (this.state.isRoomLeft) {
            return (
                <HeroRecruitButton />
            );
        }
        return null;
    }
}