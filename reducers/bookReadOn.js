// 초기값
export const initalState = {
    bookReadOnDatas: {},
    bookReadOnError: ''
}

// [액션] 타입
export const BOOK_READ_ON_REQUEST = "BOOK_READ_ON_REQUEST";
export const BOOK_READ_ON_SUCCESS = "BOOK_READ_ON_SUCCESS";
export const BOOK_READ_ON_FAILURE = "BOOK_READ_ON_FAILURE";
export const BOOK_READ_OFF_REQUEST = "BOOK_READ_OFF_REQUEST";
export const BOOK_READ_OFF_SUCCESS = "BOOK_READ_OFF_SUCCESS";
export const BOOK_READ_OFF_FAILURE = "BOOK_READ_OFF_FAILURE";

// [액션] 액션
export const bookReadOnRequestAction = (data, token) => ({
    type: BOOK_READ_ON_REQUEST,
    data: data,
    token: token
});
export const bookReadOnSuccessAction = (data) => ({
    type: BOOK_READ_ON_SUCCESS,
    data: data
});
export const bookReadOnFailureAction = (data) => ({
    type: BOOK_READ_ON_FAILURE,
    data: data
});
export const bookReadOffRequestAction = (data, token) => ({
    type: BOOK_READ_OFF_REQUEST,
    data: data,
    token: token
})
export const bookReadOffSuccessAction = (data) => ({
    type: BOOK_READ_OFF_SUCCESS,
    data: data
});
export const bookReadOffFailureAction = (data) => ({
    type: BOOK_READ_OFF_FAILURE,
    data: data
});

// [리듀서] 구현체
const reducer = (state = initalState, action) => {
    switch(action.type) {
        case BOOK_READ_ON_REQUEST:
            return {...state}
        case BOOK_READ_ON_SUCCESS:
            const on_s_data = action.data;
            return {...state, bookReadOnDatas: on_s_data, bookReadOnError: ''}
        case BOOK_READ_ON_FAILURE:
            const on_e_data = action.data;
            return {...state, bookReadOnDatas: {}, bookReadOnError: on_e_data}
        case BOOK_READ_OFF_REQUEST:
            return {...state}
        case BOOK_READ_OFF_SUCCESS:
            const off_s_data = action.data;
            return {...state, bookReadOnDatas: off_s_data, bookReadOnError: ''}
        case BOOK_READ_OFF_FAILURE:
            const off_e_data = action.data;
            return {...state, bookReadOnDatas: {}, bookReadOnError: off_e_data}
        default:
            return state;
    }
}

export default reducer;