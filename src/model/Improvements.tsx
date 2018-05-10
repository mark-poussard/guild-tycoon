export default class Improvement {
    [key: string]: boolean;
    autoQuest: boolean;
    stables: boolean;
    train1: boolean;
    train2: boolean;
    train3: boolean;
    trainClickNo1: boolean;
}

export class ImprovementInfo {
    key: string;
    title: string;
    desc: string;
    cost: number;
    requireKeys: string[];
}