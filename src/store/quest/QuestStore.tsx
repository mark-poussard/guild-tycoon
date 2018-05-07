import * as FbEmitter from 'fbemitter';
import Quest from "model/Quest";
import QuestWrapper from "model/QuestWrapper";
import GameModelDispatcher from 'store/game-model/GameModelDispatcher';
import { GameModelActionTypes } from 'store/game-model/GameModelActionTypes';
import GameModelStore from 'store/game-model/GameModelStore';
import QuestGenerator from 'store/quest/QuestGenerator';


enum QuestEvents {
    PROGRESS = 'progress',
    ENDED = 'ended',
    STARTED = 'started',
}

type QuestProgressListener = (progress: number, wrappedQuest: QuestWrapper) => void;
type BasicListener = (wrappedQuest: QuestWrapper) => void;

var questIdGenerator = 0;

class QuestStore {
    threadsMap: Map<string, number>;
    questsMap: Map<string, QuestWrapper>;
    eventEmitter: FbEmitter.EventEmitter;
    questGenerator: QuestGenerator;
    constructor() {
        this.threadsMap = new Map<string, number>();
        this.questsMap = new Map<string, QuestWrapper>();
        this.eventEmitter = new FbEmitter.EventEmitter();
        this.questGenerator = new QuestGenerator();
    }

    startQuest = (heroesId: string[], quest: Quest, dungeonId?:string) => {
        const wrappedQuest = this.wrapQuest(heroesId, quest, dungeonId);
        this.questsMap.set(wrappedQuest.id, wrappedQuest);
        this.dispatchQuestAssign(wrappedQuest);
        const intervalId = window.setInterval(this.questHandler(wrappedQuest.id), 200);
        this.threadsMap.set(wrappedQuest.id, intervalId);
        this.eventEmitter.emit(QuestEvents.STARTED, wrappedQuest);
        return wrappedQuest.id;
    }

    wrapQuest = (heroesId: string[], quest: Quest, dungeonId:string): QuestWrapper => {
        return {
            id: (questIdGenerator++).toString(),
            heroes: heroesId,
            quest: quest,
            startTime: new Date(),
            dungeonId: dungeonId,
        };
    }

    dispatchQuestAssign = (wrappedQuest: QuestWrapper) => {
        wrappedQuest.heroes.forEach(
            (heroId: string) => {
                GameModelDispatcher.dispatch({ type: GameModelActionTypes.ASSIGN_QUEST, payload: { heroId: heroId, quest: wrappedQuest } });
            }
        );
    }

    isQuestInProgress = (questId: string) => {
        return this.threadsMap.has(questId);
    }

    getQuestProgress = (questId: string) => {
        const quest = this.questsMap.get(questId)
        if(quest){
            return this.computeProgress(this.questsMap.get(questId));
        }
        return 100;
    }

    registerQuestProgressListener = (listener: QuestProgressListener) => {
        return this.eventEmitter.addListener(QuestEvents.PROGRESS, listener);
    }

    registerQuestStartedListener = (listener: BasicListener) => {
        return this.eventEmitter.addListener(QuestEvents.STARTED, listener);
    }

    registerQuestEndedListener = (listener: BasicListener) => {
        return this.eventEmitter.addListener(QuestEvents.ENDED, listener);
    }

    generateQuest = (heroId: string): Quest => {
        return this.questGenerator.generateAutoQuest(heroId);
    }

    questHandler = (wrapId: string) => {
        return () => {
            const quest = this.questsMap.get(wrapId);
            let progress = this.computeProgress(quest);
            if (progress >= 100) {
                progress = 100;
                this.updateResourceAfterQuest(quest);
                GameModelDispatcher.dispatch({
                    type: GameModelActionTypes.COMPLETE_QUEST,
                    payload: {}
                });
                this.handleQuestEndAndAutoQuesting(quest);
            }
            this.eventEmitter.emit(QuestEvents.PROGRESS, progress, quest);
        };
    }

    updateResourceAfterQuest = (wrappedQuest: QuestWrapper) => {
        GameModelDispatcher.dispatch({ type: GameModelActionTypes.ADD_EXP, payload: { quantity: wrappedQuest.quest.reward.exp } });
        GameModelDispatcher.dispatch({ type: GameModelActionTypes.ADD_GOLD, payload: { quantity: wrappedQuest.quest.reward.gold } });
        GameModelDispatcher.dispatch({ type: GameModelActionTypes.ADD_FAME, payload: { quantity: wrappedQuest.quest.reward.fame } });
    }

    computeQuestSuccess = (quest: Quest) => {
        if (quest.power == 0) {
            return true;
        }
        const chPower = quest.challengingPower;
        const reqPower = quest.power;
        // Linear success chance between 80% to 120% of the reqPower
        // <80% -> 0% chance success | >120% -> 100% chance success
        const successPrct = (5 * chPower) / (2 * reqPower) - 2;
        const roll = Math.random();
        if (roll <= successPrct) {
            return true;
        }
        else {
            return false;
        }
    }

    computeProgress = (wrappedQuest: QuestWrapper) => {
        const currentDuration: number = new Date().getTime() - wrappedQuest.startTime.getTime();
        let progress;
        if (wrappedQuest.quest.duration > 0) {
            progress = (currentDuration / wrappedQuest.quest.duration) * 100;
        }
        else {
            progress = 100;
        }
        return progress;
    }

    handleQuestEndAndAutoQuesting = (wrappedQuest: QuestWrapper) => {
        if (wrappedQuest.heroes.length == 1) {
            const hero = GameModelStore.getState().heroes.get(wrappedQuest.heroes[0]);
            if (hero.autoQuest) {
                const newQuest = this.generateQuest(hero.id);
                wrappedQuest.quest = newQuest;
                wrappedQuest.startTime = new Date();
                GameModelDispatcher.dispatch({
                    type: GameModelActionTypes.ASSIGN_QUEST,
                    payload: { heroId: hero.id, quest: wrappedQuest }
                });
                return;
            }
        }
        clearInterval(this.threadsMap.get(wrappedQuest.id));
        this.threadsMap.delete(wrappedQuest.id);
        this.questsMap.delete(wrappedQuest.id);
        this.eventEmitter.emit(QuestEvents.ENDED, wrappedQuest);
        this.dispatchUnassignQuest(wrappedQuest);
    }

    dispatchUnassignQuest = (wrappedQuest: QuestWrapper) => {
        wrappedQuest.heroes.forEach((heroId) => {
            GameModelDispatcher.dispatch({
                type: GameModelActionTypes.ASSIGN_QUEST,
                payload: { heroId: heroId, quest: null }
            });
        });
    }

    getDungeonQuest = (dungeonId : string) : QuestWrapper => {
        const quests = Array.from(this.questsMap.values());
        let dungeonQuest = null;
        quests.forEach((quest : QuestWrapper) => {
            if(quest.dungeonId == dungeonId){
                dungeonQuest = quest;
            }
        })
        return dungeonQuest;
    }
}

export default new QuestStore();