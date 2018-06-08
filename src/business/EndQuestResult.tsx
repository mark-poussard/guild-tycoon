import Quest from "model/Quest";
import QuestDrop from "model/QuestDrop";

export default class EndQuestResult{
    quest : Quest;
    result : boolean;
    drops : QuestDrop[];
}