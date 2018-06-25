import { GameModelActionTypes } from './GameModelActionTypes';
import Quest from 'model/Quest';
import Hero from 'model/Hero';
import CallForHero from 'model/CallForHero';
import QuestDrop from 'model/QuestDrop';
import EquipmentSet from 'model/EquipmentSet';
import BaseQuest from 'model/BaseQuest';

export default interface GameModelPayload {
    type: GameModelActionTypes;
    payload: any;
}

export interface AddResourcePayload {
    quantity: number;
}

export interface RecruitHeroPayload {
    hero: Hero;
}

export interface HeroLevelUpPayload {
    heroId: string;
}

export interface HeroBulkLevelUpPayload {
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

export interface EndQuestFailPayload {
    quest: Quest;
    questData ?: BaseQuest;
}

export interface EndQuestWinPayload {
    quest: Quest;
    questData ?: BaseQuest;
    drops: QuestDrop[];
}

export interface RepeatQuestPayload {
    quest: Quest;
}

export interface RegisterCFHResultPayload {
    cfh: CallForHero;
    hero: Hero;
    dupId: string;
}

export interface EquipItemPayload {
    hero: Hero;
    itemId: string;
    slot: keyof EquipmentSet;
}

export interface RemoveAllItemsPayload {
    hero: Hero;
}

export interface RemoveItemPayload {
    hero: Hero;
    slot: keyof EquipmentSet;
}

export interface HeroRankUpPayload {
    hero: Hero;
}