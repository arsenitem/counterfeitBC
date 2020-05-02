import {ApplicationActions, ApplicationActionsTypes, IApplicationState} from './types'

export const applicationInitialState: IApplicationState = {
    showPreloader: false,
    isFetchingData: false,
    error: null,
    notification: null
}

export function applicationReducer(
    state = applicationInitialState,
    action: ApplicationActionsTypes
): IApplicationState {
    switch(action.type) {
        case ApplicationActions.SetError:
            return {
                ...state,
                error: action.error
            }
        case ApplicationActions.SetFetching:
            return {
                ...state,
                isFetchingData: action.isFetching
            }
        case ApplicationActions.SetNotification:
            return {
                ...state,
                notification: action.notification
            }
        case ApplicationActions.SetPreloader:
            return {
                ...state,
                showPreloader: action.isPreloading
            }
        default:
            return state
    }
}