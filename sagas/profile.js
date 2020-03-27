import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import { PROFILE_REQUEST, profileSuccessAction, profileFailureAction } from '../reducers/profile';
import * as service from '../services/memberSvc';

// [AJAX] 프로필 조회
const profile = (data) => {
    return service.profile(data);
}

// [실행] 액션실행
function* profileAsync(action) {
    try {
        const result = yield call(profile, action.data);
        const data = result.data;
        if(data.result === "success") {
            yield put(profileSuccessAction(data.data));
        } else {
            yield put(profileFailureAction(data));
        }
    } catch(error) {
        yield put(profileFailureAction(error));
    }
}

// [중복실행 방지] 마지막 요청 실행
function* watchProfileAsync() {
    yield takeLatest(PROFILE_REQUEST, profileAsync);
}

// [비동기 실행] 추가 요소 기능(fork)
export default function* profileSaga() {
    yield all([
        fork(watchProfileAsync)
    ]);
}