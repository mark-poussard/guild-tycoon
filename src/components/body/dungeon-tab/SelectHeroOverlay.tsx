import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import Dungeon, { DungeonHelper } from 'model/Dungeon';
import Hero, { HeroHelper } from 'model/Hero';
import './SelectHeroOverlay.css'
import GameModelStore from 'store/game-model/GameModelStore';
import IndexedArray from 'business/collection/IndexedArray';
import HeroInfo from 'components/body/hero-tab/HeroInfo';
import HeroSelectButton from 'components/body/dungeon-tab/HeroSelectButton';
import QuestStore from 'store/quest/QuestStore';
import QuestGenerator from 'store/quest/QuestGenerator';
import RankStar from 'components/generic/hero-info/RankStar';
import QuestWrapper from 'model/QuestWrapper'
import { QuestHelper } from 'model/Quest';
import { SortOrder } from 'model/Sorting';
import SortButton from 'components/generic/hero-info/SortButton';

interface ISelectHeroOverlayProps {
    dungeon: Dungeon;
    callback: (questId: string) => void;
    doDungeonSelection: (dungeon: Dungeon, callback: Function) => void;
}

interface ISelectHeroOverlayState {
    heroes: IndexedArray<string, Hero>;
    selectedHeroes: Set<string>;
    rankOrder: SortOrder;
    lvlOrder: SortOrder;
    nameOrder: SortOrder;
}

export default class SelectHeroOverlay extends React.Component<ISelectHeroOverlayProps, ISelectHeroOverlayState>{
    storeSubscribe: fbEmitter.EventSubscription;
    questGenerator: QuestGenerator;

    constructor(props: ISelectHeroOverlayProps) {
        super(props);
        this.state = { heroes: GameModelStore.getState().heroes, selectedHeroes: new Set<string>(), rankOrder: SortOrder.DESC, lvlOrder: SortOrder.DESC, nameOrder: SortOrder.ASC };
        this.questGenerator = new QuestGenerator();
    }

    render() {
        return (
            <div>
                {this.renderOverlayTitle()}
                {this.printHeroRequirementTxt()}
                <div className="hero-container">
                    <div>
                        <SortButton order={this.state.rankOrder} txt={'rank'} toggle={() => { this.setState({ rankOrder: -this.state.rankOrder }) }} />
                        <SortButton order={this.state.lvlOrder} txt={'lvl'} toggle={() => { this.setState({ lvlOrder: -this.state.lvlOrder }) }} />
                        <SortButton order={this.state.nameOrder} txt={'name'} toggle={() => { this.setState({ nameOrder: -this.state.nameOrder }) }} />
                    </div>
                    {this.renderHeroes()}
                </div>
                <button className="confirm-button" disabled={!this.canConfirm()} onClick={this.doDungeon}>Challenge dungeon</button>
            </div>
        );
    }

    renderOverlayTitle = () => {
        let heroTxt = 'hero';
        if (this.props.dungeon.partyMaxSize > 1) {
            heroTxt = 'heroes'
        }
        return (
            <h2>{`Please select ${this.props.dungeon.partyMaxSize} ${heroTxt} to challenge this dungeon.`}</h2>
        );
    }

    renderHeroes = () => {
        const heroArray = this.state.heroes.asArray();
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
                        partySize={this.props.dungeon.partyMaxSize} />
                </HeroInfo>
            );
        }
        return result;
    }

    printHeroRequirementTxt = () => {
        return (
            <div>
                <div>
                    {"Recommended minimum rank : "}
                    {RankStar.generateRank(this.getRecommendedRank())}
                </div>
                <div>
                    {`Recommended minimum lvl : ${this.getRecommendedLevel()}`}
                </div>
                <div>
                    {`Dungeon power : ${this.props.dungeon.power} - Current party power : ${this.computeHeroesCombinedPower(this.state.selectedHeroes)} - Success rate : ${this.computeDungeonSuccessRate()}%`}
                </div>
            </div>

        );
    }

    getRecommendedRank = () => {
        return DungeonHelper.getRecommendedRank(this.props.dungeon.power);
    }

    getRecommendedLevel = () => {
        return DungeonHelper.getRecommendedLevel(this.props.dungeon.power);
    }

    doSelectHero = (heroId: string) => {
        this.setState({ selectedHeroes: this.state.selectedHeroes.add(heroId) });
    }

    doUnselectHero = (heroId: string) => {
        this.state.selectedHeroes.delete(heroId);
        this.setState({ selectedHeroes: this.state.selectedHeroes });
    }

    canConfirm = () => {
        return this.state.selectedHeroes.size > 0 && this.state.selectedHeroes.size <= this.props.dungeon.partyMaxSize;
    }

    componentDidMount() {
        this.storeSubscribe = GameModelStore.addListener(() => {
            this.setState({ heroes: GameModelStore.getState().heroes });
        });
    }

    componentWillUnmount() {
        this.storeSubscribe.remove();
    }

    closeOverlay = () => {
        this.props.doDungeonSelection(null, null);
    }

    doDungeon = () => {
        const combinedPower = this.computeHeroesCombinedPower(this.state.selectedHeroes);
        const quest = this.questGenerator.generateQuestFromDungeon(this.props.dungeon, combinedPower);
        const questId = QuestStore.startQuest(Array.from(this.state.selectedHeroes), quest, this.props.dungeon.id);
        this.props.callback(questId);
        this.closeOverlay();
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

    computeDungeonSuccessRate = () => {
        const heroPower = this.computeHeroesCombinedPower(this.state.selectedHeroes);
        return Math.min(Math.max(Math.floor(QuestHelper.computeSuccessRate(this.props.dungeon.power, heroPower) * 100), 0), 100);
    }
}