import { ReduceStore } from "flux/utils";
import LogState from "./LogState";
import LogPayload, { LogRemovePayload, LogActionPayload } from "./LogPayload";
import LogDispatcher from "./LogDispatcher";
import { LogActionTypes } from "./LogActions";

const CACHE_LOG_KEY = "log-cache"

class LogStore extends ReduceStore<LogState, LogPayload> {

    constructor() {
        super(LogDispatcher);
    }

    getInitialState(): LogState {
        let logCache = localStorage.getItem(CACHE_LOG_KEY);
        if (logCache) {
            return JSON.parse(logCache);
        }
        return {
            logQueue: [],
            logArchive: []
        }
    }

    reduce(state: LogState, action: LogPayload): LogState {
        const reducedObj = Object.assign({}, state);
        switch (action.type) {
            case LogActionTypes.LOG_ACTION:
                {
                    const payload = action.payload as LogActionPayload;
                    reducedObj.logQueue.push(payload.log);
                    reducedObj.logArchive.push(payload.log);
                    break;
                }
            case LogActionTypes.REMOVE_FROM_QUEUE:
                {
                    const payload = action.payload as LogRemovePayload;
                    const removeIdx: number[] = [];
                    for (const log of payload.logs) {
                        removeIdx.push(log.id);
                    }
                    reducedObj.logQueue = reducedObj.logQueue.filter(x => removeIdx.indexOf(x.id) === -1);
                    break;
                }
            case LogActionTypes.CLEAR_LOG:
                {
                    reducedObj.logArchive = [];
                    reducedObj.logQueue = [];
                    break;
                }
        }
        localStorage.setItem(CACHE_LOG_KEY, JSON.stringify(reducedObj));
        return reducedObj;
    }
}

export default new LogStore();