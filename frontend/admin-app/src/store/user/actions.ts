import {Action, ActionCreator, Dispatch} from 'redux';
import {IState} from '../index'
import {UserActions, UserActionsTypes} from './types'
import { IUser, IUserLogin, IUserSignUp } from "../../models/user"



export function setAccessToken(token: string | null): UserActionsTypes {
    return {
        type: UserActions.SetToken,
        token
    }
}

export function setUserError(error: string): UserActionsTypes{
    return {
        type: UserActions.SetUserError,
        error
    }
}
export function setUserLoading(isLoading: boolean): UserActionsTypes{
    return {
        type: UserActions.SetUserLoading,
        isLoadingUser: isLoading
    }
}
export function setUserData(userData: IUser): UserActionsTypes {
    return {
        type: UserActions.SetUserData,
        user: userData
    }
}


export function loginUser(userData: IUserLogin, history: any) {
    return async (dispatch: any) => {
        try {
            dispatch(setUserLoading(true))
            // fetch user
            // dispatch(setUserData(user))
        } catch (e) {
            
            dispatch(setUserError(''))
        } finally {
            dispatch(setUserLoading(false))
        }
    }
} 
export function signUpUser(userDate: IUserSignUp, history: any): any {
    return async (dispatch: any) => {
        try{
            dispatch(setUserLoading(true))
        } catch (e) {
            dispatch(setUserError(''))
        } finally {
            dispatch(setUserLoading(false))
        }
    }
}

export function logoutUser() {
    return (dispatch: any) => {
        localStorage.removeItem('accessToken');
        dispatch(setAccessToken(null)) 
    };
} 

export function getUserData(): any {
    return async (dispatch: any) => {
        try {
            dispatch(setUserLoading(true))
        } catch(e) {
            dispatch(setUserError(''))
        } finally {
            dispatch(setUserLoading(false))
        }
    }
}
