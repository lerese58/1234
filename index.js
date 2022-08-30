const moment = require('moment');

function getPeriod([hours, minutes]) {
    if (hours % 24 <= 7) {
        return {
            speed: 45,
            start: [0, 0],
            end: [8, 0],
        };
    } else if (hours % 24 >= 8 && hours % 24 <= 11) {
        return {
            speed: 30,
            start: [8, 0],
            end: [12, 0],
        };
    } else if (hours % 24 >= 12 && hours % 24 <= 17) {
        return {
            speed: 40,
            start: [12, 0],
            end: [18, 0],
        };
    } else if (hours % 24 >= 18 && hours % 24 <= 21) {
        return {
            speed: 25,
            start: [18, 0],
            end: [22, 0],
        };
    } else if (hours % 24 >= 22 && hours % 24 < 24) {
        return {
            speed: 45,
            start: [22, 0],
            end: [24, 0],
        };
    }
}

const initH = 11, initM = 57;
const initPeriod = getPeriod([initH, initM])
let S = 4.7;
let timer = 0;

const timeLeftInInitPeriod = moment().set('hours', initPeriod.end[0]).set('minutes', initPeriod.end[1]).diff(moment().set('hours', initH).set('minutes', initM), 'hour', true);
const possibleInitS = timeLeftInInitPeriod * initPeriod.speed;
timer += Math.min(S, possibleInitS) / initPeriod.speed;
S -= Math.min(S, possibleInitS);
let currentPeriod = getPeriod(initPeriod.end);

while (S > 0.0001) {
    const timeLeftInPeriod = moment().set('hours', currentPeriod.end[0]).set("minutes", currentPeriod.end[1]).diff(moment().set('hours', currentPeriod.start[0]).set("minutes", currentPeriod.start[1]), 'hour', true);
    const possibleS = timeLeftInPeriod * currentPeriod.speed;
    timer += Math.min(S, possibleS) / currentPeriod.speed;
    S -= Math.min(S, possibleS);
}
console.log(timer);
console.log('hours', ~~timer);
console.log('minutes', (timer - ~~timer) * 60);
