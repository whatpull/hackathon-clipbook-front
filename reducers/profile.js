// 초기값
export const initalState = {
    profileDatas: {},
    profileError: '',
    bookRegisteredListDatas: [],
    bookRegisteredListError: '',
    bookRegisteredListExistNext: false,
    reviewRegisteredListDatas: [],
    reviewRegisteredListError: '',
    reviewRegisteredListExistNext: false,
}

// [액션] 타입
export const PROFILE_REQUEST = "PROFILE_REQUEST";
export const PROFILE_SUCCESS = "PROFILE_SUCCESS";
export const PROFILE_FAILURE = "PROFILE_FAILURE";
export const BOOK_REGISTERED_LIST_REQUEST = "BOOK_REGISTERED_LIST_REQUEST";
export const BOOK_REGISTERED_LIST_SUCCESS = "BOOK_REGISTERED_LIST_SUCCESS";
export const BOOK_REGISTERED_LIST_FAILURE = "BOOK_REGISTERED_LIST_FAILURE";
export const REVIEW_REGISTERED_LIST_REQUEST = "REVIEW_REGISTERED_LIST_REQUEST";
export const REVIEW_REGISTERED_LIST_SUCCESS = "REVIEW_REGISTERED_LIST_SUCCESS";
export const REVIEW_REGISTERED_LIST_FAILURE = "REVIEW_REGISTERED_LIST_FAILURE";

// [액션] 액션
export const profileRequestAction = (data) => ({
    type: PROFILE_REQUEST,
    data: data
});
export const profileSuccessAction = (data) => ({
    type: PROFILE_SUCCESS,
    data: data
});
export const profileFailureAction = (data) => ({
    type: PROFILE_FAILURE,
    data: data
});
export const bookRegisteredListRequestAction = (data) => ({
    type: BOOK_REGISTERED_LIST_REQUEST,
    data: data
});
export const bookRegisteredListSuccessAction = (data) => ({
    type: BOOK_REGISTERED_LIST_SUCCESS,
    data: data
});
export const bookRegisteredListFailureAction = (data) => ({
    type: BOOK_REGISTERED_LIST_FAILURE,
    data: data
});
export const reviewRegisteredListRequestAction = (data) => ({
    type: REVIEW_REGISTERED_LIST_REQUEST,
    data: data
});
export const reviewRegisteredListSuccessAction = (data) => ({
    type: REVIEW_REGISTERED_LIST_SUCCESS,
    data: data
});
export const reviewRegisteredListFailureAction = (data) => ({
    type: REVIEW_REGISTERED_LIST_FAILURE,
    data: data
});

// [리듀서] 구현체
const reducer = (state = initalState, action) => {
    switch(action.type) {
        case PROFILE_REQUEST:
            return {...state}
        case PROFILE_SUCCESS:
            const profile_s_data = action.data;
            return {...state, profileDatas: profile_s_data, profileError: ''}
        case PROFILE_FAILURE:
            const profile_e_data = action.data;
            return {...state, profileDatas: {}, profileError: profile_e_data}
        case BOOK_REGISTERED_LIST_REQUEST:
            return {...state}
        case BOOK_REGISTERED_LIST_SUCCESS:
            const list_s_data = action.data;
            return {...state, bookRegisteredListDatas: list_s_data, bookRegisteredListError: ''}
        case BOOK_REGISTERED_LIST_FAILURE:
            const list_e_data = action.data;
            return {...state, bookRegisteredListDatas: [], bookRegisteredListError: list_e_data}
        case REVIEW_REGISTERED_LIST_REQUEST:
            return {...state}
        case REVIEW_REGISTERED_LIST_SUCCESS:
            const review_list_s_data = action.data;
            return {...state, reviewRegisteredListDatas: review_list_s_data, reviewRegisteredListError: ''}
        case REVIEW_REGISTERED_LIST_FAILURE:
            const review_list_e_data = action.data;
            return {...state, reviewRegisteredListDatas: [], reviewRegisteredListError: review_list_e_data}
        default:
            return state
    }
}

export default reducer;