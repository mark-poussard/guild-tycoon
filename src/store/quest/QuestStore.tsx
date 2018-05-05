import * as FbEmitter from 'fbemitter';
import Quest from "model/Quest";
import GameModelDispatcher from 'store/game-model/GameModelDispatcher';
import { GameModelActionTypes } from 'store/game-model/GameModelActionTypes';
import GameModelStore from 'store/game-model/GameModelStore';

enum QuestEvents {
    PROGRESS = 'progress',
    ENDED = 'ended',
    STARTED = 'started',
}

type QuestProgressListener = (progress: number, heroId : string) => void;
type BasicListener = (heroId : string) => void;

class QuestStore {
    threadsMap: Map<string, number>;
    questsMap: Map<string, Quest>;
    eventEmitter: FbEmitter.EventEmitter;
    constructor() {
        this.threadsMap = new Map<string, number>();
        this.questsMap = new Map<string, Quest>();
        this.eventEmitter = new FbEmitter.EventEmitter();
    }

    startQuest = (heroId: string) => {
        if (!this.threadsMap.has(heroId)) {
            const quest = this.generateQuest(heroId);
            this.questsMap.set(heroId, quest);
            GameModelDispatcher.dispatch({ type: GameModelActionTypes.ASSIGN_QUEST, payload: { heroId: heroId, quest: quest } });
            const intervalId = window.setInterval(this.questHandler(heroId), 200);
            this.threadsMap.set(heroId, intervalId);
            this.eventEmitter.emit(QuestEvents.STARTED, heroId);
        }
    }

    isQuestInProgress = (heroId: string) => {
        return this.threadsMap.has(heroId);
    }

    getQuestProgress = (heroId : string) => {
        return this.computeProgress(this.questsMap.get(heroId));
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
        return {
            startTime: new Date(),
            duration: 6000,
            reward: {
                gold: 10,
                exp: 2,
                fame: 1
            }
        }
    }

    questHandler = (heroId: string) => {
        return () => {
            const quest = this.questsMap.get(heroId);
            let progress = this.computeProgress(quest);
            let ended = false;
            if (progress >= 100) {
                progress = 100;
                ended = true;
                this.updateResourceAfterQuest(quest);
                const hero = GameModelStore.getState().heroes.get(heroId);
                if (hero.autoQuest) {
                    const newQuest = this.generateQuest(heroId);
                    this.questsMap.set(heroId, newQuest);
                    GameModelDispatcher.dispatch({ type: GameModelActionTypes.ASSIGN_QUEST, payload: { heroId: heroId, quest: newQuest } });
                }
                else {
                    clearInterval(this.threadsMap.get(heroId));
                    this.threadsMap.delete(heroId);
                    this.questsMap.delete(heroId);
                    this.eventEmitter.emit(QuestEvents.ENDED, heroId);
                }
            }
            this.eventEmitter.emit(QuestEvents.PROGRESS, progress, heroId);
        };
    }

    updateResourceAfterQuest = (quest: Quest) => {
        GameModelDispatcher.dispatch({ type: GameModelActionTypes.ADD_EXP, payload: { quantity: quest.reward.exp } });
        GameModelDispatcher.dispatch({ type: GameModelActionTypes.ADD_FAME, payload: { quantity: quest.reward.fame } });
        GameModelDispatcher.dispatch({ type: GameModelActionTypes.ADD_GOLD, payload: { quantity: quest.reward.gold } });
    }

    computeProgress = (quest: Quest) => {
        const currentDuration: number = new Date().getTime() - quest.startTime.getTime();
        let progress;
        if (quest.duration > 0) {
            progress = (currentDuration / quest.duration) * 100;
        }
        else {
            progress = 100;
        }
        return progress;
    }
}

export default new QuestStore();