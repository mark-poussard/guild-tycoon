import Hero from 'model/Hero';
import Improvements from 'model/Improvements';
import Statistics from 'model/Statistics';
import IndexedArray from 'business/collection/IndexedArray';

export default interface GameModelState {
    gold: number,
    exp: number,
    fame: number,
    heroes: IndexedArray<string, Hero>,
    guildSize: number,
    statistics: Statistics;
    completedDungeons : Set<string>;
    improvements : Improvements;
}