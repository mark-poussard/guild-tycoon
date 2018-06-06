import BaseHero from "model/BaseHero";

export default class Pool {
    content: { [rarity: string]: BaseHero[] };
    rates: Rate[];
}

export class Rate{
    nbr : number;
    rarity : string;
}