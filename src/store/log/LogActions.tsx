import LogDispatcher from "./LogDispatcher";
import Log, { LogLevel } from "model/log/Log";

export enum LogActionTypes {
    LOG_ACTION = 'log_action',
    REMOVE_FROM_QUEUE = 'remove_from_queue',
    CLEAR_LOG = 'clear_log'
}

export const logUserAction = (msg: string) => {
    this.logAction(new Log(msg, LogLevel.USER));
}

export const logAction = (log: Log) => {
    LogDispatcher.dispatch({
        type: LogActionTypes.LOG_ACTION,
        payload: {
            log: log
        }
    })
}

export const removeLogFromQueue = (logs: Log[]) => {
    LogDispatcher.dispatch({
        type: LogActionTypes.REMOVE_FROM_QUEUE,
        payload: {
            logs: logs
        }
    });
}

export const clearLogs = () => {
    LogDispatcher.dispatch({
        type: LogActionTypes.CLEAR_LOG,
        payload: {}
    });
}