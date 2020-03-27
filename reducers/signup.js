// 초기값
export const initalState = {
    signupDatas: {},
    signupError: '',
    signupCount: 0
}

// [액션] 타입
export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";
export const SIGNUP_SOCIAL_REQUEST = "SIGNUP_SOCIAL_REQUEST";

// [액션] 액션
export const signupRequestAction = (data) => ({
    type: SIGNUP_REQUEST,
    data: data
});
export const signupSuccessAction = (data) => ({
    type: SIGNUP_SUCCESS,
    data: data
});
export const signupFailureAction = (data) => ({
    type: SIGNUP_FAILURE,
    data: data
});
export const signupSocialRequestAction = (data) => ({
    type: SIGNUP_SOCIAL_REQUEST,
    data: data
});

// [리듀스] 구현체
const reducer = (state = initalState, action) => {
    switch(action.type) {
        case SIGNUP_REQUEST: 
            return {...state, signupCount: state.signupCount + 1, signupError: ''};
        case SIGNUP_SUCCESS:
            const s_data = action.data;
            return {...state, signupDatas: s_data, signupError: ''};
        case SIGNUP_FAILURE:
            const e_data = action.data;
            return {...state, signupDatas: {}, signupError: e_data};
        case SIGNUP_SOCIAL_REQUEST:
            return {...state, signupCount: state.signupCount + 1, signupError: ''};
        default:
            return state;
    }
}

export default reducer;