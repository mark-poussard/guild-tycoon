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
            { item: ItemData.COURAGE_ORB, rates: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100] },
            { item: ItemData.SENSES_ORB, rates: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100] },
            { item: ItemData.SPIRIT_ORB, rates: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100] },
        ],
        activates: [],
        repeat: null,
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
    },
    // Expected lvl : 20-30
    QUEST09: {
        id: 'QUEST09',
        title: 'Jake the beast hunter',
        description: 'A savage looking man comes knocking at your guild door. He claims to a famous beast hunter named \'Jake\' looking for help in his next hunt through the wilds. Although you have never heard of this man before he seems competent enough and -most importantly- willing to pay for your services.',
        maxPartySize: 2,
        duration: new Duration(0, 0, 10, 0),
        ennemies: [{
            class: ClassData.BEAST_CLASS,
            name: 'Grizzly Bear',
            ba: 80
        },
        {
            class: ClassData.BEAST_CLASS,
            name: 'Enraged Boar',
            ba: 120
        }],
        reward: {
            gold: 5,
            exp: 10,
            shard: 0
        },
        drop: [],
        activates: [],
        repeat: null,
        classReq: []
    },
    // Expected lvl : 35
    QUEST10: {
        id: 'QUEST10',
        title: 'What\'s a Harkling ?',
        description: 'You\'ve received a letter from Jake (the hunter). He\'s asking for help tracking down a scourge of Harklings down in the fire lands. He also mentions a hefty donation to the guild if it accepts to help.',
        maxPartySize: 2,
        duration: new Duration(0, 0, 15, 0),
        ennemies: [{
            class: ClassData.HARKLING_CLASS,
            name: 'Baby Harkling',
            ba: 10
        },
        {
            class: ClassData.HARKLING_CLASS,
            name: 'Baby Harkling',
            ba: 10
        },
        {
            class: ClassData.HARKLING_CLASS,
            name: 'Baby Harkling',
            ba: 10
        },
        {
            class: ClassData.HARKLING_CLASS,
            name: 'Mother Harkling',
            ba: 160
        }],
        reward: {
            gold: 10,
            exp: 30,
            shard: 0
        },
        drop: [],
        activates: [],
        repeat: null,
        classReq: []
    },
    // Expected lvl : 40
    QUEST11: {
        id: 'QUEST11',
        title: 'The Tomjaker tooth',
        description: 'It\'s Jake again, this time he is rambling about a... tooth ? He claims it has great value especially if sold to the Ja\'raki tribe who live deep in the western jungles. He promises that if the guild helps, he\'ll share the spoils of the tooth fairly. If he makes it back alive.',
        maxPartySize: 1,
        duration: new Duration(0, 0, 20, 0),
        ennemies: [
            {
                class: ClassData.TOMJAKER_CLASS,
                name: 'Imposant Tomjaker',
                ba: 200
            }],
        reward: {
            gold: 10,
            exp: 45,
            shard: 0
        },
        drop: [],
        activates: [],
        repeat: null,
        classReq: []
    },
    // Expected lvl : 50
    QUEST12: {
        id: 'QUEST12',
        title: 'Hunting Frostbears',
        description: 'Jake is back, and this time he wants to go on an epic hunt for Frostbears. You\'ve already heard tales of those magnificent creatures, and from what you remember of them they have a ferocious temper and will maul or eat anything that comes close to their den. Jake seems very excited at the prospect.',
        maxPartySize: 4,
        duration: new Duration(0, 0, 30, 0),
        ennemies: [
            {
                class: ClassData.FROSTBEAR_CLASS,
                name: 'Frostbear',
                ba: 250
            },
            {
                class: ClassData.FROSTBEAR_CLASS,
                name: 'Frostbear',
                ba: 250
            },
            {
                class: ClassData.FROSTBEAR_CLASS,
                name: 'Frostbear',
                ba: 250
            }],
        reward: {
            gold: 20,
            exp: 60,
            shard: 0
        },
        drop: [],
        activates: [],
        repeat: null,
        classReq: []
    },
    // Expected lvl : 70
    QUEST13: {
        id: 'QUEST13',
        title: 'A Beewiz infestation',
        description: 'You\'ve receive a letter from Jake. He is currently helping out a small northern village that is suffering from a terrifying Beewiz colony. These flying creatures are known to be a nuisance when encountered alone, when they form a colony it becomes urgent to evacuate neighbouring villages before a tragedy happens.',
        maxPartySize: 2,
        duration: new Duration(0, 0, 30, 0),
        ennemies: [
            {
                class: ClassData.BEEWIZ_CLASS,
                name: 'Beewiz',
                ba: 300
            },
            {
                class: ClassData.BEEWIZ_CLASS,
                name: 'Beewiz',
                ba: 300
            },
            {
                class: ClassData.BEEWIZ_CLASS,
                name: 'Beewiz Queen',
                ba: 330
            }],
        reward: {
            gold: 30,
            exp: 90,
            shard: 0
        },
        drop: [],
        activates: [],
        repeat: null,
        classReq: []
    },
    // Expected lvl : 90
    QUEST14: {
        id: 'QUEST14',
        title: 'A beast among beasts',
        description: 'Jake is back, and this time he is offering to go on a quest like no other. He is going to track the mightiest beast there is to slay and enter the legends. He has taken a liking to the guild and wants to share the glory and spoils with it. For the moment he has no clue where to start looking for his beast.',
        maxPartySize: 3,
        duration: new Duration(0, 0, 40, 0),
        ennemies: [
            {
                class: ClassData.HARKLING_CLASS,
                name: 'Harkling Alpha',
                ba: 400
            },
            {
                class: ClassData.TOMJAKER_CLASS,
                name: 'Ancient Tomjaker',
                ba: 400
            },
            {
                class: ClassData.FROSTBEAR_CLASS,
                name: 'Deranged Frostbear',
                ba: 400
            }],
        reward: {
            gold: 60,
            exp: 200,
            shard: 1
        },
        drop: [],
        activates: [],
        repeat: null,
        classReq: []
    },
    // Expected lvl : 120
    QUEST15: {
        id: 'QUEST15',
        title: 'On the trace of the Jabberwocky',
        description: 'During the latest hunt, you rested the night in an isolated village high up in the mountains, where you heard about the tale of the Jabberwocky. A formidable beast made of scale, fang, claw and wing, capable of crushing a man with the power of it\'s stare. This tale got Jake visibly excited and he is determined to track down the fabled creature.',
        maxPartySize: 1,
        duration: new Duration(0, 0, 30, 0),
        ennemies: [
            {
                class: ClassData.RASCAL_CLASS,
                name: 'Bandit',
                ba: 550
            }],
        reward: {
            gold: 40,
            exp: 100,
            shard: 1
        },
        drop: [],
        activates: [],
        repeat: null,
        classReq: [ClassData.MINSTREL_CLASS.name]
    },
    // Expected lvl : 150
    QUEST16: {
        id: 'QUEST16',
        title: 'The vaporous swamp',
        description: 'After going through countless villages in the region, Jake finally finds an old man that talks about the great Jabberwocky hunt the people here took part in back when he was young. He says that the last he heard, all that was left of the beasts kind could only be found deep in the vaporous swamps, a local swamp named so because of jets of hot steam coming out of cracks in the ground. After asking for directions and a few days travel you make it to a valley covered in low hanging clouds. The swamps seem to be at the bottom.',
        maxPartySize: 3,
        duration: new Duration(0, 0, 40, 0),
        ennemies: [
            {
                class: ClassData.VORPAL_CLASS,
                name: 'Vorpal Tainted Wolf',
                ba: 800
            },
            {
                class: ClassData.VORPAL_CLASS,
                name: 'Vorpal Tainted Bear',
                ba: 850
            },],
        reward: {
            gold: 40,
            exp: 100,
            shard: 1
        },
        drop: [],
        activates: [],
        repeat: null,
        classReq: [ClassData.MINSTREL_CLASS.name]
    }
};

export const QuestDataArray = new IndexedArray<string, BaseQuest>(x => x.id, ...ObjectUtils.getValues(QuestData));