import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import { SIGNIN_SOICAL_REQUEST, signinSuccessAction, singinFailureAction } from '../reducers/signin';
import * as service from '../services/memberSvc';

// [AJAX] 소셜 로그인
const signinSocial = (data) => {
    return service.signinSocial(data);
}

// [실행] 액션실행
function* signinSocialAsync(action) {
    try {
        const result = yield call(signinSocial, action.data);
        const data = result.data;
        if(data.result === "success") {
            yield put(signinSuccessAction(data));
        } else {
            yield put(singinFailureAction(data));
        }
    } catch(error) {
        yield put(singinFailureAction(error));
    }
}

// [중복실행 방지] 마지막 요청 실행
function* watchSignSocialAsync() {
    yield takeLatest(SIGNIN_SOICAL_REQUEST, signinSocialAsync);
}

// [비동기 실행] 추가 요소 가능(fork)
export default function* signinSocialSaga() {
    yield all([
        fork(watchSignSocialAsync)
    ]);
}