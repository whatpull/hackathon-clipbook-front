import React from 'react';
import './BookRead.css';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import { bookReadOnRequestAction, bookReadOffRequestAction } from '../../../../reducers/bookReadOn';
import { useCookies } from 'react-cookie';
import jwt from 'jsonwebtoken';
import { secret } from '../../../../src/constant/constant';

// [읽은 책]
const BookRead = (props) => {
    const [cookies] = useCookies(['TOKEN']);
    const dispatch = useDispatch();

    // [이벤트] 리드 클릭
    const handleClickRead = (e) => {
        e.preventDefault();
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
                    if(props.isRead == 0) {
                        dispatch(bookReadOnRequestAction(params, token));
                    } else {
                        dispatch(bookReadOffRequestAction(params, token));
                    }
                }
            });
        } else {
            if(confirm("읽은 책으로 등록하기 위해서는 로그인이 필요합니다.\n로그인 페이지로 이동하시겠습니까?")){
                Router.push('/signin');
            }
        }
    }

    return (
        <div className={"cb-book-read" + (props.isRead == 1 ? " active" : "")} onClick={handleClickRead.bind(this)} style={{margin: props.margin}}>
            R
        </div>
    )
}

export default BookRead;