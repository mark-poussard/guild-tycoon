import * as React from 'react';
import Ennemy from 'model/BattleEntity';
import ClassInfo from 'components/generic/hero-info/ClassInfo';
import './EnnemyInfo.css'
import ClassHelper from 'business/ClassHelper';

interface IEnnemyInfoProps {
    ennemy: Ennemy;
}

export default class EnnemyInfo extends React.Component<IEnnemyInfoProps>{
    constructor(props: IEnnemyInfoProps) {
        super(props);
    }

    render() {
        return (
            <div className='ennemy-info'>
                <div className='ennemy-info-name'>
                    {this.props.ennemy.name}
                </div>
                <div>
                    Battle Ability : {this.props.ennemy.ba}
                </div>
                <div>
                    Class : <ClassInfo classList={ClassHelper.computeClassList(this.props.ennemy.class)} />
                </div>
            </div>
        );
    }
}