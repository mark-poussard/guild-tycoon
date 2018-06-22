import * as React from 'react';
import Hero from 'model/Hero';
import './DupLevel.css'

interface IDupLevelProps{
    hero : Hero;
}

export default class DupLevel extends React.Component<IDupLevelProps>{

    render(){
        if(this.props.hero.dupLevel > 0){
            return(
                <span className='dup-level'>{`+${this.props.hero.dupLevel}`}</span>
            );
        }
        return null;
    }

}