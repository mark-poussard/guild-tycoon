import { GameModelActionTypes } from './GameModelActionTypes';
import Quest from 'model/Quest';
import QuestWrapper from 'model/QuestWrapper';
import Hero from 'model/Hero';
import Item from 'model/Item';

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

export interface CompleteQuestPayload {
    quest: QuestWrapper;
}

export interface CompleteDungeonPayload {
    dungeonId: string;
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

export interface SetImprovementPayload {
    improvementKey: string;
    value: boolean;
}

export interface StartQuestPayload {
    heroes: Hero[];
    quest: Quest;
}

export interface EndQuestPayload {
    quest: Quest;
}