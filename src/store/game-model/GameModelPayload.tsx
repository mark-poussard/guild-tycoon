import { GameModelActionTypes } from './GameModelActionTypes';
import Quest from 'model/Quest';

export default interface GameModelPayload {
    type: GameModelActionTypes;
    payload: any;
}

export interface AddResourcePayload {
    quantity: number;
}

export interface AssignQuestPayload {
    heroId: number;
    quest: Quest;
}