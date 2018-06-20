import Class from "model/Class";

//Warrior classes

export const WARRIOR_CLASS : Class = {
    name : 'warrior',
    onRank : 0
}

export const SWORDSMAN_CLASS : Class = {
    name : 'swordsman',
    onRank : 3,
    previous : WARRIOR_CLASS
}

export const KNIGHT_CLASS : Class = {
    name : 'knight',
    onRank : 5,
    previous : SWORDSMAN_CLASS
}

export const PALADIN_CLASS : Class = {
    name : 'paladin',
    onRank : 8,
    previous : KNIGHT_CLASS
}

export const MONK_CLASS : Class = {
    name : 'monk',
    onRank : 3,
    previous : WARRIOR_CLASS
}

export const PSIONIC_CLASS : Class = {
    name : 'psionic',
    onRank : 5,
    previous : WARRIOR_CLASS
}

export const BARBARIAN_CLASS : Class = {
    name : 'barbarian',
    onRank : 3,
    previous : WARRIOR_CLASS
}

export const BERSERKER_CLASS : Class = {
    name : 'berserker',
    onRank : 5,
    previous : BARBARIAN_CLASS
}

export const COLOSSUS_CLASS : Class = {
    name : 'colossus',
    onRank : 5,
    previous : BARBARIAN_CLASS
}

// Minstrel classes

export const MINSTREL_CLASS : Class = {
    name : 'minstrel',
    onRank : 0
}

export const ARCHER_CLASS : Class = {
    name : 'archer',
    onRank : 3,
    previous : MINSTREL_CLASS
}

export const SHARPSHOOTER_CLASS : Class = {
    name : 'sharpshooter',
    onRank : 5,
    previous : ARCHER_CLASS
}

export const BARD_CLASS : Class = {
    name : 'bard',
    onRank : 3,
    previous : MINSTREL_CLASS
}

export const DRUID_CLASS : Class = {
    name : 'druid',
    onRank : 5,
    previous : BARD_CLASS
}

export const THIEF_CLASS : Class = {
    name : 'thief',
    onRank : 3,
    previous : MINSTREL_CLASS
}

// Mage classes

export const MAGE_CLASS : Class = {
    name : 'mage',
    onRank : 0
}

export const ELEMENTALIST_CLASS : Class = {
    name : 'elementalist',
    onRank : 3,
    previous : MAGE_CLASS
}

export const PYROMANCER_CLASS : Class = {
    name : 'pyromancer',
    onRank : 5,
    previous : ELEMENTALIST_CLASS
}

export const ELECTROMANCER_CLASS : Class = {
    name : 'electromancer',
    onRank : 5,
    previous : ELEMENTALIST_CLASS
}

export const WARLOCK_CLASS : Class = {
    name : 'warlock',
    onRank : 3,
    previous : MAGE_CLASS
}

export const SHADOWCASTER_CLASS : Class = {
    name : 'shadowcaster',
    onRank : 3,
    previous : MAGE_CLASS
}

export const LIGHTSWORN_CLASS : Class = {
    name : 'lightsworn',
    onRank : 3,
    previous : MAGE_CLASS
}

export const CHRONOMANCER_CLASS : Class = {
    name : 'chronomancer',
    onRank : 5,
    previous : MAGE_CLASS
}

// Ennemy specific class

export const RASCAL_CLASS : Class = {
    name : 'rascal',
    onRank : 0
}

export const MAGICAL_CLASS : Class = {
    name : 'magical',
    onRank : 0
}

export const CULTIST_CLASS : Class = {
    name : 'cultist',
    onRank : 0
}

export const BEAST_CLASS : Class = {
    name : 'beast',
    onRank : 0
}