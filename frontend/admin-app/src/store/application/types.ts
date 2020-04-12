export interface IApplicationState {
    showPreloader: boolean;
    isFetchingData: boolean;
    error: string | null;
    notification: string | null;
}

export enum ApplicationActions {
    SetPreloader = 'SET_PRELOADER',
    SetFetching = 'SET_FETCHING',
    SetError = 'SET_ERROR',
    SetNotification = 'SET_NOTIFICATION'
}

interface SetPreloaderAction{
    type: ApplicationActions.SetPreloader,
    isPreloading: boolean;
}

interface SetFetchingAction {
    type: ApplicationActions.SetFetching,
    isFetching: boolean;
}
interface SetErrorAction {
    type: ApplicationActions.SetError,
    error: string;
}
interface SetNotification {
    type: ApplicationActions.SetNotification,
    notification: string;
}

export type ApplicationActionsTypes =
    SetPreloaderAction |
    SetFetchingAction |
    SetErrorAction |
    SetNotification;