import React, { useState, useEffect } from 'react';
import './Head.css';
import Link from 'next/link';
import Router from 'next/router';
import { ProfileTypeA } from '../../Process/Common';
import { useDispatch } from 'react-redux';
import { signoutRequestAction } from '../../../../reducers/signin';
import { bookInitSuccessAction } from '../../../../reducers/bookRegister';
import { useCookies } from 'react-cookie';
import jwt from 'jsonwebtoken';
import { secret } from '../../../../src/constant/constant';

// [헤더]
const Head = () => {
    const [cookies, removeCookie] = useCookies(['TOKEN']);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
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
    }, [cookies]);

    const handleClickMenu = (e) => {
        e.preventDefault();
        const token = cookies.TOKEN;
        if(token && token !== "undefined") {
            setIsOpen(!isOpen);
        } else {
            Router.push("/signin");
        }
    }

    const handleClickSignOut = (e) => {
        e.preventDefault();
        setIsOpen(false);
        dispatch(signoutRequestAction());
        dispatch(bookInitSuccessAction());  // 책 등록 초기화[성공 초기화 = 전체 초기화]
        removeCookie('TOKEN', 'undefined', { path: '/' });
        Router.push("/signin");
    }

    const handleClickProfile = (e) => {
        e.preventDefault();
        const token = cookies.TOKEN;
        if(token && token !== "undefined") {
            setIsOpen(false);
            Router.push("/profile/[seq]", "/profile/" + profile.m_seq);
        } else {
            Router.push("/signin");
        }
    }

    return (
        <div className="cb-header">
            <div className="max-wrapper">
                <Link href="/">
                    <a className="logo shadows">
                        <span>클</span>
                        <span>립</span>
                        <span>북</span>
                    </a>
                </Link>
                <div className="menu">
                    <div className="item" onClick={handleClickMenu}>
                        {
                            (() => {
                                if(profile.picture) {
                                    return (
                                        <img className="picture" src={profile.picture} />
                                    )
                                } else {
                                    return (
                                        <div className="icon">
                                            <img className="picture" src="/img/icon-user-man.png" style={{backgroundColor: "#f2f2f2"}}/>
                                        </div>
                                    )
                                }
                            })()
                        }
                    </div>
                </div>
                <div className={"menu-list" + (isOpen ? " open" : " close")}>
                    <div className="item" onClick={handleClickProfile}>
                        <ProfileTypeA picture={profile.picture} name={profile.name} account={profile.account} />
                    </div>
                    <div className="item" onClick={handleClickSignOut}>
                        {/* <i className="material-icons" style={{marginRight: "5px"}}>
                            power_settings_new
                        </i> */}
                        <img src="/img/icon-signout.png" />
                        <span>로그아웃</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Head;