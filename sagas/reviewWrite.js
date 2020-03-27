import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import { REVIEW_WRITE_REQUEST, reviewWriteSuccessAction, reviewWriteFailureAction, reviewWriteInitSuccessAction, reviewWriteInitFailureAction } from '../reducers/reviewWrite';
import { reviewListRequestAction } from '../reducers/review';
import { bookRequestAction } from '../reducers/book';
import * as service from '../services/reviewSvc';

// [AJAX] 리뷰 등록
const reviewWrite = (data, token) => {
    return service.reviewWrite(data, token);
}

// [실행] 액션실행
function* reviewWriteAsync(action) {
    try {
        const result = yield call(reviewWrite, action.data, action.token);
        const data = result.data;
        if(data.result === "success") {
            const params = {b_seq: action.data.b_seq};
            yield put(reviewListRequestAction(params));
            yield put(bookRequestAction(params));
            yield put(reviewWriteSuccessAction(data));
            yield put(reviewWriteInitSuccessAction());
        } else {
            yield put(reviewWriteFailureAction(data));
            yield put(reviewWriteInitFailureAction());
        }
    } catch(error) {
        yield put(reviewWriteFailureAction(error));
        yield put(reviewWriteInitFailureAction());
    }
}

// [중복실행 방지] 마지막 요청 실행
function* watchReviewWriteAsync() {
    yield takeLatest(REVIEW_WRITE_REQUEST, reviewWriteAsync);
}

// [비동기 실행] 추가 요소 기능(fork)
export default function* reviewWriteSaga() {
    yield all([
        fork(watchReviewWriteAsync)
    ]);
}