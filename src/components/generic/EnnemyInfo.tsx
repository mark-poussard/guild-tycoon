import * as React from 'react';
import Ennemy from 'model/BattleEntity';
import ClassInfo from 'components/generic/hero-info/ClassInfo';

interface IEnnemyInfoProps{
    ennemy : Ennemy;
}

export default class EnnemyInfo extends React.Component<IEnnemyInfoProps>{
    constructor(props : IEnnemyInfoProps){
        super(props);
    }

    render(){
        return (
            <div>
                <div>
                {this.props.ennemy.name}
                </div>
                <div>
                    Battle Ability : {this.props.ennemy.ba} 
                </div>
                <div>
                    Class : <ClassInfo class={this.props.ennemy.class}/>
                </div>
            </div>
        );
    }
}