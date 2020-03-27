// 초기값
export const initalState = {
    signinDatas: {},
    signinError: '',
    signinCount: 0
}

// [액션] 타입
export const SIGNIN_REQUEST = "SIGNIN_REQUEST";
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE';
export const SIGNOUT_REQUEST = "SIGNOUT_REQUEST";
export const SIGNIN_SOICAL_REQUEST = "SIGNIN_SOICAL_REQUEST";

// [액션] 액션
export const signinRequestAction = (data) => ({
    type: SIGNIN_REQUEST,
    data: data
});
export const signinSuccessAction = (data) => ({
    type: SIGNIN_SUCCESS,
    data: data
});
export const singinFailureAction = (data) => ({
    type: SIGNIN_FAILURE,
    data: data
});
export const signoutRequestAction = () => ({
    type: SIGNOUT_REQUEST
});
export const signinSocialRequestAction = (data) => ({
    type: SIGNIN_SOICAL_REQUEST,
    data: data
});

// [리듀서] 구현체
const reducer = (state = initalState, action) => {
    switch(action.type) {
        case SIGNIN_REQUEST:
            return {...state, signinCount: state.signinCount + 1, signinError: ''};
        case SIGNIN_SUCCESS: 
            const s_data = action.data;
            return {...state, signinDatas: s_data, signinError: ''};
        case SIGNIN_FAILURE:
            const e_data = action.data;
            return {...state, signinDatas: {}, signinError: e_data};
        case SIGNOUT_REQUEST:
            return {...state, signinDatas: {}, signinError: ''};
        case SIGNIN_SOICAL_REQUEST:
            return {...state, signinCount: state.signinCount + 1, signinError: ''};
        default:
            return state;
    }
}

export default reducer;