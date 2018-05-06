import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import Dungeon from 'model/Dungeon';
import Hero, { HeroHelper } from 'model/Hero';
import './SelectHeroOverlay.css'
import GameModelStore from 'store/game-model/GameModelStore';
import IndexedArray from 'business/collection/IndexedArray';
import HeroInfo from 'components/body/hero-tab/HeroInfo';
import HeroSelectButton from 'components/body/dungeon-tab/HeroSelectButton';
import QuestStore from 'store/quest/QuestStore';
import QuestGenerator from 'store/quest/QuestGenerator';
import RankStar from 'components/generic/hero-info/RankStar';

interface ISelectHeroOverlayProps {
    dungeon: Dungeon;
    doDungeonSelection: (dungeon: Dungeon) => void;
}

interface ISelectHeroOverlayState {
    heroes: IndexedArray<string, Hero>;
    selectedHeroes: Set<string>;
}

export default class SelectHeroOverlay extends React.Component<ISelectHeroOverlayProps, ISelectHeroOverlayState>{
    storeSubscribe: fbEmitter.EventSubscription;
    questGenerator: QuestGenerator;

    constructor(props: ISelectHeroOverlayProps) {
        super(props);
        this.state = { heroes: GameModelStore.getState().heroes, selectedHeroes: new Set<string>() };
        this.questGenerator = new QuestGenerator();
    }

    render() {
        return (
            <div className="blackout" onClick={this.closeOverlay}>
                <div className="overlay" onClick={this.dontCloseOverlay}>
                    <input className="cross" type="image" src="img/cross.png" onClick={this.closeOverlay} />
                    <h2>{`Please select ${this.props.dungeon.partySize} hero to challenge this dungeon.`}</h2>
                    {this.printHeroRequirementTxt()}
                    <div className="hero-container">
                        {this.renderHeroes()}
                    </div>
                    <button className="confirm-button" disabled={!this.canConfirm()} onClick={this.doDungeon}>Challenge dungeon</button>
                </div>
            </div>
        );
    }

    renderHeroes = () => {
        const heroArray = this.state.heroes.asArray();
        const result: JSX.Element[] = [];
        for (let i = 0; i < heroArray.length; i++) {
            result.push(
                <HeroInfo hero={heroArray[i]} >
                    <HeroSelectButton
                        hero={heroArray[i]}
                        selectedHeroes={this.state.selectedHeroes}
                        doSelectHero={this.doSelectHero}
                        doUnselectHero={this.doUnselectHero}
                        partySize={this.props.dungeon.partySize} />
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
                    {RankStar.generateRank(this.props.dungeon.recRank)}
                </div>
                <div>
                    {`Recommended minimum lvl : ${this.props.dungeon.recLvl}`}
                </div>
            </div>

        );
    }

    doSelectHero = (heroId: string) => {
        this.setState({ selectedHeroes: this.state.selectedHeroes.add(heroId) });
    }

    doUnselectHero = (heroId: string) => {
        this.state.selectedHeroes.delete(heroId);
        this.setState({ selectedHeroes: this.state.selectedHeroes });
    }

    canConfirm = () => {
        return this.state.selectedHeroes.size == this.props.dungeon.partySize;
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
        this.props.doDungeonSelection(null);
    }

    dontCloseOverlay = (e: any) => {
        e.stopPropagation();
    }

    doDungeon = () => {
        const combinedPower = this.computeHeroesCombinedPower(this.state.selectedHeroes);
        const quest = this.questGenerator.generateQuestFromDungeon(this.props.dungeon, combinedPower);
        this.state.selectedHeroes.forEach((heroId: string) => {
            QuestStore.startQuest(heroId, quest);
        });
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
}