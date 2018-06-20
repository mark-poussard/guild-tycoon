import * as React from 'react';
import Hero from 'model/Hero';
import EquipmentPiece from 'components/generic/equip-overlay/EquipmentPiece';
import GameModelDispatcher from 'store/game-model/GameModelDispatcher';
import { GameModelActionTypes } from 'store/game-model/GameModelActionTypes';
import './EquipmentInfo.css'
import BaseHero from 'model/BaseHero';
import { HeroDataArray } from 'data/HeroData';
import ClassInfo from '../hero-info/ClassInfo';
import ClassHelper from 'business/ClassHelper';
import HeroHelper from 'business/HeroHelper';
import RankStar from 'components/generic/hero-info/RankStar';
import AbilityModifierList from '../hero-info/AbilityModifierList';

interface IEquipmentInfoProps {
    hero: Hero;
}

export default class EquipmentInfo extends React.Component<IEquipmentInfoProps>{
    heroData: BaseHero;
    constructor(props: IEquipmentInfoProps) {
        super(props);
        this.heroData = HeroDataArray.get(this.props.hero.data);
    }
    render() {
        return (
            <div className='container equip-hero-info'>
                <div>
                    <h2>{this.heroData.name}</h2>
                    <div>
                        <span className="rank">{RankStar.generateRank(this.props.hero.rank)}</span>
                    </div>
                    <div>
                        Class : <ClassInfo classList={ClassHelper.computeClassList(this.heroData.class, this.props.hero.rank)} />
                    </div>
                    <div>
                        {this.renderBattleAbility()}
                    </div>
                    <AbilityModifierList modAbilityList={this.heroData.modAbilityList} />
                </div>
                <table className='equip-table center'>
                    <thead>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>
                                <EquipmentPiece hero={this.props.hero} type={'head'} />
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>
                                <EquipmentPiece hero={this.props.hero} type={'hands'} />
                            </td>
                            <td>
                                <EquipmentPiece hero={this.props.hero} type={'torso'} />
                            </td>
                            <td>
                                <EquipmentPiece hero={this.props.hero} type={'hands'} />
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <EquipmentPiece hero={this.props.hero} type={'legs'} />
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <EquipmentPiece hero={this.props.hero} type={'feet'} />
                            </td>
                            <td></td>
                        </tr>
                        <tr><td>
                            <EquipmentPiece hero={this.props.hero} type={'rightHand'} />
                        </td>
                            <td></td>
                            <td>
                                <EquipmentPiece hero={this.props.hero} type={'leftHand'} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button className='input-center' onClick={this.removeAll}>Remove all</button>
            </div>
        );
    }

    removeAll = () => {
        GameModelDispatcher.dispatch({
            type: GameModelActionTypes.REMOVE_ALL_ITEMS,
            payload: {
                hero: this.props.hero
            }
        });
    }

    renderBattleAbility = () => {
        const ba = HeroHelper.computeHeroBA(this.props.hero);
        return (
            <>
            <span>{`Battle Ability : `}</span>
            <span style={{color:'green'}}>{ba}</span>
            </>
        );
    }
}