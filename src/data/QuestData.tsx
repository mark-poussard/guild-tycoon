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
            shard: 2
        },
        drop: [{ item: ItemData.WOODEN_STICK, rates: [100] }],
        activates: ['QUEST02', 'QUEST03', 'QUEST04'],
        repeat: null,
        classReq: []
    },
    QUEST02: {
        id: 'QUEST02',
        title: 'Looking for Mitchel',
        description: 'A frantic mother barges through the guild doors, she has lost her son Mitchel on the outskirts of town and is desperate for some help. Night is falling and wolves have been spotted nearby.',
        maxPartySize: 1,
        duration: new Duration(0, 0, 0, 20),
        ennemies: [{
            class: ClassData.BEAST_CLASS,
            name: 'Big Squirrel',
            ba: 4
        }],
        reward: {
            gold: 5,
            exp: 2,
            shard: 1
        },
        drop: [],
        activates: ['QUEST06'],
        repeat: null,
        classReq: []
    },
    // Expected lvl : 2
    QUEST03: {
        id: 'QUEST03',
        title: 'The haunted graveyard',
        description: 'The village mayor comes knocking at the guild door. Some rumours have been going around town about strange noises and movement in the local graveyard. Elections are coming up and although he is not a superstitious person he would like for someone to take a look.',
        maxPartySize: 1,
        duration: new Duration(0, 0, 0, 20),
        ennemies: [{
            class: ClassData.MAGICAL_CLASS,
            name: 'Animated Spade',
            ba: 4
        }],
        reward: {
            gold: 5,
            exp: 2,
            shard: 1
        },
        drop: [],
        activates: ['QUEST05'],
        repeat: null,
        classReq: []
    },
    QUEST04: {
        id: 'QUEST04',
        title: 'The apple tree robbers',
        description: 'Old farmer Mc.Pearson has sent a letter to ask for help. His orchards are being frequently visited by a thief who is stealing his apple caskets.',
        maxPartySize: 1,
        duration: new Duration(0, 0, 0, 20),
        ennemies: [{
            class: ClassData.RASCAL_CLASS,
            name: 'Juvenile Delinquent',
            ba: 4
        }],
        reward: {
            gold: 5,
            exp: 2,
            shard: 1
        },
        drop: [],
        activates: ['QUEST08'],
        repeat: null,
        classReq: []
    },
    // Expected lvl : 3
    QUEST05: {
        id: 'QUEST05',
        title: 'Researching the art of object animation',
        description: 'You report your findings on the animated spade you found causing the night commotion in the graveyard to the village mayor. He is deeply concerned by this kind of magical practice and would like for you to do some research and possibly find the culprit troublemaking mage. You decide the best place to start an investigation would be to find out what you can about this kind of magical art in the well-furnished capital library.',
        maxPartySize: 1,
        duration: new Duration(0, 0, 0, 40),
        ennemies: [],
        reward: {
            gold: 5,
            exp: 3,
            shard: 0
        },
        drop: [],
        activates: ['QUEST07'],
        repeat: null,
        classReq: [ClassData.MAGE_CLASS.name]
    },
    // Expected lvl : 2
    QUEST06: {
        id: 'QUEST06',
        title: 'Exploring the woods',
        description: 'A walk through the woods. Maybe you will find something interesting along the way.',
        maxPartySize: 1,
        duration: new Duration(0, 0, 0, 20),
        ennemies: [{
            class: ClassData.BEAST_CLASS,
            name: 'Feeble Stray Wolf',
            ba: 13
        }],
        reward: {
            gold: 1,
            exp: 1,
            shard: 0
        },
        drop: [
            { item: ItemData.WOODEN_STICK, rates: [50, 50, 50] },
                {item : ItemData.COURAGE_ORB, rates: [100,100,100,100,100,100,100,100,100,100,100,100,100]},
                {item : ItemData.SENSES_ORB, rates: [100,100,100,100,100,100,100,100,100,100,100,100,100]},
                {item : ItemData.SPIRIT_ORB, rates: [100,100,100,100,100,100,100,100,100,100,100,100,100]},
            ],
        activates: [],
        repeat: new Duration(0, 0, 2, 0),
        classReq: []
    },
    // Expected lvl : 4
    QUEST07: {
        id: 'QUEST07',
        title: 'The graveyard stakeout',
        description: 'It seems that object animation is a very specific subset of magic that requires robust basics and is somewhat linked to necromancy. As everyone suspects, necromancy and graveyards are a recipe for trouble. The situation might be more serious than what it seemed at first sight. You decide to organize a stakeout at the graveyard to try and find the culprit and resolve the situation before it blows up.',
        maxPartySize: 2,
        duration: new Duration(0, 0, 1, 0),
        ennemies: [{
            class: ClassData.RASCAL_CLASS,
            name: 'Hooded figure',
            ba: 20
        }],
        reward: {
            gold: 8,
            exp: 4,
            shard: 0
        },
        drop: [],
        activates: [],
        repeat: null,
        classReq: []
    },
    // Expected lvl : 3
    QUEST08: {
        id: 'QUEST08',
        title: 'The carpenter\'s troubles',
        description: 'Old farmer Mc.Pearson\'s nephew Mike is being threatened by a band of local thugs. Mike is a young talented carpenter and offers to come work on improvements for your guild in exchange for defeating those bandits.',
        maxPartySize: 2,
        duration: new Duration(0, 0, 0, 40),
        ennemies: [{
            class: ClassData.RASCAL_CLASS,
            name: 'Thug',
            ba: 8
        },
        {
            class: ClassData.RASCAL_CLASS,
            name: 'Thug',
            ba: 8
        },
        {
            class: ClassData.RASCAL_CLASS,
            name: 'Thug',
            ba: 8
        }],
        reward: {
            gold: 3,
            exp: 3,
            shard: 0
        },
        drop: [],
        activates: [],
        repeat: null,
        classReq: []
    }
};

export const QuestDataArray = new IndexedArray<string, BaseQuest>(x => x.id, ...ObjectUtils.getValues(QuestData));