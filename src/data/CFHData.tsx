import CallForHero from "model/CallForHero";
import { HeroData } from "data/HeroData";
import { Rarity } from "model/Rarity";

export const CFH1: CallForHero = {
    id: 'CFH1',
    title: 'Warrior call',
    description: 'Call a warrior to your guild',
    price: 0,
    pool: {
        content: { sp: [HeroData.HERO1] },
        rates: [{ nbr: 100, rarity: Rarity.SP }]
    }
}

export const CFH2: CallForHero = {
    id: 'CFH2',
    title: 'Mage call',
    description: 'Call a mage to your guild',
    price: 0,
    pool: {
        content: { sp: [HeroData.HERO2] },
        rates: [{ nbr: 100, rarity: Rarity.SP }]
    }
}

export const CFH3: CallForHero = {
    id: 'CFH3',
    title: 'Minstrel call',
    description: 'Call a minstrel to your guild',
    price: 0,
    pool: {
        content: { sp: [HeroData.HERO3] },
        rates: [{ nbr: 100, rarity: Rarity.SP }]
    }
}

/*
 * T  : 80%
 * R  : 19%
 * Ex : 1%
 */
export const CFH4: CallForHero = {
    id: 'CFH4',
    title: 'Beginner call',
    description: 'Call heroes to your guild. This call for a hero will produce a single hero of rarity T to Ex.',
    price: 5,
    pool: {
        content: { t: [HeroData.HERO4, HeroData.HERO5, HeroData.HERO6, HeroData.HERO7] },
        rates: [{ nbr: 100, rarity: Rarity.T }]
    }
}