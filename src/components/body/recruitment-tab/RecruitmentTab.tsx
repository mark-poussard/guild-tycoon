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
    fame: number;
}

export default class RecruitmentTab extends React.Component<IRecruitmentTabProps, IRecruitmentTabState>{
    storeSubscribe: fbEmitter.EventSubscription;

    constructor(props: IRecruitmentTabProps) {
        super(props);
        const gameState = GameModelStore.getState();
        this.state = { heroes: gameState.heroes, fame: gameState.fame };
    }

    render() {
        return (
            <div>
                <h3 style={{verticalAlign:'middle'}}>More heroes will become available as you gain <img style={{verticalAlign:'middle'}} src="img/fame.png"/></h3>
                {this.renderRecruits()}
            </div>
        );
    }

    componentDidMount() {
        this.storeSubscribe = GameModelStore.addListener(() => {
            const gameState = GameModelStore.getState();
            this.setState({ heroes: gameState.heroes, fame: gameState.fame });
        });
    }

    componentWillUnmount() {
        this.storeSubscribe.remove();
    }

    renderRecruits = () => {
        const result: JSX.Element[] = [];
        for (let i = 0; i < recruits.length; i++) {
            if (this.shouldRenderRecruit(recruits[i])) {
                result.push(<RecruitInfo key={`RECRUIT_${i}`} recruit={recruits[i]} />);
            }
        }
        return result;
    }

    shouldRenderRecruit = (recruit: Recruit) => {
        return (!this.state.heroes.contains(recruit.hero.id)) && this.state.fame >= recruit.fameReq;
    }
}

const recruits: Recruit[] = [
    {
        gold: 0,
        fameReq: 0,
        fameWon: 0,
        hero:
            {
                id: "1",
                name: 'Alex',
                rank: 1,
                level: 1,
                imgUrl: 'img/char/squire.png',
                quest: null,
                autoQuest: false
            }
    },
    {
        gold: 1000,
        fameReq: 0,
        fameWon: 30,
        hero:
            {
                id: "5",
                name: 'Hector',
                rank: 1,
                level: 1,
                imgUrl: 'img/char/rich.png',
                quest: null,
                autoQuest: false
            }
    },
    {
        gold: 100,
        fameReq: 1,
        fameWon: 0,
        hero:
            {
                id: "2",
                name: 'Silvia',
                rank: 1,
                level: 1,
                quest: null,
                autoQuest: false,
                imgUrl: 'img/char/sprite.png'
            }
    },
    {
        gold: 150,
        fameReq: 10,
        fameWon: 0,
        hero:
            {
                id: "3",
                name: 'Mike',
                rank: 1,
                level: 1,
                quest: null,
                autoQuest: false,
                imgUrl: 'img/char/mike.png'
            }
    },
    {
        gold: 300,
        fameReq: 20,
        fameWon: 2,
        hero:
            {
                id: "7",
                name: 'Denis',
                rank: 2,
                level: 1,
                quest: null,
                autoQuest: false,
                imgUrl: 'img/char/battle_monk.png'
            }
    },
    {
        gold: 500,
        fameReq: 25,
        fameWon: 5,
        hero:
            {
                id: "8",
                name: 'Rene',
                rank: 2,
                level: 1,
                quest: null,
                autoQuest: false,
                imgUrl: 'img/char/rene.png'
            }
    },
    {
        gold: 1000,
        fameReq: 50,
        fameWon: 8,
        hero:
            {
                id: "9",
                name: 'Julie',
                rank: 2,
                level: 1,
                quest: null,
                autoQuest: false,
                imgUrl: 'img/char/julie.png'
            }
    },
    {
        gold: 2000,
        fameReq: 100,
        fameWon: 15,
        hero:
            {
                id: "6",
                name: 'Gilgamesh',
                rank: 3,
                level: 1,
                quest: null,
                autoQuest: false,
                imgUrl: 'img/char/blood_elf.png'
            }
    },
    {
        gold: 3500,
        fameReq: 150,
        fameWon: 20,
        hero:
            {
                id: "10",
                name: 'Rhodes',
                rank: 3,
                level: 1,
                quest: null,
                autoQuest: false,
                imgUrl: 'img/char/rhodes.png'
            }
    },
];