import { fetchExample } from 'services/example.service';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

export function* fetchExampleText(action: ReturnType<typeof actions.getExampleText>) {
	const { exampleName } = action;
	const { text }: ExampleResponse = yield call(fetchExample, exampleName);
	yield put(actions.updateExample({ partialState: { text } }));
}

export function* watchUpdateExampleText() {
	yield takeEvery(actionTypes.TRIGGER_UPDATE_TEXT, fetchExampleText);
}

export default function* exampleSaga() {
	yield all([watchUpdateExampleText()]);
}