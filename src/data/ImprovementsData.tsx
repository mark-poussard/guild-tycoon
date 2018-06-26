import { ImprovementInfo } from "model/Improvements";

export const improvementsData: ImprovementInfo[] = [
    {
        key: 'shop1',
        title: 'Guild Market',
        desc: 'Build a guild market where your heroes can buy brand new pieces of equipment and sell objects they find on their quests.',
        cost: 10,
        requireKeys: [],
    },
    {
        key: 'train1',
        title: 'Training grounds',
        desc: 'A training grounds where heroes can train and gain experience before leaving on quests.',
        cost: 50,
        requireKeys: [],
    },
    {
        key: 'train2',
        title: 'Training equipment',
        desc: 'Heroes will be able to train more effectively with proper training equipment.',
        cost: 200,
        requireKeys: ['train1'],
    },
    {
        key: 'train3',
        title: 'Training master',
        desc: 'Hires a retired mercenary to train your heroes in the ways of battle.',
        cost: 500,
        requireKeys: ['train2'],
    },
    {
        key: 'trainClickNo1',
        title: 'Training ground refreshments',
        desc: 'Have some water and food stands available on the training grounds so that heroes train more efficiently.',
        cost: 200,
        requireKeys: ['train1'],
    }
];