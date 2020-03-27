import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import { SIGNUP_REQUEST, signupSuccessAction, signupFailureAction } from '../reducers/signup';
import * as service from '../services/memberSvc';

// [AJAX] 회원가입
const signup = (data) => {
    return service.signup(data);
}

// [실행] 액션실행
function* signupAsync(action) {
    try {
        const result = yield call(signup, action.data);
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
function* watchSignupAsync() {
    yield takeLatest(SIGNUP_REQUEST, signupAsync);
}

// [비동기 실행] 추가 요소 가능(fork)
export default function* signupSaga() {
    yield all([
        fork(watchSignupAsync)
    ]);
}
