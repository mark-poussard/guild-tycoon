import { GameModelActionTypes } from './GameModelActionTypes';
import Quest from 'model/Quest';
import QuestWrapper from 'model/QuestWrapper';
import Hero from 'model/Hero';

export default interface GameModelPayload {
    type: GameModelActionTypes;
    payload: any;
}

export interface AddResourcePayload {
    quantity: number;
}

export interface AssignQuestPayload {
    heroId: string;
    quest: QuestWrapper;
}

export interface RecruitHeroPayload {
    hero: Hero;
}

export interface SetAutoQuestPayload {
    heroId: string;
    autoQuest: boolean;
}

export interface HeroLevelUpPayload {
    heroId: string;
}