import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import { REVIEW_LIST_REQUEST, reviewListSuccessAction, reviewListFailureAction } from '../reducers/review';
import * as service from '../services/reviewSvc';

// [AJAX] 리뷰 리스트 조회
const reviewList = (data) => {
    return service.reviewList(data);
}

// [실행] 액션실행
function* reviewListAsync(action) {
    try {
        const result = yield call(reviewList, action.data);
        const data = result.data;
        if(data.result === "success") {
            yield put(reviewListSuccessAction(data.data));
        } else {
            yield put(reviewListFailureAction(data));
        }
    } catch(error) {
        yield put(reviewListFailureAction(error));
    }
}

// [중복실행 방지] 마지막 요청 실행
function* watchReviewListAsync() {
    yield takeLatest(REVIEW_LIST_REQUEST, reviewListAsync);
}

// [비동기 실행] 추가 요소 기능(fork)
export default function* reviewListSaga() {
    yield all([
        fork(watchReviewListAsync)
    ]);
}