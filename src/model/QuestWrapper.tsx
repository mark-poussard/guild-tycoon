import Quest from 'model/Quest';

export default interface QuestWrapper {
    id: string;
    quest: Quest;
    heroes: string[];
    startTime: Date;
    dungeonId : string;
}