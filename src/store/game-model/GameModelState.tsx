import Hero from 'model/Hero';

export default interface GameModelState{
    gold : number,
    exp : number,
    fame : number,
    heroes : Hero[],
    guildSize : number,
}