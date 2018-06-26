import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import GameModelStore from 'store/game-model/GameModelStore';
import ImprovementDetails from 'components/body/improvements-tab/ImprovementDetails';
import Improvements, { ImprovementInfo } from 'model/Improvements';
import { improvementsData } from 'data/ImprovementsData';

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
                <h2>Guild improvements</h2>
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
        for (let i = 0; i < improvementsData.length; i++) {
            const improvement = improvementsData[i];
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

