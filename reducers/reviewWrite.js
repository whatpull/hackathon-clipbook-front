// [상태] 초기값
export const initalState = {
    reviewWriteDatas: {},
    reviewWriteError: '',
    reviewWriteCount: 0
}

// [액션] 타입
export const REVIEW_WRITE_REQUEST = "REVIEW_WRITE_REQUEST";
export const REVIEW_WRITE_SUCCESS = "REVIEW_WRITE_SUCCESS";
export const REVIEW_WRITE_FAILURE = "REVIEW_WRITE_FAILURE";
export const REVIEW_WRITE_INIT_SUCCESS = "REVIEW_WRITE_INIT_SUCCESS";
export const REVIEW_WRITE_INIT_FAILURE = "REVIEW_WRITE_INIT_FAILURE";

// [액션] 액션
export const reviewWriteRequestAction = (data, token) => ({
    type: REVIEW_WRITE_REQUEST,
    data: data,
    token: token
});
export const reviewWriteSuccessAction = (data) => ({
    type: REVIEW_WRITE_SUCCESS,
    data: data
});
export const reviewWriteFailureAction = (data) => ({
    type: REVIEW_WRITE_FAILURE,
    data: data
});
export const reviewWriteInitSuccessAction = () => ({
    type: REVIEW_WRITE_INIT_SUCCESS
});
export const reviewWriteInitFailureAction = () => ({
    type: REVIEW_WRITE_INIT_FAILURE
});

// [리듀서] 구현체
const reducer = (state = initalState, action) => {
    switch(action.type) {
        case REVIEW_WRITE_REQUEST:
            return {...state, reviewWriteCount: state.reviewWriteCount + 1}
        case REVIEW_WRITE_SUCCESS:
            const s_data = action.data;
            return {...state, reviewWriteDatas: s_data, reviewWriteError: ''}
        case REVIEW_WRITE_FAILURE:
            const e_data = action.data;
            return {...state, reviewWriteDatas: '', reviewWriteError: e_data}
        case REVIEW_WRITE_INIT_SUCCESS:
            return {
                ...state, 
                reviewWriteDatas: {},
                reviewWriteError: '',
                reviewWriteCount: 0
            }
        case REVIEW_WRITE_INIT_FAILURE:
            return {...state, reviewWriteError: ''}
        default:
            return state
    }
}

export default reducer;