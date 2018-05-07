export default class Improvement {
    [key: string]: boolean;
    autoQuest: boolean;
    stables: boolean;
}

export class ImprovementInfo {
    key: string;
    title: string;
    desc: string;
    cost: number;
}