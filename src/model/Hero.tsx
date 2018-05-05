import Quest from 'model/Quest';

export default class Hero{
    name : string;
    rank : number;
    level : number;
    imgUrl : string;
    quest : Quest;
    autoQuest : boolean;
}