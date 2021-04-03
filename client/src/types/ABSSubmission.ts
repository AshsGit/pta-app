export interface ABSSubmission {
    periodOfObs_to: Date,
    periodOfObs_from: Date,
    obsEnv: string,
    //examinerInitials: string, //is this needed for ABS
    answers: number[]
}