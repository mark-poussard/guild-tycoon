import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import Hero, { HeroHelper } from 'model/Hero';
import { SortOrder } from 'model/Sorting';
import HeroInfo from 'components/body/hero-tab/HeroInfo';
import GameModelStore from 'store/game-model/GameModelStore';
import HeroRecruitButton from 'components/body/hero-tab/HeroRecruitButton';
import IndexedArray from 'business/collection/IndexedArray';
import QuestInfo from 'components/body/hero-tab/QuestInfo';
import TrainInfo from 'components/body/hero-tab/train/TrainInfo';
import SortButton from 'components/generic/hero-info/SortButton';
import './HeroTab.css'

interface IHeroTabProps {

}

interface IHeroTabState {
    heroes: IndexedArray<string, Hero>;
    isRoomLeft: boolean;
    rankOrder: SortOrder;
    lvlOrder: SortOrder;
    nameOrder: SortOrder;
}

export default class HeroTab extends React.Component<IHeroTabProps, IHeroTabState>{
    storeSubscribe: fbEmitter.EventSubscription;

    constructor(props: IHeroTabProps) {
        super(props);
        this.state = { heroes: GameModelStore.getState().heroes, isRoomLeft: this.computeIsRoomLeft(), rankOrder: SortOrder.DESC, lvlOrder: SortOrder.DESC, nameOrder: SortOrder.ASC };
    }

    render() {
        return (
            <div>
                <TrainInfo />
                <div className="sort-buttons">
                    <SortButton order={this.state.rankOrder} txt={'rank'} toggle={() => { this.setState({ rankOrder: -this.state.rankOrder }) }} />
                    <SortButton order={this.state.lvlOrder} txt={'lvl'} toggle={() => { this.setState({ lvlOrder: -this.state.lvlOrder }) }} />
                    <SortButton order={this.state.nameOrder} txt={'name'} toggle={() => { this.setState({ nameOrder: -this.state.nameOrder }) }} />
                </div>
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
        heroesArray.sort(HeroHelper.createHeroSort(this.state.rankOrder, this.state.lvlOrder, this.state.nameOrder));
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

    renderSortButton = (order: SortOrder, txt: string, toggle: () => void) => {
        let icon = 'angle-up';
        if (order < 0) {
            icon = 'angle-down';
        }
        return (
            <button onClick={toggle}>
                {txt}
                <i className={`fa fa-${icon}`}></i>
            </button>
        );
    }
}