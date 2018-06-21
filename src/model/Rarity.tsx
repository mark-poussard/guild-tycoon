export enum Rarity {
    T = 't',
    R = 'r',
    EX = 'ex',
    EL = 'el',
    LE = 'le',

    SP = 'sp',
}

export const rarityMaxRank: { [rarity in Rarity]?: number } = {
    t: 3,
    r: 5,
    ex: 8,
    el: 10,
    le: 15
}