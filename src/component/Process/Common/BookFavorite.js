import React from 'react';
import './BookFavorite.css';
import { useDispatch } from 'react-redux';
import { bookFavoriteOnRequestAction, bookFavoriteOffRequestAction } from '../../../../reducers/bookFavoriteOn';
import { useCookies } from 'react-cookie';
import jwt from 'jsonwebtoken';
import { secret } from '../../../../src/constant/constant';
import Router from 'next/router';

// [즐겨찾는 책]
const BookFavorite = (props) => {
    const [cookies] = useCookies(['TOKEN']);
    const dispatch = useDispatch();

    const handleClickFavorite = (e) => {
        e.preventDefault()
        const token = cookies.TOKEN;
        if(token && token !== "undefined") {
            jwt.verify(token, secret, function(error, decoded) {
                if (error) {
                    if(error.name === "TokenExpiredError") {
                        Router.push('/signin');
                    }
                } else {
                    const params = {
                        b_seq: props.b_seq,
                        m_seq: decoded.m_seq
                    }
                    if(props.isFavorite == 0) {
                        dispatch(bookFavoriteOnRequestAction(params, token));
                    } else {
                        dispatch(bookFavoriteOffRequestAction(params, token));
                    }
                }
            });
        } else {
            if(confirm("즐겨찾는 책으로 등록하기 위해서는 로그인이 필요합니다.\n로그인 페이지로 이동하시겠습니까?")){
                Router.push('/signin');
            }
        }
    }

    return (
        <div className="cb-book-favorite" onClick={handleClickFavorite.bind(this)} style={{margin: props.margin}}>
            <i className="material-icons">
                {props.isFavorite == 1 ? "star" : "star_border"}
            </i>
        </div>
    )
}

export default BookFavorite;