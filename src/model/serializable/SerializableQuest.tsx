import Quest from "model/Quest";

export default class SerializableQuest{
    questId : string;
    startedAt : number;
    completedAt : number;

    constructor(quest : Quest){
        this.questId = quest.id;
    }
}