import React, { useEffect } from 'react';
import { LayoutHead, LayoutNavigation, LayoutSearch } from '../../src/component';
import { PageBookDetail } from '../../src/component';
import { ratingChoiceAction } from '../../reducers/rating';
import { bookRequestAction } from '../../reducers/book';
import { reviewListRequestAction } from '../../reducers/review';
import { bookCategoryListRequestAction } from '../../reducers/bookCategory';
import { useDispatch } from 'react-redux';
import cookies from 'cookie';
import { useCookies } from 'react-cookie';
import jwt from 'jsonwebtoken';
import { secret } from '../../src/constant/constant';
import Router from 'next/router';

// [페이지] 책 상세
const BookDetail = ({ b_seq }) => {
    const [cookies] = useCookies(['TOKEN']);
    const dispatch = useDispatch();
    
    useEffect(() => {
        const token = cookies.TOKEN;
        let params = {};
        if(token && token !== "undefined") {
            jwt.verify(token, secret, function(error, decoded) {
                if (error) {
                    if(error.name === "TokenExpiredError") {
                        Router.push('/signin');
                    }
                } else {
                    params = { 
                        b_seq: b_seq, 
                        br_m_seq: decoded.m_seq,
                        bf_m_seq: decoded.m_seq
                    };
                }
            });
        } else {
            params = { b_seq: b_seq };
        }
        dispatch(bookRequestAction(params));
    }, [cookies, b_seq]);

    return (
        <React.Fragment>
            <LayoutHead />
            <LayoutNavigation />
            <LayoutSearch />
            <PageBookDetail b_seq={b_seq} />
        </React.Fragment>
    )
}

// [SSR 페이지 초기화]
BookDetail.getInitialProps = async (ctx) => {
    const b_seq = ctx.query.seq;
    if(ctx.isServer && ctx.req.headers.cookie) {
        const token = cookies.parse(ctx.req.headers.cookie).TOKEN;
        let params = {};
        if(token && token !== "undefined") {
            jwt.verify(token, secret, function(error, decoded) {
                if (error) {
                    if(error.name === "TokenExpiredError") {
                        Router.push('/signin');
                    }
                } else {
                    params = { 
                        b_seq: b_seq, 
                        br_m_seq: decoded.m_seq,
                        bf_m_seq: decoded.m_seq
                    };
                }
            });
        } else {
            params = { b_seq: b_seq };
        }
        ctx.store.dispatch(bookRequestAction(params));
    }
    ctx.store.dispatch(reviewListRequestAction({ b_seq: b_seq }));
    ctx.store.dispatch(ratingChoiceAction(0));
    ctx.store.dispatch(bookCategoryListRequestAction());
    return { 
        b_seq: b_seq
    }
}
  
export default BookDetail;