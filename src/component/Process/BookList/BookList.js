import React from 'react';
import './BookList.css';
import { BookItem } from '../Common';

// [책 리스트]
const BookList = (props) => {
    return (
        <div className="cb-booklist">
            {
                props.bookList.map((item, index) => {
                    return (
                        <BookItem item={item} key={index} margin={"0 30px 30px 0"} />
                    )
                })
            }
        </div>
    )
}

export default BookList;