import React, { useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import './Navigation.css';
import { useSelector, useDispatch } from 'react-redux';
import { bookFavoriteListReuqestAction } from '../../../../reducers/bookFavorite';
import { useCookies } from 'react-cookie';
import jwt from 'jsonwebtoken';
import { secret } from '../../../../src/constant/constant';

// [네비게이션]
const Navigation = () => {
    const [cookies] = useCookies(['TOKEN']);
    const dispatch = useDispatch();
    const bookFavorite = useSelector(state => state.bookFavorite);

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
                        m_seq: decoded.m_seq
                    }
                }
            });
        }
        dispatch(bookFavoriteListReuqestAction(params));
    }, [cookies]);

    const thumbnail = (item) => {
        const domain = "https://clipbook-file.s3.ap-northeast-2.amazonaws.com"
        const name = item.thumbnail.name;
        const path = item.thumbnail.path;
        return domain + path.substring(path.indexOf('/'))+ "/" + name;
    }

    return (
        <div className="cb-nav">
            <div className="item">
                <div className="icon">
                    <i className="material-icons">
                        emoji_people
                    </i>
                </div>
            </div>
            <Link href="/">
                <a className="item active">
                    <div className="icon">
                        <img src="/img/icon-menu-books.png" />
                    </div>
                </a>
            </Link>
            <div className="item">
                <div className="icon only">
                    <i className="material-icons">
                        star
                    </i>
                </div>
            </div>
            {
                bookFavorite.bookFavoriteListDatas.map((item, index) => {
                    return (
                        <Link href="/book/[seq]" as={"/book/" + item.book.b_seq} key={index}>
                            <a className="item">
                                <div className="favorites" style={{backgroundImage: 'url('+thumbnail(item)+')'}}></div>
                            </a>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default Navigation;