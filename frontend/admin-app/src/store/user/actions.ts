import {Action, ActionCreator, Dispatch} from 'redux';
import {IState} from '../index'
import {UserActions, UserActionsTypes} from './types'
import { IUser, IUserLogin, IUserSignUp } from "../../models/user"
import { IdentityService } from '../../services'



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
export function setUserData(userData: IUser | null): UserActionsTypes {
    return {
        type: UserActions.SetUserData,
        user: userData
    }
}


export function loginUser(userData: IUserLogin) {
    return async (dispatch: any) => {
        try {
            dispatch(setUserLoading(true))
            const identityService = new IdentityService()
            const {accessToken, user} = await identityService.loginUser(userData)
            dispatch(setAccessToken(accessToken))
            dispatch(setUserData(user))
            localStorage.setItem('accessToken', accessToken)
        } catch (e) {
            // process error from server
            dispatch(setUserError(''))
        } finally {
            dispatch(setUserLoading(false))
        }
    }
} 
export function signUpUser(userData: IUserSignUp): any {
    return async (dispatch: any) => {
        try{
            dispatch(setUserLoading(true))
            const identityService = new IdentityService()
            const {accessToken, user} = await identityService.signUpUser(userData)
            dispatch(setAccessToken(accessToken))
            dispatch(setUserData(user))
            localStorage.setItem('accessToken', accessToken)
        } catch (e) {
            // process error from server
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
        dispatch(setUserData(null))
    };
} 

export function getUserData(accessToken: string): any {
    return async (dispatch: any) => {
        try {
            dispatch(setUserLoading(true))
            const identityService = new IdentityService()
            const user = await identityService.getUserData(accessToken)
            dispatch(setUserData(user))
        } catch(e) {
            // process error from server
            dispatch(setUserError('Не удалось получить данные пользователя. Пожалуйста авторизуйтесь ещё раз.'))
            dispatch(setAccessToken(null)) 
            dispatch(setUserData(null))
        } finally {
            dispatch(setUserLoading(false))
        }
    }
}
