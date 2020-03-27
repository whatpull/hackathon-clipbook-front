// 초기값
export const initalState = {
    bookReadListQuery: '',
    bookReadListDatas: [],
    bookReadListError: '',
    bookReadListExistNext: false
}

// [액션] 타입
export const BOOK_READ_LIST_REQUEST = "BOOK_READ_LIST_REQUEST";
export const BOOK_READ_LIST_SUCCESS = "BOOK_READ_LIST_SUCCESS";
export const BOOK_READ_LIST_FAILURE = "BOOK_READ_LIST_FAILURE";

// [액션] 액션
export const bookReadListRequestAction = (data) => ({
    type: BOOK_READ_LIST_REQUEST,
    data: data
});
export const bookReadListSuccessAction = (data) => ({
    type: BOOK_READ_LIST_SUCCESS,
    data: data
});
export const bookReadListFailureAction = (data) => ({
    type: BOOK_READ_LIST_FAILURE,
    data: data
});

// [리듀서] 구현체
const reducer = (state = initalState, action) => {
    switch(action.type) {
        case BOOK_READ_LIST_REQUEST:
            const m_seq = typeof action.data === "undefined" ? '' : action.data.m_seq;
            return {...state, bookReadListQuery: m_seq}
        case BOOK_READ_LIST_SUCCESS:
            const list_s_data = action.data;
            return {...state, bookReadListDatas: list_s_data, bookReadListError: ''}
        case BOOK_READ_LIST_FAILURE:
            const list_e_data = action.data;
            return {...state, bookReadListDatas: [], bookReadListError: list_e_data}
        default:
            return state;
    }
}

export default reducer;