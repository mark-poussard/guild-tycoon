import DungeonBase from "model/DungeonBase";
import Duration from "model/Duration";
import { ItemData } from "./ItemData";
import * as ClassData from 'data/ClassData';
import IndexedArray from "business/collection/IndexedArray";
import ObjectUtils from "business/utils/ObjectUtils";

export const DungeonData: DungeonBase[] = [
    {
        id: 'DUNGEON01',
        name: 'Black forest',
        requireSwitches: ['QUEST02'],
        repeatIn: new Duration(0, 0, 10, 0),
        modes: {
            EASY: {
                ennemies: [
                    {
                        class: ClassData.BEAST_CLASS,
                        name: 'Lone wolf',
                        ba: 50
                    }
                ],
                duration: new Duration(0, 0, 0, 10),
                maxPartySize : 1,
                reward: {
                    gold: 10,
                    exp: 15,
                    shard: 0
                },
                drop: [
                    { item: ItemData.WOODEN_STICK, rates: [50, 50, 25] }
                ]
            },
            NORMAL: {
                ennemies: [
                    {
                        class: ClassData.BEAST_CLASS,
                        name: 'Beta wolf',
                        ba: 100
                    }
                ],
                duration: new Duration(0, 0, 5, 0),
                maxPartySize : 1,
                reward: {
                    gold: 20,
                    exp: 30,
                    shard: 0
                },
                drop: [
                    { item: ItemData.WOODEN_STICK, rates: [100, 100, 50, 50, 50, 50, 25, 25] },
                    { item: ItemData.SENSES_ORB, rates: [1] }
                ]
            },
            HARD: {
                ennemies: [
                    {
                        class: ClassData.BEAST_CLASS,
                        name: 'Beta wolf',
                        ba: 150
                    },
                    {
                        class: ClassData.BEAST_CLASS,
                        name: 'Beta wolf',
                        ba: 150
                    },
                    {
                        class: ClassData.BEAST_CLASS,
                        name: 'Beta wolf',
                        ba: 150
                    },
                    {
                        class: ClassData.BEAST_CLASS,
                        name: 'Alpha wolf',
                        ba: 180
                    }
                ],
                duration: new Duration(0, 0, 5, 0),
                maxPartySize : 2,
                reward: {
                    gold: 40,
                    exp: 60,
                    shard: 0
                },
                drop: [
                    { item: ItemData.WOODEN_STICK, rates: [100, 100, 50, 50, 50, 50, 25, 25] },
                    { item: ItemData.SENSES_ORB, rates: [5] }
                ]
            }
        }
    },
    {
        id: 'DUNGEON02',
        name: 'The Vaporous Swamp',
        requireSwitches: ['QUEST16'],
        repeatIn: new Duration(0, 3, 0, 0),
        modes: {
            EASY: {
                ennemies: [
                    {
                        class: ClassData.VORPAL_CLASS,
                        name: 'Vorpal Wolf',
                        ba: 800
                    }
                ],
                duration: new Duration(0, 0, 30, 0),
                maxPartySize : 3,
                reward: {
                    gold: 20,
                    exp: 50,
                    shard: 0
                },
                drop: [
                    { item: ItemData.SENSES_ORB, rates: [10, 5, 1] }
                ]
            },
            NORMAL: {
                ennemies: [
                    {
                        class: ClassData.VORPAL_CLASS,
                        name: 'Vorpal Bear',
                        ba: 1200
                    }
                ],
                duration: new Duration(0, 0, 45, 0),
                maxPartySize : 3,
                reward: {
                    gold: 30,
                    exp: 75,
                    shard: 0
                },
                drop: [
                    { item: ItemData.SENSES_ORB, rates: [20, 10, 5] }
                ]
            },
            HARD: {
                ennemies: [
                    {
                        class: ClassData.BEAST_CLASS,
                        name: 'Vorpal Abomination',
                        ba: 1600
                    }
                ],
                duration: new Duration(0, 0, 50, 0),
                maxPartySize : 3,
                reward: {
                    gold: 40,
                    exp: 100,
                    shard: 0
                },
                drop: [
                    { item: ItemData.SENSES_ORB, rates: [30, 20, 10] }
                ]
            }
        }
    },
    {
        id: 'DUNGEON03',
        name: 'The Jabberwocky Layer',
        requireSwitches: ['QUEST20'],
        repeatIn: new Duration(0, 5, 0, 0),
        modes: {
            EASY: {
                ennemies: [
                    {
                        class: ClassData.JABBERWOCKY_CLASS,
                        name: 'Jabberwocky',
                        ba: 1800
                    }
                ],
                duration: new Duration(0, 0, 30, 0),
                maxPartySize : 3,
                reward: {
                    gold: 90,
                    exp: 200,
                    shard: 0
                },
                drop: [
                    { item: ItemData.SENSES_ORB, rates: [50, 50, 25, 25, 10] }
                ]
            },
            NORMAL: {
                ennemies: [
                    {
                        class: ClassData.JABBERWOCKY_CLASS,
                        name: 'Jabberwocky Prime',
                        ba: 2200
                    }
                ],
                duration: new Duration(0, 0, 45, 0),
                maxPartySize : 3,
                reward: {
                    gold: 130,
                    exp: 300,
                    shard: 0
                },
                drop: [
                    { item: ItemData.SENSES_ORB, rates: [100, 50, 50, 50, 10] }
                ]
            },
            HARD: {
                ennemies: [
                    {
                        class: ClassData.JABBERWOCKY_CLASS,
                        name: 'Ancient Jabberwocky',
                        ba: 3000
                    }
                ],
                duration: new Duration(0, 0, 50, 0),
                maxPartySize : 3,
                reward: {
                    gold: 160,
                    exp: 400,
                    shard: 0
                },
                drop: [
                    { item: ItemData.SENSES_ORB, rates: [100, 100, 100, 100, 100, 100, 100, 50, 50, 50, 50, 50, 50] }
                ]
            }
        }
    }
];

export const DungeonDataArray = new IndexedArray<string, DungeonBase>(x => x.id, ...ObjectUtils.getValues(DungeonData));