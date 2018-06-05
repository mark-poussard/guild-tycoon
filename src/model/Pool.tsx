import BaseHero from "model/BaseHero";

export default class Pool {
    content: { [rarity: string]: BaseHero[] };
    rates: { [rarity: string]: number };
}