import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import GameModelStore from 'store/game-model/GameModelStore';
import ImprovementDetails from 'components/body/improvements-tab/ImprovementDetails';
import Improvements, { ImprovementInfo } from 'model/Improvements';

interface ImprovementsTabProps {

}

interface ImprovementsTabState {
    improvements: Improvements;
}

export default class ImprovementsTab extends React.Component<ImprovementsTabProps, ImprovementsTabState>{
    storeSubscribe: fbEmitter.EventSubscription;
    constructor(props: ImprovementsTabProps) {
        super(props);
        this.state = { improvements: GameModelStore.getState().improvements };
    }

    render() {
        return (
            <div>
                <h2>{"Guild improvements"}</h2>
                {this.renderImprovements()}
            </div>
        );
    }

    componentDidMount() {
        this.storeSubscribe = GameModelStore.addListener(() => {
            this.setState({ improvements: GameModelStore.getState().improvements });
        });
    }

    componentWillUnmount() {
        this.storeSubscribe.remove();
    }

    renderImprovements = () => {
        const result: JSX.Element[] = [];
        for (let i = 0; i < improvements.length; i++) {
            const improvement = improvements[i];
            let requirements = true;
            for(let i=0; i< improvement.requireKeys.length; i++){
                const requireKey = improvement.requireKeys[i];
                requirements = requirements && this.state.improvements[requireKey];
            }
            if (!this.state.improvements[improvement.key] && requirements) {
                result.push(<ImprovementDetails key={`IMPROVEMENT_${i}`} improvement={improvement} />);
            }
        }
        return result;
    }
}

const improvements: ImprovementInfo[] = [
    {
        key: 'autoQuest',
        title: 'Guild administration',
        desc: 'An administration system upgrade to automatically assign new quests to heroes returning to the guild.',
        cost: 10,
        requireKeys: [],
    },
    {
        key: 'stables',
        title: 'Stables',
        desc: 'Stables allow heroes to use horses and complete their quests faster.',
        cost: 100,
        requireKeys: [],
    },
    {
        key: 'train1',
        title: 'Training grounds',
        desc: 'Hero training will be more effective in this open field.',
        cost: 50,
        requireKeys: [],
    },
    {
        key: 'train2',
        title: 'Training equipment',
        desc: 'Heroes will be able to train more effectively with proper training equipment.',
        cost: 200,
        requireKeys: ['train1'],
    },
    {
        key: 'train3',
        title: 'Training master',
        desc: 'Hires a retired mercenary to train your heroes in the ways of battle.',
        cost: 500,
        requireKeys: ['train2'],
    },
    {
        key: 'trainClickNo1',
        title: 'Training ground refreshments',
        desc: 'Have some water and food stands available on the training grounds so that heroes train more efficiently.',
        cost: 200,
        requireKeys: ['train1'],
    }
];