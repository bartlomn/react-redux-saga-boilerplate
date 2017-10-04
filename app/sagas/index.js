import { fork } from 'redux-saga/effects';

import appSagas from './appSagas';

export default function* root() {
  yield fork( appSagas );
}
