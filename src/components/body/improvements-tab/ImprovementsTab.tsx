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
            if (!this.state.improvements[improvement.key]) {
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
    },
    {
        key: 'stables',
        title: 'Stables',
        desc: 'Stables allow heroes to use horses and complete their quests faster.',
        cost: 100,
    }
];