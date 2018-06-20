
let ID_GEN = 0;

export default class Log{
    constructor(msg : string, lvl : LogLevel){
        this.id = ID_GEN++;
        this.level = lvl;
        this.msg = msg;
        this.producedAt = new Date().getTime();
    }

    id: number;
    level : LogLevel;
    msg : string;
    producedAt : number;
}

// USER > HISTORY > CONSOLE
export enum LogLevel{
    USER, HISTORY, CONSOLE
}