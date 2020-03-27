import { all, call } from 'redux-saga/effects';
import signin from './signin';
import signup from './signup';
import signinSocial from './signinSocial';
import signupSocial from './signupSocial';
import book from './book';
import bookList from './bookList';
import bookRegister from './bookRegister';
import reviewList from './reviewList';
import reviewWrite from './reviewWrite';
import bookReadList from './bookReadList';
import bookReadOn from './bookReadOn';
import bookFavoriteList from './bookFavoriteList';
import bookFavoriteOn from './bookFavoriteOn';
import bookCategoryList from './bookCategoryList';
import profile from './profile';
import profileBookRegisteredList from './profileBookRegisteredList';
import profileReviewRegisteredList from './profileReviewRegisteredList';

export default function* rootSaga() {
    yield all([
        call(signin),
        call(signup),
        call(signinSocial),
        call(signupSocial),
        call(book),
        call(bookList),
        call(bookRegister),
        call(reviewList),
        call(reviewWrite),
        call(bookReadList),
        call(bookReadOn),
        call(bookFavoriteList),
        call(bookFavoriteOn),
        call(bookCategoryList),
        call(profile),
        call(profileBookRegisteredList),
        call(profileReviewRegisteredList)
    ]);
}