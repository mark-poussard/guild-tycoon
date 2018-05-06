import * as FbEmitter from 'fbemitter';
import Quest from "model/Quest";
import GameModelDispatcher from 'store/game-model/GameModelDispatcher';
import { GameModelActionTypes } from 'store/game-model/GameModelActionTypes';
import GameModelStore from 'store/game-model/GameModelStore';
import QuestGenerator from 'store/quest/QuestGenerator';

enum QuestEvents {
    PROGRESS = 'progress',
    ENDED = 'ended',
    STARTED = 'started',
}

type QuestProgressListener = (progress: number, heroId: string) => void;
type BasicListener = (heroId: string) => void;

class QuestStore {
    threadsMap: Map<string, number>;
    questsMap: Map<string, Quest>;
    eventEmitter: FbEmitter.EventEmitter;
    questGenerator: QuestGenerator;
    constructor() {
        this.threadsMap = new Map<string, number>();
        this.questsMap = new Map<string, Quest>();
        this.eventEmitter = new FbEmitter.EventEmitter();
        this.questGenerator = new QuestGenerator();
    }

    startQuest = (heroId: string, quest?: Quest) => {
        if (!this.threadsMap.has(heroId)) {
            quest = quest || this.generateQuest(heroId);
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

    getQuestProgress = (heroId: string) => {
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
        return this.questGenerator.generateAutoQuest(heroId);
    }

    questHandler = (heroId: string) => {
        return () => {
            const quest = this.questsMap.get(heroId);
            let progress = this.computeProgress(quest);
            if (progress >= 100) {
                progress = 100;
                this.updateResourceAfterQuest(quest);
                GameModelDispatcher.dispatch({
                    type: GameModelActionTypes.COMPLETE_QUEST,
                    payload: {}
                });
                const hero = GameModelStore.getState().heroes.get(heroId);
                if (hero.autoQuest) {
                    const newQuest = this.generateQuest(heroId);
                    this.questsMap.set(heroId, newQuest);
                    GameModelDispatcher.dispatch({
                        type: GameModelActionTypes.ASSIGN_QUEST,
                        payload: { heroId: heroId, quest: newQuest }
                    });
                }
                else {
                    clearInterval(this.threadsMap.get(heroId));
                    this.threadsMap.delete(heroId);
                    this.questsMap.delete(heroId);
                    this.eventEmitter.emit(QuestEvents.ENDED, heroId);
                    GameModelDispatcher.dispatch({
                        type: GameModelActionTypes.ASSIGN_QUEST,
                        payload: { heroId: heroId, quest: null }
                    });
                }
            }
            this.eventEmitter.emit(QuestEvents.PROGRESS, progress, heroId);
        };
    }

    updateResourceAfterQuest = (quest: Quest) => {
        if (!quest.reward.claimed && this.computeQuestSuccess(quest)) {
            quest.reward.claimed = true;
            GameModelDispatcher.dispatch({ type: GameModelActionTypes.ADD_EXP, payload: { quantity: quest.reward.exp } });
            GameModelDispatcher.dispatch({ type: GameModelActionTypes.ADD_GOLD, payload: { quantity: quest.reward.gold } });
            GameModelDispatcher.dispatch({ type: GameModelActionTypes.ADD_FAME, payload: { quantity: quest.reward.fame } });
        }
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