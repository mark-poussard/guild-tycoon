import Quest from "model/Quest";
import Duration from "model/Duration";

export const QuestData: Quest[] = [
    {
        id: 'QUEST01',
        title: 'Your first quest !',
        description: 'Congratulations ! Your guild has just opened for business ! As you go about town to advertise the services of your newly founded guild, a frail old woman comes forward to ask if you will help pull her cat out of the well it got stuck in.',
        maxPartySize: 1,
        duration: new Duration(0, 0, 0, 10).toMs(),
        startedAt: null,
        completedAt: null,
        ennemies: null,
        reward: {
            gold: 5,
            exp: 1,
            fame: 0
        },
        drop: [],
        switchDependencies: [],
        repeat: null
    }
];