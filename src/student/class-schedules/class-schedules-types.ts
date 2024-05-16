export enum ClassType {
    ONLIVE = "ONLIVE",
    TEENS = "TEENS",
    KIDS = "KIDS",
    JUSTSPEAK = "JUSTSPEAK",
}


export const classMapping = {
    [ClassType[ClassType.ONLIVE]]: 'ON-LIVE-HORARIOS',
    [ClassType[ClassType.TEENS]]: 'TEENS-HORARIOS',
    [ClassType[ClassType.KIDS]]: 'KIDS-HORARIOS',
    [ClassType[ClassType.JUSTSPEAK]]: 'JUST-SPEAK-HORARIOS',
};