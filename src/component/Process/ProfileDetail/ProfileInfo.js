import React, { useEffect, useState } from 'react';
import './ProfileInfo.css';
import './ProfileInfo_m.css';
import { ProfileTypeA } from '../Common';
import { useCookies } from 'react-cookie';
import jwt from 'jsonwebtoken';
import { secret } from '../../../../src/constant/constant';
import Router from 'next/router';

// [프로필 정보]
const ProfileInfo = (props) => {
    const [cookies] = useCookies(['TOKEN']);
    const [profile, setProfile] = useState({
        m_seq: 0,
        name: null,
        picture: null,
        account: null
    });

    useEffect(() => {
        const profile = props.profile;
        if(profile) {
            setProfile({
                m_seq: 0,
                name: profile.name,
                picture: profile.picture,
                account: profile.account
            });
        } else {
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
        }
    }, [cookies, props.profile]);

    return (
        <div className="cb-profile-info">
            <ProfileTypeA m_seq={profile.m_seq} name={profile.name} picture={profile.picture} account={profile.account} disableLink={props.disableLink}/>
        </div>
    )
}

export default ProfileInfo;