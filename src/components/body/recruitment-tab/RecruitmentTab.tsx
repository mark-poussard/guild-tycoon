import * as React from 'react';
import Recruit from 'model/Recruit';
import RecruitInfo from 'components/body/recruitment-tab/RecruitInfo';

interface IRecruitmentTabProps {

}

interface IRecruitmentTabState {

}

export default class RecruitmentTab extends React.Component<IRecruitmentTabProps, IRecruitmentTabState>{
    constructor(props: IRecruitmentTabProps) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.renderRecruits()}
            </div>
        );
    }

    renderRecruits = () => {
        const result: JSX.Element[] = [];
        for (let i = 0; i < recruits.length; i++) {
            result.push(<RecruitInfo key={`RECRUIT_${i}`} recruit={recruits[i]} />);
        }
        return result;
    }
}

const recruits: Recruit[] = [
    {
        gold: 0,
        fame: 0,
        hero :
        {
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
        hero :
        {
            name : 'Silvia',
            rank : 1,
            level : 1,
            quest : null,
            autoQuest : false,
            imgUrl : 'img/sprite.png'
        }
    },
    {
        gold: 200,
        fame: 13,
        hero :
        {
            name : 'Demi',
            rank : 2,
            level : 1,
            quest : null,
            autoQuest : false,
            imgUrl : 'img/battle_monk.png'
        }
    },
    {
        gold: 1000,
        fame: 100,
        hero :
        {
            name : 'Gilgamesh',
            rank : 3,
            level : 1,
            quest : null,
            autoQuest : false,
            imgUrl : 'img/blood_elf.png'
        }
    }
];