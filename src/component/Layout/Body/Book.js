import React, { useState, useEffect } from 'react';
import './Book.css';
import './Book_m.css';
import BookList from '../../Process/BookList/BookList';
import { SelectBoxCategory } from '../../Process/Common';
import { useSelector, useDispatch } from 'react-redux';
import { bookListPageRequestAction, bookListChangeCategoryAction } from '../../../../reducers/book';
import { useCookies } from 'react-cookie';
import jwt from 'jsonwebtoken';
import { secret } from '../../../../src/constant/constant';
import Router from 'next/router';

// [책 페이지]
const Book = () => {
    const [cookies] = useCookies(['TOKEN']);
    const dispatch = useDispatch();
    const book = useSelector(state => state.book);
    const [profile, setProfile] = useState({
        m_seq: 0,
        name: null,
        picture: null,
        account: null
    });

    useEffect(() => {
        const token = cookies.TOKEN;
        if(token && token !== "undefined") {
            jwt.verify(token, secret, function(error, decoded) {
                if (error) {
                    if(error.name === "TokenExpiredError") {
                        Router.push('/signin');
                    }
                } else {
                    setProfile({
                        m_seq: decoded.m_seq,
                        name: decoded.name,
                        picture: decoded.picture,
                        account: decoded.account
                    });
                }
            });
        } else {
            setProfile({
                m_seq: 0,
                name: null,
                picture: null,
                account: null,
            });
        }
    }, [cookies])

    useEffect(() => {
        const bc_seq = book.bookListCategory;
        const category = document.querySelector("#selectbox-category-book");
        const selected_item = category.querySelectorAll(".select-selected")[0];
        const selected_value = selected_item.getAttribute("value");
        const items = category.querySelectorAll(".select-items")[0];
        if(bc_seq == 0 && selected_value != null) {
            const item = items.children[0];
            item.click();
        }
    }, [book.bookListCategory])

    useEffect(() => {
        const category = document.querySelector("#selectbox-category-book");
        const selected_item = category.querySelectorAll(".select-selected")[0];
        const items = category.querySelectorAll(".select-items")[0];
        if(!items.classList.contains("select-hide")) {
            selected_item.click();
        }
    })

    // [이벤트] 셀렉트 박스 클릭(콜백 이벤트)
    const handleClickSelectBoxItems = (bc_seq) => {
        const data = {
            bc_seq: bc_seq
        }
        dispatch(bookListChangeCategoryAction(data));
    }

    // [이벤트] 페이지 이동
    const handleClickNextPage = (e) => {
        if(e) {
            e.preventDefault();
        }
        const params = {
            query: book.bookListQuery,
            bc_seq: book.bookListCategory,
            current_page: (book.bookListPages.current_page + 1),
            page_item_size: book.bookListPages.page_item_size
        }
        dispatch(bookListPageRequestAction(params));
    }

    const handleScroll = (e) => {
        const target = e.target;
        if( target.scrollHeight - target.scrollTop - target.clientHeight < 1 ) {
            if(book && book.bookListPages.is_next) {
                handleClickNextPage();
            }
        }
    }

    return (
        <div className="cb-book" onScroll={handleScroll}>
            <div className="max-wrapper">
                <div className="search-query">
                    <div className="query">
                        {
                            (() => {
                                const total = book.bookListPages.total;
                                if(book.bookListQuery) {
                                    return (
                                        "\"" + book.bookListQuery + "\""  + "검색결과(" + total + ")"
                                    );
                                } else {
                                    return (
                                        "전체(" + total + ")"
                                    );
                                }
                            })()
                        }
                    </div>
                    <SelectBoxCategory id="book" width="150px" margin="0 0 0 15px" callback={handleClickSelectBoxItems.bind(this)} />
                </div>
                { 
                    (() => {
                        if(book && book.bookListDatas) {
                            return (
                                <BookList bookList={book.bookListDatas} br_m_seq={profile.m_seq}/>
                            )
                        } else {
                            return (
                                <div style={{width: '100%'}}>
                                    {book.bookListError}
                                </div>
                            )
                        }
                    })()
                }
                {
                    // (() => {
                    //     if(book && book.bookListPages.is_next) {
                    //         return (
                    //             <div className="btn-more" onClick={handleClickNextPage.bind(this)}>NEXT</div>
                    //         )
                    //     }
                    // })()
                }
            </div>
        </div>
    )
}

export default Book;