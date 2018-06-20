import { LogActionTypes } from "./LogActions";
import Log from "model/log/Log";

export default interface LogPayload {
    type: LogActionTypes;
    payload: any;
}

export interface LogRemovePayload{
    logs : Log[];
}

export interface LogActionPayload{
    log : Log;
}