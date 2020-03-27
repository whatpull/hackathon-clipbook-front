import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import { BOOK_REGISTERED_LIST_REQUEST, bookRegisteredListSuccessAction, bookRegisteredListFailureAction } from '../reducers/profile';
import * as service from '../services/bookSvc';

// [AJAX] 등록된 책 조회
const bookRegisteredList = (data) => {
    return service.bookList(data);
}

// [실행 액션실행] 
function* bookRegisteredListAsync(action) {
    try {
        const result = yield call(bookRegisteredList, action.data);
        const data = result.data;
        if(data.result === "success") {
            yield put(bookRegisteredListSuccessAction(data.data));
        } else {
            yield put(bookRegisteredListFailureAction(data));
        }
    } catch(error) {
        yield put(bookRegisteredListFailureAction(error));
    }
}

// [중복실행 방지] 마지막 요청 실행
function* watchBookRegisteredListAsync() {
    yield takeLatest(BOOK_REGISTERED_LIST_REQUEST, bookRegisteredListAsync);
}

// [비동기 실행] 추가 요소 기능(fork)
export default function* bookRegisteredListSaga() {
    yield all([
        fork(watchBookRegisteredListAsync)
    ]);
}