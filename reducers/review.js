// [상태] 초기값
export const initalState = {
    reviewListDatas: [],
    reviewListError: '',
    reviewListExistNext: false
};

// [액션] 타입
export const REVIEW_LIST_REQUEST = "REVIEW_LIST_REQUEST";
export const REVIEW_LIST_SUCCESS = "REVIEW_LIST_SUCCESS";
export const REVIEW_LIST_FAILURE = "REVIEW_LIST_FAILURE";

// [액션] 액션
export const reviewListRequestAction = (data) => ({
    type: REVIEW_LIST_REQUEST,
    data: data
});
export const reviewListSuccessAction = (data) => ({
    type: REVIEW_LIST_SUCCESS,
    data: data
});
export const reviewListFailureAction = (data) => ({
    type: REVIEW_LIST_FAILURE,
    data: data
});

// [리듀서] 구현체
const reducer = (state = initalState, action) => {
    switch(action.type) {
        case REVIEW_LIST_REQUEST:
            return {...state}
        case REVIEW_LIST_SUCCESS:
            const list_s_data = action.data;
            return {...state, reviewListDatas: list_s_data, reviewListError: ''}
        case REVIEW_LIST_FAILURE:
            const list_e_data = action.data;
            return {...state, reviewListDatas: [], reviewListError: list_e_data}
        default:
            return state
    }
}

export default reducer;