import Quest from 'model/Quest';

export default class Hero{
    id : string;
    name : string;
    rank : number;
    level : number;
    imgUrl : string;
    quest : Quest;
    autoQuest : boolean;
}