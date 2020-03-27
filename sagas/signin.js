import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import { SIGNIN_REQUEST, signinSuccessAction, singinFailureAction } from '../reducers/signin';
import * as service from '../services/memberSvc';

// [AJAX] 로그인
const signin = (data) => {
    return service.signin(data);
}

// [실행] 액션실행
function* singinAsync(action) {
    try {
        const result = yield call(signin, action.data);
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
function* watchSigninAsync() {
    yield takeLatest(SIGNIN_REQUEST, singinAsync);
}

// [비동기 실행] 추가 요소 가능(fork)
export default function* signinSaga() {
    yield all([
        fork(watchSigninAsync)
    ]);
}