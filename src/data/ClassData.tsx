import Class from "model/Class";

export const WARRIOR_CLASS : Class = {
    name : 'warrior',
    onRank : 0
}

export const SWORDSMAN_CLASS : Class = {
    name : 'swordsman',
    onRank : 3,
    previous : WARRIOR_CLASS
}

export const MINSTREL_CLASS : Class = {
    name : 'minstrel',
    onRank : 0
}

export const ARCHER_CLASS : Class = {
    name : 'archer',
    onRank : 3,
    previous : MINSTREL_CLASS
}

export const MAGE_CLASS : Class = {
    name : 'mage',
    onRank : 0
}

export const ELEMENTALIST_CLASS : Class = {
    name : 'elementalist',
    onRank : 3,
    previous : MAGE_CLASS
}

export const RASCAL_CLASS : Class = {
    name : 'rascal',
    onRank : 0
}

export const MAGICAL_CLASS : Class = {
    name : 'magical',
    onRank : 0
}

export const BEAST_CLASS : Class = {
    name : 'beast',
    onRank : 0
}