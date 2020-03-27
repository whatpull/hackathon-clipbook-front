import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import { BOOK_FAVORITE_LIST_REQUEST, bookFavoriteListSuccessAction, bookFavoriteListFailureAction } from '../reducers/bookFavorite';
import * as service from '../services/bookSvc';

// [AJAX] 즐겨찾는 책
const bookFavoriteList = (data) => {
    return service.bookFavoriteList(data);
}

// [실행] 액션실행
function* bookFavoriteListAsync(action) {
    try {
        const result = yield call(bookFavoriteList, action.data);
        const data = result.data;
        if(data.result === "success") {
            yield put(bookFavoriteListSuccessAction(data.data));
        } else {
            yield put(bookFavoriteListFailureAction(data));
        }
    } catch(error) {
        yield put(bookFavoriteListFailureAction(error));
    }
}

// [중복실행 방지] 마지막 요청 실행
function* watchBookFavoriteListAsync() {
    yield takeLatest(BOOK_FAVORITE_LIST_REQUEST, bookFavoriteListAsync)
}

// [비동기 실행] 추가 요소 기능(fork)
export default function* bookFavoriteListSaga() {
    yield all([
        fork(watchBookFavoriteListAsync)
    ]);
}