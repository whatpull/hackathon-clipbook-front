import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import { BOOK_LIST_REQUEST, bookListSuccessAction, bookListFailureAction, BOOK_LIST_PAGE_REQUEST, bookListPageSuccessAction, bookListPageFailureAction } from '../reducers/book';
import * as service from '../services/bookSvc';

// [AJAX] 책 리스트 조회
const bookList = (data) => {
    return service.bookList(data);
}

// [실행] 액션실행
function* bookListAsync(action) {
    try {
        const result = yield call(bookList, action.data);
        const data = result.data;
        if(data.result === "success") {
            yield put(bookListSuccessAction(data));
        } else {
            yield put(bookListFailureAction(data));
        }
    } catch(error) {
        yield put(bookListFailureAction(error));
    }
}

// [중복실행 방지] 마지막 요청 실행
function* watchBookListAsync() {
    yield takeLatest(BOOK_LIST_REQUEST, bookListAsync);
}

// [페이지] --------------------------------------------------------------
// [실행] 액션실행
function* bookListPageAsync(action) {
    try {
        const result = yield call(bookList, action.data);
        const data = result.data;
        if(data.result === "success") {
            yield put(bookListPageSuccessAction(data));
        } else {
            yield put(bookListPageFailureAction(data));
        }
    } catch(error) {
        yield put(bookListPageFailureAction(error));
    }
}

// [중복실행 방지] 마지막 요청 실행
function* watchBookListPageAsync() {
    yield takeLatest(BOOK_LIST_PAGE_REQUEST, bookListPageAsync);
}

// [비동기 실행] 추가 요소 기능(fork)
export default function* bookListSaga() {
    yield all([
        fork(watchBookListAsync),
        fork(watchBookListPageAsync)
    ]);
}