import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import { 
        BOOK_READ_ON_REQUEST, 
        bookReadOnSuccessAction, 
        bookReadOnFailureAction,
        BOOK_READ_OFF_REQUEST, 
        bookReadOffSuccessAction, 
        bookReadOffFailureAction  
    } from '../reducers/bookReadOn';
import { bookReadListRequestAction } from '../reducers/bookRead'
import { bookRequestAction } from '../reducers/book';
import * as service from '../services/bookSvc';

//[ON]----------------------------------------------------------------------------
// [AJAX] 읽은 책 활성화
const bookReadOn = (data, token) => {
    return service.bookReadOn(data, token)
}

// [실행] 액션실행
function* bookReadOnAsync(action) {
    try {
        const result = yield call(bookReadOn, action.data, action.token);
        const data = result.data;
        if(data.result === "success") {
            yield put(bookRequestAction({
                b_seq: action.data.b_seq,
                br_m_seq: action.data.m_seq,
                bf_m_seq: action.data.m_seq,
            }));
            yield put(bookReadListRequestAction({
                m_seq: action.data.m_seq
            }));
            yield put(bookReadOnSuccessAction(data));
        } else {
            yield put(bookReadOnFailureAction(data));
        }
    } catch (error) {
        yield put(bookReadOnFailureAction(error));
    }
}

// [중복실행 방지] 미자믹 요청 실행
function* watchBookReadOnAsync() {
    yield takeLatest(BOOK_READ_ON_REQUEST, bookReadOnAsync);
}

//[OFF]----------------------------------------------------------------------------
// [AJAX] 읽은 책 비활성화
const bookReadOff = (data, token) => {
    return service.bookReadOff(data, token)
}

// [실행] 액션실행
function* bookReadOffAsync(action) {
    try {
        const result = yield call(bookReadOff, action.data, action.token);
        const data = result.data;
        if(data.result === "success") {
            yield put(bookRequestAction({
                b_seq: action.data.b_seq,
                br_m_seq: action.data.m_seq,
                bf_m_seq: action.data.m_seq,
            }));
            yield put(bookReadOffSuccessAction(data));
        } else {
            yield put(bookReadOffFailureAction(data));
        }
    } catch (error) {
        yield put(bookReadOffFailureAction(error));
    }
}

// [중복실행 방지] 미자믹 요청 실행
function* watchBookReadOffAsync() {
    yield takeLatest(BOOK_READ_OFF_REQUEST, bookReadOffAsync);
}

// [비동기 실행] 추가 요소 기능(fork)
export default function* bookReadOnSaga() {
    yield all([
        fork(watchBookReadOnAsync),
        fork(watchBookReadOffAsync)
    ]);
}