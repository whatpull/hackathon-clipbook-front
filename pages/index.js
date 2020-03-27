import React, { useEffect } from 'react';
import { LayoutHead, LayoutNavigation, LayoutSearch } from '../src/component';
import { PageBook } from '../src/component';
import { bookListRequestAction, bookListResetParamsAction } from '../reducers/book';
import { bookCategoryListRequestAction } from '../reducers/bookCategory';
import { useSelector, useDispatch } from 'react-redux';

// [페이지] 책
const Book = () => {
    const dispatch = useDispatch();
    const book = useSelector(state => state.book);

    useEffect(() => {
        const query = book.bookListQuery;
        const bc_seq = book.bookListCategory;
        const data = {
            query: query,
            bc_seq: bc_seq,
            page_item_size: 20
        }
        dispatch(bookListRequestAction(data));
    }, [book.bookListQuery, book.bookListCategory])

    return (
        <React.Fragment>
            <LayoutHead />
            <LayoutNavigation />
            <LayoutSearch query={book.bookListQuery}/>
            <PageBook />
        </React.Fragment>
    )
}

Book.getInitialProps = async ctx => {
    ctx.store.dispatch(bookListResetParamsAction());
    ctx.store.dispatch(bookCategoryListRequestAction());
}
  
export default Book;