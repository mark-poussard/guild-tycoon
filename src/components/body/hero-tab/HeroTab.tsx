import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import Hero from 'model/Hero';
import HeroInfo from 'components/body/hero-tab/HeroInfo';
import GameModelStore from 'store/game-model/GameModelStore';
import HeroRecruitButton from 'components/body/hero-tab/HeroRecruitButton';
import IndexedArray from 'business/collection/IndexedArray';
import QuestInfo from 'components/body/hero-tab/QuestInfo';

interface IHeroTabProps {

}

interface IHeroTabState {
    heroes: IndexedArray<string, Hero>;
    isRoomLeft: boolean;
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
            result.push(
                <HeroInfo key={`HEROINFO_${i}`} hero={heroesArray[i]} >
                    <QuestInfo hero={heroesArray[i]} />
                </HeroInfo>
            );
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