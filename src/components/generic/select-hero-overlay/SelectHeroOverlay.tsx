import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import Dungeon, { DungeonHelper } from 'model/Dungeon';
import Hero from 'model/Hero';
import './SelectHeroOverlay.css'
import GameModelStore from 'store/game-model/GameModelStore';
import IndexedArray from 'business/collection/IndexedArray';
import HeroInfo from 'components/body/hero-tab/HeroInfo';
import QuestStore from 'store/quest/QuestStore';
import QuestGenerator from 'store/quest/QuestGenerator';
import RankStar from 'components/generic/hero-info/RankStar';
import QuestWrapper from 'model/QuestWrapper'
import { SortOrder } from 'model/Sorting';
import SortButton from 'components/generic/hero-info/SortButton';
import HeroHelper from 'business/HeroHelper';
import QuestHelper from 'business/QuestHelper';
import Quest from 'model/Quest';
import Overlay from 'components/generic/Overlay';
import HeroSelectButton from 'components/generic/select-hero-overlay/HeroSelectButton';

interface ISelectHeroOverlayProps {
    display: boolean;
    maxSelection: number;
    doConfirmSelection: (heroes: Hero[]) => void;
    doCancelSelection: () => void;
}

interface ISelectHeroOverlayState {
    heroes: Hero[];
    selectedHeroes: Set<Hero>;
    rankOrder: SortOrder;
    lvlOrder: SortOrder;
    nameOrder: SortOrder;
}

export default class SelectHeroOverlay extends React.Component<ISelectHeroOverlayProps, ISelectHeroOverlayState>{
    storeSubscribe: fbEmitter.EventSubscription;
    questGenerator: QuestGenerator;

    constructor(props: ISelectHeroOverlayProps) {
        super(props);
        this.state = { heroes: GameModelStore.getState().heroes.asArray(), selectedHeroes: new Set<Hero>(), rankOrder: SortOrder.DESC, lvlOrder: SortOrder.DESC, nameOrder: SortOrder.ASC };
        this.questGenerator = new QuestGenerator();
    }

    render() {
        return (
            <Overlay display={this.props.display} closeOverlayCallback={this.props.doCancelSelection} width={80} height={80}>
                {this.props.children}
                <div className="hero-container">
                    <div>
                        <SortButton order={this.state.rankOrder} txt={'rank'} toggle={() => { this.setState({ rankOrder: -this.state.rankOrder }) }} />
                        <SortButton order={this.state.lvlOrder} txt={'lvl'} toggle={() => { this.setState({ lvlOrder: -this.state.lvlOrder }) }} />
                        <SortButton order={this.state.nameOrder} txt={'name'} toggle={() => { this.setState({ nameOrder: -this.state.nameOrder }) }} />
                    </div>
                    {this.renderHeroes()}
                </div>
                <button className="confirm-button" disabled={!this.canConfirm()} onClick={this.confirmSelection}>Confirm</button>
            </Overlay>
        );
    }

    renderHeroes = () => {
        const heroArray = this.state.heroes;
        heroArray.sort(HeroHelper.createHeroSort(this.state.rankOrder, this.state.lvlOrder, this.state.nameOrder));
        const result: JSX.Element[] = [];
        for (let i = 0; i < heroArray.length; i++) {
            result.push(
                <HeroInfo key={`HEROINFO_${i}`} hero={heroArray[i]} >
                    <HeroSelectButton
                        hero={heroArray[i]}
                        selectedHeroes={this.state.selectedHeroes}
                        doSelectHero={this.doSelectHero}
                        doUnselectHero={this.doUnselectHero}
                        partySize={this.props.maxSelection} />
                </HeroInfo>
            );
        }
        return result;
    }

    doSelectHero = (hero: Hero) => {
        this.setState({ selectedHeroes: this.state.selectedHeroes.add(hero) });
    }

    doUnselectHero = (hero: Hero) => {
        this.state.selectedHeroes.delete(hero);
        this.setState({ selectedHeroes: this.state.selectedHeroes });
    }

    canConfirm = () => {
        return this.state.selectedHeroes.size > 0 && this.state.selectedHeroes.size <= this.props.maxSelection;
    }

    componentDidMount() {
        this.storeSubscribe = GameModelStore.addListener(() => {
            this.setState({ heroes: GameModelStore.getState().heroes.asArray() });
        });
    }

    componentWillUnmount() {
        this.storeSubscribe.remove();
    }

    confirmSelection = () => {
        this.props.doConfirmSelection(Array.from(this.state.selectedHeroes));
    }

    computeHeroesCombinedPower = (heroeSet: Set<string>) => {
        let result = 0;
        const heroesId = Array.from(heroeSet);
        for (let i = 0; i < heroesId.length; i++) {
            const hero = GameModelStore.getState().heroes.get(heroesId[i]);
            result += HeroHelper.getPower(hero);
        }
        return result;
    }
}