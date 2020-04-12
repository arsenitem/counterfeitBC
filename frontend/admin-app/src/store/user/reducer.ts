import {UserActions, UserActionsTypes, IUserState} from './types'

export const userInitialState: IUserState = {
    accessToken: null
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
        default:
            return state
    }
}