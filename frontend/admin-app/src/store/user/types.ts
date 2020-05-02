import { IUser } from "../../models/user";

export interface IUserState{
    accessToken: string | null,
    user: IUser | null,
    isLoadingUser: boolean,
    error: string | null
}


export enum UserActions {
    SetToken = 'SET_TOKENT',
    SetUserData = 'SET_USER_DATA',
    SetUserError = 'SET_USER_ERROR',
    SetUserLoading = 'SET_USER_LOADING'
}

interface SetTokenAction {
    type: UserActions.SetToken,
    token: string | null;
}
interface SetUserDataAction {
    type: UserActions.SetUserData,
    user: IUser | null
}
interface SetUserError {
    type: UserActions.SetUserError,
    error: string
}
interface SetUserLoading{
    type: UserActions.SetUserLoading,
    isLoadingUser: boolean
}


export type UserActionsTypes= 
    SetTokenAction |
    SetUserDataAction |
    SetUserError |
    SetUserLoading;