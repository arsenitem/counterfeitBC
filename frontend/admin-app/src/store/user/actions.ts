import { Dispatch } from "react"
import {IState} from '../index'
import {UserActions, UserActionsTypes} from './types'



export function setAccessToken(token: string): UserActionsTypes {
    return {
        type: UserActions.SetToken,
        token
    }
}



export function signIn(): (dispatch: Dispatch<IState>) => Promise<void> {
    return async (dispatch: Dispatch<IState>) => {
      dispatch(signInInProgress());
  
      try {
        
  
        dispatch(signInSuccess());
      } catch (err) {
        dispatch(signInFail(err));
      }
    };
  }
  
export function signOut(): (dispatch: Dispatch<IState>) => Promise<void> {
return async (dispatch: Dispatch<IState>) => {
    dispatch(signOutInProgress());

    try {


    dispatch(signOutSuccess());
    } catch (err) {
    dispatch(signOutFail(err));
    }
};
}

  function signInInProgress(): ISignInInProgressAction {
    return {
      type: keys.SIGNIN_INPROGRESS
    };
  }
  
  function signInSuccess(): ISignInSuccessAction {
    return {
      type: keys.SIGNIN_SUCCESS
    };
  }
  
  function signInFail(error: Error): ISignInFailAction {
    return {
      payload: {
        error
      },
      type: keys.SIGNIN_FAIL
    };
  }
  
  function signOutInProgress(): ISignOutInProgressAction {
    return {
      type: keys.SIGNOUT_INPROGRESS
    };
  }
  
  function signOutSuccess(): ISignOutSuccessAction {
    return {
      type: keys.SIGNOUT_SUCCESS
    };
  }
  
  function signOutFail(error: Error): ISignOutFailAction {
    return {
      payload: {
        error
      },
      type: keys.SIGNOUT_FAIL
    };
  }