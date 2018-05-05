import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import Hero from 'model/Hero';
import HeroInfo from 'components/body/hero-tab/HeroInfo';
import GameModelStore from 'store/game-model/GameModelStore';
import HeroRecruitButton from 'components/body/hero-tab/HeroRecruitButton';
import IndexedArray from 'business/collection/IndexedArray';

interface IHeroTabProps {

}

interface IHeroTabState {
    heroes: IndexedArray<string,Hero>;
    isRoomLeft: boolean;
}

const hero1: Hero = {
    id:"1",
    name: 'Marcel',
    rank: 3,
    level: 65,
    imgUrl: 'img/squire.png',
    quest: null,
    autoQuest: false
}

export default class HeroTab extends React.Component<IHeroTabProps, IHeroTabState>{
    storeSubscribe: fbEmitter.EventSubscription;

    constructor(props: IHeroTabProps) {
        super(props);
        this.state = { heroes: GameModelStore.getState().heroes, isRoomLeft: this.computeIsRoomLeft() };
    }

    render() {
        return (
            <div>
                {this.renderHeroes()}
                {this.renderHeroRecruit()}
            </div>
        );
    }

    componentDidMount() {
        this.storeSubscribe = GameModelStore.addListener(() => {
            this.setState({
                heroes: GameModelStore.getState().heroes,
                isRoomLeft: this.computeIsRoomLeft()
            });
        });
    }

    componentWillUnmount() {
        this.storeSubscribe.remove();
    }

    computeIsRoomLeft = () => {
        return GameModelStore.getState().guildSize > GameModelStore.getState().heroes.size();
    }

    renderHeroes = () => {
        const result: JSX.Element[] = [];
        const heroesArray = this.state.heroes.asArray();
        for (let i = 0; i < heroesArray.length; i++) {
            result.push(<HeroInfo key={`HEROINFO_${i}`} hero={heroesArray[i]} />);
        }
        return result;
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