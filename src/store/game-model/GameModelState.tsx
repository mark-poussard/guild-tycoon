import Hero from 'model/Hero';
import IndexedArray from 'business/collection/IndexedArray';

export default interface GameModelState{
    gold : number,
    exp : number,
    fame : number,
    heroes : IndexedArray<string, Hero>,
    guildSize : number,
}