import QuestReward from 'model/QuestReward';

export default class Quest{
    startTime : Date;
    duration : number;
    power : number;
    challengingPower : number;
    reward : QuestReward;
}