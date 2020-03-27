// 초기값
export const initalState = {
    bookListQuery: '',
    bookListCategory: 0,
    bookListDatas: [],
    bookListPages: {
        current_page: 1,
        page_item_size: 10,
        is_next: false,
        total: 0
    },
    bookListError: '',
    bookQuery: '',
    bookDatas: [],
    bookError: ''
}

// [액션] 타입
export const BOOK_LIST_RESET_PARAMS = "BOOK_LIST_RESET_PARAMS";
export const BOOK_LIST_CHANGE_QUERY = "BOOK_LIST_CHANGE_QUERY";
export const BOOK_LIST_CHANGE_CATEGORY = "BOOK_LIST_CHANGE_CATEGORY";
export const BOOK_LIST_REQUEST = "BOOK_LIST_REQUEST";
export const BOOK_LIST_SUCCESS = "BOOK_LIST_SUCCESS";
export const BOOK_LIST_FAILURE = "BOOK_LIST_FAILURE";
export const BOOK_LIST_PAGE_REQUEST = "BOOK_LIST_PAGE_REQUEST";
export const BOOK_LIST_PAGE_SUCCESS = "BOOK_LIST_PAGE_SUCCESS";
export const BOOK_LIST_PAGE_FAILURE = "BOOK_LIST_PAGE_FAILURE";
export const BOOK_SUCCESS = "BOOK_SUCCESS";
export const BOOK_FAILURE = "BOOK_FAILURE";
export const BOOK_REQUEST = "BOOK_REQUEST";

// [액션] 액션
export const bookListResetParamsAction = () => ({
    type: BOOK_LIST_RESET_PARAMS
});
export const bookListChangeQueryAction = (data) => ({
    type: BOOK_LIST_CHANGE_QUERY,
    data: data
});
export const bookListChangeCategoryAction = (data) => ({
    type: BOOK_LIST_CHANGE_CATEGORY,
    data: data
});
export const bookListRequestAction = (data) => ({
    type: BOOK_LIST_REQUEST,
    data: data
});
export const bookListSuccessAction = (data) => ({
    type: BOOK_LIST_SUCCESS,
    data: data
});
export const bookListFailureAction = (data) => ({
    type: BOOK_LIST_FAILURE,
    data: data
});
export const bookListPageRequestAction = (data) => ({
    type: BOOK_LIST_PAGE_REQUEST,
    data: data
});
export const bookListPageSuccessAction = (data) => ({
    type: BOOK_LIST_PAGE_SUCCESS,
    data: data
});
export const bookListPageFailureAction = (data) => ({
    type: BOOK_LIST_PAGE_FAILURE,
    data: data
});
export const bookSuccessAction = (data) => ({
    type: BOOK_SUCCESS,
    data: data
});
export const bookFailureAction = (data) => ({
    type: BOOK_FAILURE,
    data: data
});
export const bookRequestAction = (data) => ({
    type: BOOK_REQUEST,
    data: data
});

// [리듀서] 구현체
const reducer = (state = initalState, action) => {
    switch(action.type) {
        case BOOK_LIST_RESET_PARAMS:
            return {...state, bookListQuery: '', bookListCategory: 0}
        case BOOK_LIST_CHANGE_QUERY:
            const only_query = typeof action.data === "undefined" ? '' : action.data.query;
            return {...state, bookListQuery: only_query}
        case BOOK_LIST_CHANGE_CATEGORY:
            const only_bc_seq = typeof action.data === "undefined" ? 0 : action.data.bc_seq;
            return {...state, bookListCategory: only_bc_seq}
        case BOOK_LIST_REQUEST:
            return {...state}
        case BOOK_LIST_SUCCESS:
            const list_s_data = action.data;
            const list_s_page = list_s_data.page;
            return {...state, bookListDatas: list_s_data.data, bookListPages: list_s_page, bookListError: ''}
        case BOOK_LIST_FAILURE:
            const lsit_e_data = action.data;
            return {...state, bookListDatas: [], bookListPage: {
                current_page: 1,
                page_item_size: 10,
                is_next: false,
                total: 0
            }, bookListError: lsit_e_data}
        case BOOK_LIST_PAGE_REQUEST:
            const p_query = typeof action.data === "undefined" ? '' : action.data.query;
            const p_bc_seq = typeof action.data === "undefined" ? 0 : action.data.bc_seq;
            return {...state, bookListQuery: p_query, bookListCategory: p_bc_seq}
        case BOOK_LIST_PAGE_SUCCESS:
            const list_p_s_data = action.data;
            const list_p_s_page = list_p_s_data.page;
            const list_p_s_concat = state.bookListDatas.concat(list_p_s_data.data);
            return {...state, bookListDatas: list_p_s_concat, bookListPages: list_p_s_page, bookListError: ''}
        case BOOK_LIST_PAGE_FAILURE:
            const lsit_p_e_data = action.data;
            return {...state, bookListDatas: [], bookListPage: {
                current_page: 1,
                page_item_size: 10,
                is_next: false,
                total: 0
            }, bookListError: lsit_p_e_data}
        case BOOK_REQUEST:
            const b_seq = typeof action.data === "undefined" ? 0 : action.data.b_seq;
            return {...state, bookQuery: b_seq}
        case BOOK_SUCCESS:
            const s_data = action.data;
            return {...state, bookDatas: s_data, bookError: ''}
        case BOOK_FAILURE:
            const e_data = action.data;
            return {...state, bookDatas: [], bookError: e_data}
        default:
            return state;
    }
}

export default reducer;