export interface IUserState{
    accessToken: string | null
}


export enum UserActions {
    SetToken = 'SET_TOKENT'
}

interface SetTokenAction {
    type: UserActions.SetToken,
    token: string;
}


export type UserActionsTypes= 
    SetTokenAction;