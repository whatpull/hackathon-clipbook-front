import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import { 
        BOOK_FAVORITE_ON_REQUEST, 
        bookFavoriteOnSuccessAction, 
        bookFavoriteOnFailureAction,
        BOOK_FAVORITE_OFF_REQUEST, 
        bookFavoriteOffSuccessAction, 
        bookFavoriteOffFailureAction  
    } from '../reducers/bookFavoriteOn';
import { bookFavoriteListReuqestAction } from '../reducers/bookFavorite'
import { bookRequestAction } from '../reducers/book';
import * as service from '../services/bookSvc';

//[ON]----------------------------------------------------------------------------
// [AJAX] 즐겨찾는 책 활성화
const bookFavoriteOn = (data, token) => {
    return service.bookFavoriteOn(data, token);
}

// [실행] 액션실행
function* bookFavoriteOnAsync(action) {
    try {
        const result = yield call(bookFavoriteOn, action.data, action.token);
        const data = result.data;
        if(data.result === 'success') {
            yield put(bookRequestAction({
                b_seq: action.data.b_seq,
                br_m_seq: action.data.m_seq,
                bf_m_seq: action.data.m_seq
            }));
            yield put(bookFavoriteListReuqestAction({
                m_seq: action.data.m_seq
            }));
            yield put(bookFavoriteOnSuccessAction(data));
        } else {
            yield put(bookFavoriteOnFailureAction(data));
        }
    } catch(error) {
        yield put(bookFavoriteOnFailureAction(error));
    }
}
// [중복실행 방지] 마지막 요청 실행
function* watchBookFavoriteOnAsync() {
    yield takeLatest(BOOK_FAVORITE_ON_REQUEST, bookFavoriteOnAsync)
}

//[OFF]----------------------------------------------------------------------------
// [AJAX] 즐겨찾는 책 비활성화
const bookFavoriteOff = (data, token) => {
    return service.bookFavoriteOff(data, token);
}

// [실행] 액션실행
function* bookFavoriteOffAsync(action) {
    try {
        const result = yield call(bookFavoriteOff, action.data, action.token);
        const data = result.data;
        if(data.result === 'success') {
            yield put(bookRequestAction({
                b_seq: action.data.b_seq,
                br_m_seq: action.data.m_seq,
                bf_m_seq: action.data.m_seq
            }));
            yield put(bookFavoriteListReuqestAction({
                m_seq: action.data.m_seq
            }));
            yield put(bookFavoriteOffSuccessAction(data));
        } else {
            yield put(bookFavoriteOffFailureAction(data));
        }
    } catch(error) {
        yield put(bookFavoriteOffFailureAction(error));
    }
}

// [중복실행 방지] 마지막 요청 실행
function* watchBookFavoriteOffAsync() {
    yield takeLatest(BOOK_FAVORITE_OFF_REQUEST, bookFavoriteOffAsync)
}

// [비동기 실행] 추가 요소 기능(fork)
export default function* bookFavoriteOffSaga() {
    yield all([
        fork(watchBookFavoriteOnAsync),
        fork(watchBookFavoriteOffAsync)
    ]);
}