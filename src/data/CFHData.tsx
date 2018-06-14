import CallForHero from "model/CallForHero";
import { HeroData } from "data/HeroData";

export const CFH1: CallForHero = {
    id: 'CFH1',
    title: 'Warrior call',
    description: 'Call a warrior to your guild',
    price: 0,
    pool: {
        content: { sp: [HeroData.HERO1] },
        rates : [{nbr : 100, rarity: 'sp'}]
    }
}

export const CFH2: CallForHero = {
    id: 'CFH2',
    title: 'Mage call',
    description: 'Call a mage to your guild',
    price: 0,
    pool: {
        content: { sp: [HeroData.HERO2] },
        rates : [{nbr : 100, rarity: 'sp'}]
    }
}

export const CFH3: CallForHero = {
    id: 'CFH3',
    title: 'Minstrel call',
    description: 'Call a minstrel to your guild',
    price: 0,
    pool: {
        content: { sp: [HeroData.HERO3] },
        rates : [{nbr : 100, rarity: 'sp'}]
    }
}