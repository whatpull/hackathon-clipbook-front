import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import { BOOK_REQUEST, bookSuccessAction, bookFailureAction } from '../reducers/book';
import * as service from '../services/bookSvc';

// [AJAX] 책 조회
const book = (data) => {
    return service.book(data);
}

// [실행] 액션실행
function* bookAsync(action) {
    try {
        const result = yield call(book, action.data);
        const data = result.data;
        if(data.result === "success") {
            yield put(bookSuccessAction(data.data));
        } else {
            yield put(bookFailureAction(data));
        }
    } catch(error) {
        yield put(bookFailureAction(error));
    }
}

// [중복실행 방지] 마지막 요청 실행
function* watchBookAsync() {
    yield takeLatest(BOOK_REQUEST, bookAsync);
}

// [비동기 실행] 추가 요소 기능(fork)
export default function* bookSaga() {
    yield all([
        fork(watchBookAsync)
    ]);
}