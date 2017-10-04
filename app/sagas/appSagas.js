import { put, call, fork } from 'redux-saga/effects';

import { takeEvery, delay } from 'redux-saga';

import { ActionTypes } from './../constants';

export function* bootrapSequence() {
  try {
    yield call( delay, 3500 );
    yield put({ type: ActionTypes.BOOTSTRAP_SEQ_COMPLETE });
  } catch ( err ) {
    yield put({
      type: ActionTypes.CRITICAL_ERROR_OCCURED,
      payload: err,
    });
  }
}

export function* bootrapSequenceCompleted() {
  try {
    // eslint-disable-next-line no-console
    yield call( console.info, 'BOOTSRAP COMPLETED' );
  } catch ( err ) {
    yield put({
      type: ActionTypes.CRITICAL_ERROR_OCCURED,
      payload: err,
    });
  }
}

function* watchBootstrapStart() {
  yield* takeEvery( ActionTypes.BOOTSTRAP_SEQ_START, bootrapSequence );
}

function* watchBootstrapComplete() {
  yield* takeEvery( ActionTypes.BOOTSTRAP_SEQ_COMPLETE, bootrapSequenceCompleted );
}

export default function* appSagas() {
  yield fork( watchBootstrapStart );
  yield fork( watchBootstrapComplete );
}
