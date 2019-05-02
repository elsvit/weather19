import {Action, Reducer} from 'redux';

import {LocationApiT} from '../location';

export const LOADING: 'LOADING' = 'LOADING';
export const LOADED: 'LOADED' = 'LOADED';
export const ERROR: 'ERROR' = 'ERROR';

export interface IBooleanObj { [actionType: string]: boolean }
export interface IStringObj { [actionType: string]: string }

export type ActionApiT = LocationApiT;

export interface ICommonState {
  error: IStringObj
  loaded: IBooleanObj
  loading: IBooleanObj
}

export type CommonStateT = Readonly<ICommonState>;

interface IActionTypePayload {
  readonly actionType: ActionApiT
}

interface IErrorPayload {
  readonly actionType: ActionApiT
  readonly message: string
}

interface ILoadingAction extends Action<typeof LOADING> {
  readonly payload: IActionTypePayload
}

interface ILoadedAction extends Action<typeof LOADED> {
  readonly payload: IActionTypePayload
}

interface IErrorAction extends Action<typeof ERROR> {
  readonly payload: IErrorPayload
}

type TCommonActions = ILoadingAction | ILoadedAction | IErrorAction;

const initialState: ICommonState = {
  error: {},
  loaded: {},
  loading: {},
};

const reducer: Reducer<ICommonState> = (state: ICommonState = initialState, {type, payload}) => {
  switch (type) {
    case LOADING:
      return {
        ...state,
        error: { ...state.error, [payload.actionType]: '' },
        loaded: { ...state.loaded, [payload.actionType]: false },
        loading: { ...state.loading, [payload.actionType]: true },
      };

    case LOADED:
      return {
        ...state,
        error: { ...state.error, [payload.actionType]: '' },
        loaded: { ...state.loaded, [payload.actionType]: true },
        loading: { ...state.loading, [payload.actionType]: false },
      };

    case ERROR:
      return {
        ...state,
        error: { ...state.error, [payload.actionType]: (payload as IErrorPayload).message },
        loaded: { ...state.loaded, [payload.actionType]: false },
        loading: { ...state.loading, [payload.actionType]: false },
      };

    default:
      return state;
  }
}

export default reducer;

export const setLoading = ({ actionType }: IActionTypePayload) => ({
  payload: {
    actionType,
  },
  type: LOADING,
});

export const setLoaded = ({ actionType }: IActionTypePayload) => ({
  payload: {
    actionType,
  },
  type: LOADED,
});

export const setError = ({ actionType, message }: IErrorPayload) => ({
  payload: {
    actionType,
    message,
  },
  type: ERROR,
});
