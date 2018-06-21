import BaseHero from "model/BaseHero";
import { Rarity } from "model/Rarity";

export default class Pool {
    content: { [rarity in Rarity]?: BaseHero[] };
    rates: Rate[];
}

export class Rate{
    nbr : number;
    rarity : Rarity;
}