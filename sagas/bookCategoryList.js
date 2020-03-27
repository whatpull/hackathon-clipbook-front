import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import { BOOK_CATEGORY_LIST_REQUEST, bookCategoryListSuccessAction, bookCategoryListFailureAction } from '../reducers/bookCategory';
import * as service from '../services/categorySvc';

// [AJAX] 책 카테고리 리스트 조회
const bookCategoryList = () => {
    return service.bookCategoryList();
}

// [실행] 액션실행
function* bookCategoryListAsync(action) {
    try {
        const result = yield call(bookCategoryList);
        const data = result.data;
        if(data.result === "success") {
            yield put(bookCategoryListSuccessAction(data.data));
        } else {
            yield put(bookCategoryListFailureAction(data));
        }
    } catch(error) {
        yield put(bookCategoryListFailureAction(error));
    }
}

// [중복실행 방지] 마지막 요청 실행
function* watchBookCategoryListAsync() {
    yield takeLatest(BOOK_CATEGORY_LIST_REQUEST, bookCategoryListAsync);
}

// [비동기 실행] 추가 요소 기능(fork)
export default function* bookCategoryListSaga() {
    yield all([
        fork(watchBookCategoryListAsync)
    ]);
}