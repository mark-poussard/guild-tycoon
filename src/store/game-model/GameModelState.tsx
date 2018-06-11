import Hero from 'model/Hero';
import Improvements from 'model/Improvements';
import Statistics from 'model/Statistics';
import IndexedArray from 'business/collection/IndexedArray';
import GameSwitches from 'model/GameSwitches';
import Quest from 'model/Quest';
import { QuestDataArray, QuestData } from 'data/QuestData';
import ItemCollection from 'model/serializable/ItemCollection';

export default interface GameModelState {
    gold: number,
    exp: number,
    fame: number,
    heroes: IndexedArray<string, Hero>,
    guildSize: number,
    statistics: Statistics;
    completedDungeons: Set<string>;
    improvements: Improvements;
    quests: Quest[];
    gameSwitches: GameSwitches;
    items: ItemCollection;
}

export const StartingGameState = (): GameModelState => {
    return {
        gold: 5000,
        fame: 5000,
        exp: 0,
        heroes: new IndexedArray<string, Hero>(x => x.data.id),
        guildSize: 10,
        statistics: {
            questCompleted: 0,
            trainClicks: 0,
        },
        completedDungeons: new Set<string>(),
        improvements: new Improvements(),
        gameSwitches: {},
        quests: [
            {
                id: QuestData.QUEST01.id,
                startedAt: null,
                completedAt: null
            }
        ],
        items: {}
    } as GameModelState;
}

export const GameStateSerializer = (obj: GameModelState) => JSON.stringify(obj, replacer);
export const GameStateDeserializer = (str: string) => JSON.parse(str, reviver);

const reviver = (key: any, value: any) => {
    switch (key) {
        case 'heroes':
            {
                const result = new IndexedArray<string, Hero>(x => x.data.id);
                JSON.parse(value).forEach((element: Hero) => {
                    result.add(element);
                });
                return result;
            }
        case 'completedDungeons':
            {
                const result = new Set<string>();
                JSON.parse(value).forEach((element: string) => {
                    result.add(element);
                });
                return result;
            }
        default:
            return value;
    }
}

const replacer = (key: string, value: any) => {

    switch (key) {
        case 'heroes':
            {
                return JSON.stringify(value.asArray());
            }
        case 'completedDungeons':
            {
                return JSON.stringify(Array.from(value));
            }
        default:
            return value;
    }
}