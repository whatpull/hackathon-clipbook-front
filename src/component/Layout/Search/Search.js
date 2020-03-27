import React, { useEffect, useRef } from 'react';
import './Search.css';
import BookRegister from '../../Process/Book/BookRegister';
import { useDispatch } from 'react-redux';
import { bookChangeOpenAction } from '../../../../reducers/bookRegister';
import { bookListChangeQueryAction } from '../../../../reducers/book';
import { useCookies } from 'react-cookie';

// [검색]
const Search = (props) => {
    const [cookies] = useCookies(['TOKEN']);
    const search = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const book_add = document.querySelector("#btn-book-add");
        const token = cookies.TOKEN;
        if(token && token !== "undefined") {
            book_add.style.display = "flex";
        } else {
            book_add.style.display = "none";
        }
    }, [cookies]);

    useEffect(() => {
        search.current.value = typeof props.query === "undefined" ? "" : props.query;
    });

    // [이벤트] 책 쓰기 오픈
    const handleClickBookRegisterOpen = (e) => {
        e.preventDefault();
        dispatch(bookChangeOpenAction(true));
    }

    // [이벤트] 키 다운
    const handleKeyUp = (e) => {
        var code = e.keyCode || e.which;
        if(code == 13) { 
            const query = e.target.value;
            const data = {
                query: query
            }
            dispatch(bookListChangeQueryAction(data));
        }
    }

    // [이벤트] 검색 클릭
    const handleClickSearch = (e) => {
        e.preventDefault();
        const query = search.current.value;
        const data = {
            query: query
        }
        dispatch(bookListChangeQueryAction(data));
    }

    return (
        <React.Fragment>
            <div className="cb-search">
                <div className="max-wrapper">
                    <div className="left">
                        <div id="btn-book-add" className="item" style={{backgroundColor: "#5D6DBE"}} onClick={handleClickBookRegisterOpen.bind(this)}>
                            <div className="text" style={{color: "#ffffff"}}>
                                ADD
                            </div>
                            <img src="/img/icon-book.png"/>
                        </div>
                    </div>
                    <div className="center">

                    </div>
                    <div className="right">
                        <div className="search-wrapper">
                            <input ref={search} type="text" className="search-input" onKeyUp={handleKeyUp} placeholder="검색"/>
                            <div className="search-icon" onClick={handleClickSearch.bind(this)}>
                                <i className="material-icons">
                                    search
                                </i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BookRegister />
        </React.Fragment>
    )
}

export default Search;