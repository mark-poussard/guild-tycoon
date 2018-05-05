import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import Recruit from 'model/Recruit';
import RecruitInfo from 'components/body/recruitment-tab/RecruitInfo';
import IndexedArray from 'business/collection/IndexedArray';
import Hero from 'model/Hero';
import GameModelStore from 'store/game-model/GameModelStore';

interface IRecruitmentTabProps {

}

interface IRecruitmentTabState {
    heroes: IndexedArray<string, Hero>;
}

export default class RecruitmentTab extends React.Component<IRecruitmentTabProps, IRecruitmentTabState>{
    storeSubscribe: fbEmitter.EventSubscription;

    constructor(props: IRecruitmentTabProps) {
        super(props);
        this.state = { heroes: GameModelStore.getState().heroes };
    }

    render() {
        return (
            <div>
                {this.renderRecruits()}
            </div>
        );
    }

    componentDidMount() {
        this.storeSubscribe = GameModelStore.addListener(() => {
            this.setState({ heroes: GameModelStore.getState().heroes });
        });
    }

    componentWillUnmount() {
        this.storeSubscribe.remove();
    }

    renderRecruits = () => {
        const result: JSX.Element[] = [];
        for (let i = 0; i < recruits.length; i++) {
            if (!this.state.heroes.contains(recruits[i].hero.id)) {
                result.push(<RecruitInfo key={`RECRUIT_${i}`} recruit={recruits[i]} />);
            }
        }
        return result;
    }
}

const recruits: Recruit[] = [
    {
        gold: 0,
        fame: 0,
        hero:
            {
                id: "1",
                name: 'Alex',
                rank: 1,
                level: 1,
                imgUrl: 'img/squire.png',
                quest: null,
                autoQuest: false
            }
    },
    {
        gold: 100,
        fame: 5,
        hero:
            {
                id: "2",
                name: 'Silvia',
                rank: 1,
                level: 1,
                quest: null,
                autoQuest: false,
                imgUrl: 'img/sprite.png'
            }
    },
    {
        gold: 200,
        fame: 13,
        hero:
            {
                id: "3",
                name: 'Demi',
                rank: 2,
                level: 1,
                quest: null,
                autoQuest: false,
                imgUrl: 'img/battle_monk.png'
            }
    },
    {
        gold: 1000,
        fame: 100,
        hero:
            {
                id: "4",
                name: 'Gilgamesh',
                rank: 3,
                level: 1,
                quest: null,
                autoQuest: false,
                imgUrl: 'img/blood_elf.png'
            }
    }
];