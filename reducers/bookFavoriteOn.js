// 초기값
export const initalState = {
    bookFavoriteOnDatas: {},
    bookFavoriteOnError: ''
}

// [액션] 타입
export const BOOK_FAVORITE_ON_REQUEST = "BOOK_FAVORITE_ON_REQUEST";
export const BOOK_FAVORITE_ON_SUCCESS = "BOOK_FAVORITE_ON_SUCCESS";
export const BOOK_FAVORITE_ON_FAILURE = "BOOK_FAVORITE_ON_FAILURE";
export const BOOK_FAVORITE_OFF_REQUEST = "BOOK_FAVORITE_OFF_REQUEST";
export const BOOK_FAVORITE_OFF_SUCCESS = "BOOK_FAVORITE_OFF_SUCCESS";
export const BOOK_FAVORITE_OFF_FAILURE = "BOOK_FAVORITE_OFF_FAILURE";

// [액션] 액션
export const bookFavoriteOnRequestAction = (data, token) => ({
    type: BOOK_FAVORITE_ON_REQUEST,
    data: data,
    token: token
});
export const bookFavoriteOnSuccessAction = (data) => ({
    type: BOOK_FAVORITE_ON_SUCCESS,
    data: data
});
export const bookFavoriteOnFailureAction = (data) => ({
    type: BOOK_FAVORITE_ON_FAILURE,
    data: data
});
export const bookFavoriteOffRequestAction = (data, token) => ({
    type: BOOK_FAVORITE_OFF_REQUEST,
    data: data,
    token: token
});
export const bookFavoriteOffSuccessAction = (data) => ({
    type: BOOK_FAVORITE_OFF_SUCCESS,
    data: data
});
export const bookFavoriteOffFailureAction = (data) => ({
    type: BOOK_FAVORITE_OFF_FAILURE,
    data: data
});

// [리듀서] 구현체
const reducer = (state = initalState, action) => {
    switch(action.type) {
        case BOOK_FAVORITE_ON_REQUEST:
            return {...state}
        case BOOK_FAVORITE_ON_SUCCESS:
            const on_s_data = action.data;
            return {...state, bookFavoriteOnDatas: on_s_data, bookFavoriteOnError: ''}
        case BOOK_FAVORITE_ON_FAILURE:
            const on_e_data = action.data;
            return {...state, bookFavoriteOnDatas: {}, bookFavoriteOnError: on_e_data}
        case BOOK_FAVORITE_OFF_REQUEST:
            return {...state}
        case BOOK_FAVORITE_OFF_SUCCESS:
            const off_s_data = action.data;
            return {...state, bookFavoriteOnDatas: off_s_data, bookFavoriteOnError: ''}
        case BOOK_FAVORITE_OFF_FAILURE:
            const off_e_data = action.data;
            return {...state, bookFavoriteOnDatas: {}, bookFavoriteOnError: off_e_data}
        default:
            return state
    }
}

export default reducer;