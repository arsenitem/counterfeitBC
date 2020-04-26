import {UserActions, UserActionsTypes, IUserState} from './types'

export const userInitialState: IUserState = {
    accessToken: null,
    user: null,
    isLoadingUser: false,
    error: null
}

export function userReducer(
    state = userInitialState,
    action: UserActionsTypes
): IUserState {
    switch(action.type) {
        case UserActions.SetToken:
            return {
                ...state,
                accessToken: action.token
            }
        case UserActions.SetUserData:
            return {
                ...state,
                user: action.user
            }
        case UserActions.SetUserError:
            return {
                ...state,
                error: action.error
            }
        case UserActions.SetUserLoading:
            return {
                ...state,
                isLoadingUser: action.isLoadingUser
            }
        default:
            return state
    }
}