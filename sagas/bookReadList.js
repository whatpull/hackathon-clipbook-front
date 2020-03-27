import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import { BOOK_READ_LIST_REQUEST, bookReadListSuccessAction, bookReadListFailureAction } from '../reducers/bookRead';
import * as service from '../services/bookSvc';

// [AJAX] 읽은 책
const bookReadList = (data) => {
    return service.bookReadList(data);
}

// [실행] 액션실행
function* bookReadListAsync(action) {
    try {
        const result = yield call(bookReadList, action.data);
        const data = result.data;
        if(data.result === "success") {
            yield put(bookReadListSuccessAction(data.data));
        } else {
            yield put(bookReadListFailureAction(data));
        }
    } catch(error) {
        yield put(bookReadListFailureAction(error));
    }
}

// [중복실행 방지] 마지막 요청 실행
function* watchBookReadListAsync() {
    yield takeLatest(BOOK_READ_LIST_REQUEST, bookReadListAsync);
}

// [비동기 실행] 추가 요소 기능(fork)
export default function* bookReadListSaga() {
    yield all([
        fork(watchBookReadListAsync)
    ]);
}