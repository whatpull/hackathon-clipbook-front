// [상태] 초기값
export const initialState = 0;

// [액션] 타입
export const RATING_CHOICE = 'RATING_CHOICE';

// [액션] 액션
export const ratingChoiceAction = (data) => ({
    type: RATING_CHOICE,
    data: data
});

// [리듀서] 구현체
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case RATING_CHOICE:
            return state = action.data;
        default:
            return state;
    }
};

export default reducer;

