import * as React from 'react';
import Hero from 'model/Hero';
import { HeroDataArray } from 'data/HeroData';
import * as RarityEnum from 'model/Rarity';

interface IRarityProps{
    hero : Hero;
    className ?: string;
}

export default class Rarity extends React.Component<IRarityProps>{
    render(){
        return <img className={this.props.className} src={this.computeIconPath()}/>
    }

    computeIconPath = () => {
        const heroData = HeroDataArray.get(this.props.hero.data);
        switch(heroData.rarity){
            case RarityEnum.Rarity.T:
                return 'img/rarity/t_rarity.png'

            case RarityEnum.Rarity.SP:
            return 'img/rarity/sp_rarity.png'
        }
        return '';
    }
}