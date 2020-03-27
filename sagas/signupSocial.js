import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import { SIGNUP_SOCIAL_REQUEST, signupSuccessAction, signupFailureAction } from '../reducers/signup';
import * as service from '../services/memberSvc';

//[AJAX] 소셜 회원가입
const signupSocial = (data) => {
    return service.signupSocial(data);
}

// [실행] 액션실행
function* signupSocialAsync(action) {
    try {
        const result = yield call(signupSocial, action.data);
        const data = result.data;
        if(data.result === "success") {
            yield put(signupSuccessAction(data));
        } else {
            yield put(signupFailureAction(data));
        }
    } catch(error) {
        yield put(signupFailureAction(error));
    }
}

// [중복실행 방지] 마지막 요청 실행
function* watchSignupSocialAsync() {
    yield takeLatest(SIGNUP_SOCIAL_REQUEST, signupSocialAsync);
}

// [비동기 실행] 추가 요소 기능(fork)
export default function* signupSocialSaga() {
    yield all([
        fork(watchSignupSocialAsync)
    ]);
}