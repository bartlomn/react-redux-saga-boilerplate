import { createReducer } from './../utils/helpers';
import { ActionTypes } from './../constants/index';

export const appState = {
  bootstrapped: false,
  bootstrap_seq_started: false,
};

export default {
  app: createReducer( appState, {
    [ActionTypes.BOOTSTRAP_SEQ_START]( state/* , action */ ) {
      const newState = {
        ...state,
        bootstrap_seq_started: true,
      };

      return newState;
    },
    [ActionTypes.BOOTSTRAP_SEQ_COMPLETE]( state ) {
      const newState = {
        ...state,
        bootstrapped: true,
      };

      return newState;
    },
  }),
};
