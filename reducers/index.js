import { combineReducers } from 'redux';
import rating from './rating';
import signin from './signin';
import signup from './signup';
import book from './book';
import bookRegister from './bookRegister';
import review from './review';
import reviewWrite from './reviewWrite';
import bookRead from './bookRead';
import bookReadOn from './bookReadOn';
import bookFavorite from './bookFavorite';
import bookFavoriteOn from './bookFavoriteOn';
import bookCategory from './bookCategory';
import profile from './profile';

// [리듀서] 조합
const reducer = combineReducers({
    rating,
    signin,
    signup,
    book,
    bookRegister,
    review,
    reviewWrite,
    bookRead,
    bookReadOn,
    bookFavorite,
    bookFavoriteOn,
    bookCategory,
    profile
});

export default reducer;