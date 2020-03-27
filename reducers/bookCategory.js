// 초기값
export const initalState = {
    bookCategoryListDatas: [],
    bookCategoryListError: ''
}

// [액션] 타입
export const BOOK_CATEGORY_LIST_REQUEST = "BOOK_CATEGORY_LIST_REQUEST";
export const BOOK_CATEGORY_LIST_SUCCESS = "BOOK_CATEGORY_LIST_SUCCESS";
export const BOOK_CATEGORY_LIST_FAILURE = "BOOK_CATEGORY_LIST_FAILURE";

// [액션] 액션
export const bookCategoryListRequestAction = () => ({
    type: BOOK_CATEGORY_LIST_REQUEST
});
export const bookCategoryListSuccessAction = (data) => ({
    type: BOOK_CATEGORY_LIST_SUCCESS,
    data: data
});
export const bookCategoryListFailureAction = (data) => ({
    type: BOOK_CATEGORY_LIST_FAILURE,
    data: data
});

// [리듀서] 구현체
const reducer = (state = initalState, action) => {
    switch(action.type) {
        case BOOK_CATEGORY_LIST_REQUEST:
            return {...state}
        case BOOK_CATEGORY_LIST_SUCCESS:
            const list_s_data = action.data;
            return {...state, bookCategoryListDatas: list_s_data, bookCategoryListError: ''}
        case BOOK_CATEGORY_LIST_FAILURE:
            const list_e_data = action.data;
            return {...state, bookCategoryListDatas: [], bookCategoryListError: list_e_data}
        default:
            return state;
    }
}

export default reducer;
