import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import { bookListRequestAction } from '../reducers/book';
import { BOOK_REGISTER_REQUEST, bookRegisterSuccessAction, bookRegisterFailureAction, bookInitSuccessAction, bookInitFailureAction, bookChangeOpenAction } from '../reducers/bookRegister';
import * as service from '../services/bookSvc';

// [AJAX] 책 등록
const bookRegister = (data, token) => {
    return service.bookRegister(data, token);
}

// [실행] 액션실행
function* bookRegisterAsync(action) {
    try {
        const result = yield call(bookRegister, action.data, action.token);
        const data = result.data;
        if(data.result === "success") {
            yield put(bookChangeOpenAction(false));
            yield put(bookListRequestAction());
            yield put(bookRegisterSuccessAction(data));
            yield put(bookInitSuccessAction());
        } else {
            yield put(bookRegisterFailureAction(data));
            yield put(bookInitFailureAction());
        }
    } catch(error) {
        yield put(bookRegisterFailureAction(error));
    }
}

// [중복실행 방지] 마지막 요청 실행
function* watchBookRegisterAsync() {
    yield takeLatest(BOOK_REGISTER_REQUEST, bookRegisterAsync);
}

// [비동기 실행] 추가 요소 기능(fork)
export default function* bookRegisterSaga() {
    yield all([
        fork(watchBookRegisterAsync)
    ]);
}