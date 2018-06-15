import * as React from 'react';
import Hero from 'model/Hero';
import EquipmentPiece from 'components/generic/equip-overlay/EquipmentPiece';
import GameModelDispatcher from 'store/game-model/GameModelDispatcher';
import { GameModelActionTypes } from 'store/game-model/GameModelActionTypes';
import './EquipmentInfo.css'

interface IEquipmentInfoProps{
    hero : Hero;
}

export default class EquipmentInfo extends React.Component<IEquipmentInfoProps>{
    render() {
        return (
            <div>
            <table className='equip-table center'>
                <thead>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                        <EquipmentPiece hero={this.props.hero} type={'head'}/>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>
                        <EquipmentPiece hero={this.props.hero} type={'hands'}/>
                        </td>
                        <td>
                        <EquipmentPiece hero={this.props.hero} type={'torso'}/>
                        </td>
                        <td>
                        <EquipmentPiece hero={this.props.hero} type={'hands'}/>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                        <EquipmentPiece hero={this.props.hero} type={'legs'}/>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                        <EquipmentPiece hero={this.props.hero} type={'feet'}/>
                        </td>
                        <td></td>
                    </tr>
                    <tr><td>
                        <EquipmentPiece hero={this.props.hero} type={'rightHand'}/>
                        </td>
                        <td></td>
                        <td>
                        <EquipmentPiece hero={this.props.hero} type={'leftHand'}/>
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
            type : GameModelActionTypes.REMOVE_ALL_ITEMS,
            payload : {
                hero : this.props.hero
            }
        });
    }
}