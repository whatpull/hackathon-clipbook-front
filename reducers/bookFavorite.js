// 초기값
export const initalState = {
    bookFavoriteListQuery: '',
    bookFavoriteListDatas: [],
    bookFavoriteListError: ''
}

// [액션] 타입
export const BOOK_FAVORITE_LIST_REQUEST = "BOOK_FAVORITE_LIST_REQUEST";
export const BOOK_FAVORITE_LIST_SUCCESS = "BOOK_FAVORITE_LIST_SUCCESS";
export const BOOK_FAVORITE_LIST_FAILURE = "BOOK_FAVORITE_LIST_FAILURE";

// [액션] 액션
export const bookFavoriteListReuqestAction = (data) => ({
    type: BOOK_FAVORITE_LIST_REQUEST,
    data: data
});
export const bookFavoriteListSuccessAction = (data) => ({
    type: BOOK_FAVORITE_LIST_SUCCESS,
    data: data
});
export const bookFavoriteListFailureAction = (data) => ({
    type: BOOK_FAVORITE_LIST_FAILURE,
    data: data
});

// [리듀서] 구현체
const reducer = (state = initalState, action) => {
    switch(action.type) {
        case BOOK_FAVORITE_LIST_REQUEST:
            const m_seq = typeof action.data === "undefined" ? '' : action.data.m_seq;
            return {...state, bookFavoriteListQuery: m_seq}
        case BOOK_FAVORITE_LIST_SUCCESS:
            const list_s_data = action.data;
            return {...state, bookFavoriteListDatas: list_s_data, bookFavoriteListError: ''}
        case BOOK_FAVORITE_LIST_FAILURE:
            const list_e_data = action.data;
            return {...state, bookFavoriteListDatas: [], bookFavoriteListError: list_e_data}
        default:
            return state
    }
}

export default reducer;