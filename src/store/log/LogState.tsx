import Log from "model/log/Log";

export default interface LogState {
    logQueue : Log[];
    logArchive : Log[];
}