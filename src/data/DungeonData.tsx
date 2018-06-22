import DungeonBase from "model/DungeonBase";
import Duration from "model/Duration";
import { ItemData } from "./ItemData";
import * as ClassData from 'data/ClassData';

export const DungeonData: DungeonBase[] = [
    {
        id: 'DUNGEON01',
        name: 'Black forest',
        requireSwitches: ['QUEST02'],
        repeatIn: new Duration(0, 0, 10, 0),
        modes: {
            easy: {
                ennemies: [
                    {
                        class: ClassData.BEAST_CLASS,
                        name: 'Lone wolf',
                        ba: 50
                    }
                ],
                duration: new Duration(0, 0, 5, 0),
                reward: {
                    gold: 10,
                    exp: 15,
                    shard: 0
                },
                drop: [
                    { item: ItemData.WOODEN_STICK, rates: [50, 50, 25] },
                    { item: ItemData.SENSES_ORB, rates: [1] }
                ]
            },
            normal: {
                ennemies: [
                    {
                        class: ClassData.BEAST_CLASS,
                        name: 'Beta wolf',
                        ba: 100
                    }
                ],
                duration: new Duration(0, 0, 5, 0),
                reward: {
                    gold: 20,
                    exp: 30,
                    shard: 0
                },
                drop: [
                    { item: ItemData.WOODEN_STICK, rates: [100, 100, 50, 50, 50, 50, 25, 25] },
                    { item: ItemData.SENSES_ORB, rates: [5] }
                ]
            },
            hard: {
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
                reward: {
                    gold: 40,
                    exp: 60,
                    shard: 0
                },
                drop: [
                    { item: ItemData.WOODEN_STICK, rates: [100, 100, 50, 50, 50, 50, 25, 25] },
                    { item: ItemData.SENSES_ORB, rates: [10] }
                ]
            }
        }
    }
];