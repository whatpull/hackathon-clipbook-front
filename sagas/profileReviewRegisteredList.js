import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import { REVIEW_REGISTERED_LIST_REQUEST, reviewRegisteredListSuccessAction, reviewRegisteredListFailureAction } from '../reducers/profile';
import * as service from '../services/reviewSvc';

// [AJAX] 리뷰 리스트 조회
const reviewRegisteredList = (data) => {
    return service.reviewList(data);
}

// [실행] 액션실행
function* reviewRegisteredListAsync(action) {
    try {
        const result = yield call(reviewRegisteredList, action.data);
        const data = result.data;
        if(data.result === "success") {
            yield put(reviewRegisteredListSuccessAction(data.data));
        } else {
            yield put(reviewRegisteredListFailureAction(data));
        }
    } catch(error) {
        yield put(reviewRegisteredListFailureAction(error));
    }
}

// [중복실행 방지] 마지막 요청 실행
function* watchReviewRegisteredListAsync() {
    yield takeLatest(REVIEW_REGISTERED_LIST_REQUEST, reviewRegisteredListAsync);
}

// [비동기 실행] 추가 요소 기능(fork)
export default function* reviewListSaga() {
    yield all([
        fork(watchReviewRegisteredListAsync)
    ]);
}