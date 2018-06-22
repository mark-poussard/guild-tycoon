import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import Hero from 'model/Hero';
import { SortOrder } from 'model/Sorting';
import HeroInfo from 'components/body/hero-tab/HeroInfo';
import GameModelStore from 'store/game-model/GameModelStore';
import HeroRecruitButton from 'components/body/hero-tab/HeroRecruitButton';
import TrainInfo from 'components/body/hero-tab/train/TrainInfo';
import SortButton from 'components/generic/hero-info/SortButton';
import './HeroTab.css'
import HeroHelper from 'business/HeroHelper';
import EquipmentButton from 'components/body/hero-tab/EquipmentButton';
import UpgradeButton from 'components/body/hero-tab/upgrade-overlay/UpgradeButton';

interface IHeroTabProps {

}

interface IHeroTabState {
    heroes: Hero[];
    guildSize : number;
    rankOrder: SortOrder;
    lvlOrder: SortOrder;
    nameOrder: SortOrder;
}

export default class HeroTab extends React.Component<IHeroTabProps, IHeroTabState>{
    storeSubscribe: fbEmitter.EventSubscription;

    constructor(props: IHeroTabProps) {
        super(props);
        this.state = { 
            heroes: GameModelStore.getState().heroes.asArray(),
            guildSize :  GameModelStore.getState().guildSize,
            rankOrder: SortOrder.DESC, lvlOrder: SortOrder.DESC, nameOrder: SortOrder.ASC};
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
                <div className='guild-occupation'>Guild occupation {this.state.heroes.length}/{this.state.guildSize}</div>
            </div>
        );
    }

    componentDidMount() {
        this.storeSubscribe = GameModelStore.addListener(() => {
            this.setState({
                heroes: GameModelStore.getState().heroes.asArray(),
                guildSize :  GameModelStore.getState().guildSize
            });
        });
    }

    componentWillUnmount() {
        this.storeSubscribe.remove();
    }

    computeIsRoomLeft = () => {
        return this.state.guildSize > this.state.heroes.length;
    }

    renderHeroes = () => {
        const result: JSX.Element[] = [];
        const heroesArray = this.state.heroes;
        heroesArray.sort(HeroHelper.createHeroSort(this.state.rankOrder, this.state.lvlOrder, this.state.nameOrder));
        for (const hero of heroesArray) {
            result.push(
                <HeroInfo key={`HEROINFO_${hero.data}`} hero={hero} >
                    <EquipmentButton className={'hero-tab-hero-info-buttons'} hero={hero}/>
                    <UpgradeButton className={'hero-tab-hero-info-buttons'} hero={hero} />
                </HeroInfo>
            );
        }
        return result;
    }

    renderHeroRecruit = () => {
        if (this.computeIsRoomLeft()) {
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