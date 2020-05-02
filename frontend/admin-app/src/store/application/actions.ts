import {ApplicationActionsTypes, ApplicationActions} from './types'

export function SetError(error: string): ApplicationActionsTypes {
    return {
        type: ApplicationActions.SetError,
        error
    }
}
export function SetFetching(isFetching: boolean): ApplicationActionsTypes {
    return {
        type: ApplicationActions.SetFetching,
        isFetching
    }
}
export function SetNotification(notification: string): ApplicationActionsTypes {
    return {
        type: ApplicationActions.SetNotification,
        notification
    }
}
export function SetPreloader(isPreloading: boolean): ApplicationActionsTypes {
    return {
        type: ApplicationActions.SetPreloader,
        isPreloading
    }
}
