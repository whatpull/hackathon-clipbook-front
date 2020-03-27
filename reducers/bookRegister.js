// 초기값
export const initalState = {
    bookRegisterDatas: {},
    bookRegisterError: '',
    bookRegisterStep: 1,
    bookRegisterOpen: false,
    bookRegisterParams: {
        crop_thumbnail: '',
        thumbnail: '',
        thumbnail_name: '',
        bc_seq: 0,
        title: '',
        author: '',
        summary: ''
    }
}

// [액션] 타입
export const BOOK_CHANGE_STEP = "BOOK_CHANGE_STEP";
export const BOOK_CHANGE_OPEN = "BOOK_CHANGE_OPEN";
export const BOOK_CHANGE_PARAMS = "BOOK_CHANGE_PARAMS";
export const BOOK_REGISTER_REQUEST = "BOOK_REGISTER_REQUEST";
export const BOOK_REGISTER_SUCCESS = "BOOK_REGISTER_SUCCESS";
export const BOOK_REGISTER_FAILURE = "BOOK_REGISTER_FAILURE";
export const BOOK_INIT_SUCCESS = "BOOK_INIT_SUCCESS";
export const BOOK_INIT_FAILURE = "BOOK_INIT_FAILURE";

// [액션] 액션
export const bookChangeStepAction = (data) => ({
    type: BOOK_CHANGE_STEP,
    data: data
});
export const bookChangeOpenAction = (data) => ({
    type: BOOK_CHANGE_OPEN,
    data: data
});
export const bookChangeParamsAction = (data) => ({
    type: BOOK_CHANGE_PARAMS,
    data: data
});
export const bookRegisterRequestAction = (data, token) => ({
    type: BOOK_REGISTER_REQUEST,
    data: data,
    token: token
});
export const bookRegisterSuccessAction = (data) => ({
    type: BOOK_REGISTER_SUCCESS,
    data: data
});
export const bookRegisterFailureAction = (data) => ({
    type: BOOK_REGISTER_FAILURE,
    data: data
});
export const bookInitSuccessAction = () => ({
    type: BOOK_INIT_SUCCESS
});
export const bookInitFailureAction = () => ({
    type: BOOK_INIT_FAILURE
});

// [리듀서] 구현체
const reducer = (state = initalState, action) => {
    switch(action.type) {
        case BOOK_CHANGE_STEP:
            const step = typeof action.data === "undefined" ? 1 : action.data;
            return {...state, bookRegisterStep: step}
        case BOOK_CHANGE_OPEN:
            const open = typeof action.data === "undefined" ? false : action.data;
            return {...state, bookRegisterOpen: open}
        case BOOK_CHANGE_PARAMS:
            const crop_thumbnail = typeof action.data === "undefined" ? '' : (typeof action.data.crop_thumbnail === "undefined" ? '' : action.data.crop_thumbnail);
            const thumbnail = typeof action.data === "undefined" ? '' : (typeof action.data.thumbnail === "undefined" ? '' : action.data.thumbnail);
            const thumbnail_name = typeof action.data === "undefined" ? '' : (typeof action.data.thumbnail_name === "undefined" ? '' : action.data.thumbnail_name);
            const bc_seq = typeof action.data === "undefined" ? 0 : (typeof action.data.bc_seq === "undefined" ? 0 : action.data.bc_seq);
            const title = typeof action.data === "undefined" ? '' : (typeof action.data.title === "undefined" ? '' : action.data.title);
            const author = typeof action.data === "undefined" ? '' : (typeof action.data.author === "undefined" ? '' : action.data.author);
            const summary = typeof action.data === "undefined" ? '' : (typeof action.data.summary === "undefined" ? '' : action.data.summary);
            return {
                ...state, 
                bookRegisterParams: {
                    crop_thumbnail: crop_thumbnail === '' ? state.bookRegisterParams.crop_thumbnail : crop_thumbnail,
                    thumbnail: thumbnail === '' ? state.bookRegisterParams.thumbnail : thumbnail,
                    thumbnail_name: thumbnail_name === '' ? state.bookRegisterParams.thumbnail_name : thumbnail_name,
                    bc_seq: bc_seq === 0 ? state.bookRegisterParams.bc_seq : bc_seq,
                    title: title === '' ? state.bookRegisterParams.title : title,
                    author: author === '' ? state.bookRegisterParams.author : author,
                    summary: summary === '' ? state.bookRegisterParams.summary : summary
                }
            }
        case BOOK_REGISTER_REQUEST:
            return {...state}
        case BOOK_REGISTER_SUCCESS:
            const s_data = action.data;
            return {...state, bookRegisterDatas: s_data, bookRegisterError: ''}
        case BOOK_REGISTER_FAILURE:
            const e_data = action.data;
            return {...state, bookRegisterDatas: '', bookRegisterError: e_data}
        case BOOK_INIT_SUCCESS:
            return {
                ...state, 
                bookRegisterDatas: {},
                bookRegisterError: '',
                bookRegisterStep: 1,
                bookRegisterOpen: false,
                bookRegisterParams: {
                    crop_thumbnail: '',
                    thumbnail: '',
                    thumbnail_name: '',
                    bc_seq: 0,
                    title: '',
                    author: '',
                    summary: ''
                }
            }
        case BOOK_INIT_FAILURE:
            return {...state, bookRegisterError: ''}
        default:
            return state;
    }
}

export default reducer;