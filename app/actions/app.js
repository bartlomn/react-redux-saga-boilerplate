import { ActionTypes } from './../constants';

export function boostrapSeqStart() {
  return {
    type: ActionTypes.BOOTSTRAP_SEQ_START,
  };
}

export function boostrapSeqComplete() {
  return {
    type: ActionTypes.BOOTSTRAP_SEQ_COMPLETE,
  };
}
