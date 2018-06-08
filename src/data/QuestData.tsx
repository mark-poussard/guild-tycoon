import Duration from "model/Duration";
import IndexedArray from "business/collection/IndexedArray";
import BaseQuest from "model/BaseQuest";
import * as ClassData from 'data/ClassData';
import ObjectUtils from "business/utils/ObjectUtils";
import { ItemData } from "data/ItemData";

export const QuestData: { [key: string]: BaseQuest } = {
    QUEST01: {
        id: 'QUEST01',
        title: 'Your first quest !',
        description: 'Congratulations ! Your guild has just opened for business ! As you go about town to advertise the services of your newly founded guild, a frail old woman comes forward to ask if you will help pull her cat out of the well it got stuck in.',
        maxPartySize: 1,
        duration: new Duration(0, 0, 0, 10),
        ennemies: null,
        reward: {
            gold: 5,
            exp: 1,
            fame: 0
        },
        drop: [{ item: ItemData.WOODEN_STICK, rates: [100] }],
        activates: ['QUEST02', 'QUEST03', 'QUEST04'],
        repeat: null
    },
    QUEST02: {
        id: 'QUEST02',
        title: 'Looking for Mitchel',
        description: 'A frantic mother barges through the guild doors, she has lost her son Mitchel on the outskirts of town and is desperate for some help. Night is falling and wolves have been spotted nearby.',
        maxPartySize: 1,
        duration: new Duration(0, 0, 0, 20),
        ennemies: [{
            classList: [ClassData.BEAST_CLASS.name],
            name: 'Big Squirrel',
            ba: 3
        }],
        reward: {
            gold: 5,
            exp: 2,
            fame: 0
        },
        drop: [],
        activates: [],
        repeat: null
    },
    QUEST03: {
        id: 'QUEST03',
        title: 'The haunted graveyard',
        description: 'The village mayor comes knocking at the guild door. Some rumours have been going around town about strange noises and movement in the local graveyard. Elections are coming up and although he is not a superstitious person he would like for someone to take a look.',
        maxPartySize: 1,
        duration: new Duration(0, 0, 0, 20),
        ennemies: [{
            classList: [ClassData.MAGICAL_CLASS.name],
            name: 'Animated Spade',
            ba: 3
        }],
        reward: {
            gold: 5,
            exp: 2,
            fame: 0
        },
        drop: [],
        activates: [],
        repeat: null
    },
    QUEST04: {
        id: 'QUEST04',
        title: 'The apple tree robbers',
        description: 'Old farmer Mc.Pearson has sent a letter to ask for help. His orchards are being frequently visited by a thief who is stealing his apple caskets.',
        maxPartySize: 1,
        duration: new Duration(0, 0, 0, 20),
        ennemies: [{
            classList: [ClassData.RASCAL_CLASS.name],
            name: 'Juvenile Delinquent',
            ba: 3
        }],
        reward: {
            gold: 5,
            exp: 2,
            fame: 0
        },
        drop: [],
        activates: [],
        repeat: null
    }
};

export const QuestDataArray = new IndexedArray<string, BaseQuest>(x => x.id, ...ObjectUtils.getValues(QuestData));