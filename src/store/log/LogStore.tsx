import { ReduceStore } from "flux/utils";
import LogState from "./LogState";
import LogPayload, { LogRemovePayload, LogActionPayload } from "./LogPayload";
import LogDispatcher from "./LogDispatcher";
import { LogActionTypes } from "./LogActionTypes";

class LogStore extends ReduceStore<LogState, LogPayload> {

    constructor(){
        super(LogDispatcher);
    }

    getInitialState(): LogState {
        return {
            logQueue : []
        }
    }

    reduce(state: LogState, action: LogPayload): LogState {
        const reducedObj = Object.assign({}, state);
        switch(action.type){
            case LogActionTypes.LOG_ACTION :
            {
                const payload = action.payload as LogActionPayload;
                reducedObj.logQueue.push(payload.log);
                break;
            }
            case LogActionTypes.REMOVE_LOG :
            {
                const payload = action.payload as LogRemovePayload;
                const removeIdx : number[] = [];
                for(const log of payload.logs){
                    removeIdx.push(log.id);
                }
                reducedObj.logQueue = reducedObj.logQueue.filter(x => removeIdx.indexOf(x.id) === -1);
                break;
            }
        }
        return reducedObj;
    }
}

export default new LogStore();