import React from 'react';
import './ProfileTypeA.css';
import Router from 'next/router';

// [공통 - 프로필 A 타입]
const ProfileTypeA = (props) => {

    // [이벤트] 프로필 클릭
    const handleClick = (e) => {
        e.preventDefault();
        const m_seq = parseInt(props.m_seq);
        if(m_seq > 0) {
            Router.push('/profile/[seq]', '/profile/' + m_seq);
        }
    }

    return (
        <div className={"cb-profile type-a" + (props.align == "center" ? "center" : "")  + (props.disableLink ? " cursor-auto" : "")} onClick={handleClick.bind(this)}>
            <div className="cb-thumbnail">
                {
                    (() => {
                        if(props.picture) {
                            return (
                                <img className="picture" src={props.picture} />
                            )
                        } else {
                            return (
                                <img className="picture" src="/img/icon-user-man.png" style={{backgroundColor: "#f2f2f2"}}/>
                                // <i className="material-icons" style={{fontSize: "50px"}}>
                                //     account_circle
                                // </i>
                            )
                        }
                    })()
                }
            </div>
            <div className="cb-profile">
                <div className="name">
                    {props.name}
                </div>
                <div className="account">
                    {props.account}
                </div>
            </div>
        </div>
    )
}

export default ProfileTypeA;