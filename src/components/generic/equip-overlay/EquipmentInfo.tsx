import * as React from 'react';
import Hero from 'model/Hero';
import EquipmentPiece from 'components/generic/equip-overlay/EquipmentPiece';

interface IEquipmentInfoProps{
    hero : Hero;
}

export default class EquipmentInfo extends React.Component<IEquipmentInfoProps>{
    render() {
        return (
            <table>
                <thead>
                </thead>
                <tbody>
                </tbody>
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
                </table>
        );
    }
}