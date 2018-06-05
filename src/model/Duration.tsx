export default class Duration {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;

    constructor(days: number, hours: number, minutes: number, seconds: number) {
        this.days = days;
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
    }

    toString() {
        let result = '';
        if (this.days > 0) {
            result += `${this.days} d `
        }
        if (this.hours > 0) {
            result += `${this.hours} h `
        }
        if (this.minutes > 0) {
            result += `${this.minutes} m `
        }
        if (this.seconds > 0) {
            result += `${this.seconds} s `
        }
        return result;
    }

    toMs() {
        return this.days * 24 * 60 * 60000
            + this.hours * 60 * 60000
            + this.minutes * 60000
            + this.seconds * 1000
    }
}