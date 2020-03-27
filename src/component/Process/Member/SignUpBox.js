import React, { useEffect } from 'react';
import Link from 'next/link';
import './SignUpBox.css';
import './SignUpBox_m.css';
import { useDispatch } from 'react-redux';
import { signupSocialRequestAction } from '../../../../reducers/signup';

// [회원가입] 박스
const SingUpBox = (props) => {
    const dispatch = useDispatch();
    let auth2;

    const onSignIn = (element) => {
        auth2.attachClickHandler(element, {}, function(googleUser) {
            const profile = googleUser.getBasicProfile();
            const name = profile.getName();
            const picture = profile.getImageUrl();
            const access_token = profile.getId();
            const account = profile.getEmail();
            const provider = "google";
            const data = {
                name: name,
                picture: picture,
                account: account,
                provider: provider,
                access_token: access_token
            }
            dispatch(signupSocialRequestAction(data));
        }, function(error) {
            // alert(JSON.stringify(error, undefined, 2));
        });
    }

    useEffect(() => {
        const loadDynamicScript = (callback) => {
            const existingScript = document.getElementById('google-oauth2');
            if (!existingScript) {
                const script = document.createElement('script');
                script.src = 'https://apis.google.com/js/api:client.js'; // URL for the third-party library being loaded.
                script.id = 'google-oauth2'; // e.g., googleMaps or stripe
                document.body.appendChild(script);
            
                script.onload = () => {
                    if (typeof callback === "function") callback(true);
                };
            }
            if (existingScript && callback) callback(false);
        };

        loadDynamicScript((init) => {
            if(init) {
                gapi.load('auth2', function(){
                    auth2 = gapi.auth2.init({
                        client_id: '55780653474-0buca54i3kt2jgtthsgsl1lijnn02g2a.apps.googleusercontent.com',
                        cookiepolicy: 'single_host_origin'
                    });
                    onSignIn(document.getElementById('google'));
                });
            } else {
                auth2 = gapi.auth2.init({
                    client_id: '55780653474-0buca54i3kt2jgtthsgsl1lijnn02g2a.apps.googleusercontent.com',
                    cookiepolicy: 'single_host_origin'
                });
                onSignIn(document.getElementById('google'));
            }
        });
    })

    return (
        <form className="cb-signup-box" onSubmit={props.handleSubmit.bind(this)}>
            <div className="head">
                <div className="logo shadows">
                    <span style={{marginRight: "5px", fontSize: "20px"}}>SIGN UP FOR</span>
                    <span>클</span>
                    <span>립</span>
                    <span>북</span>
                </div>
            </div>
            <div className="body">
                <div className="sns">
                    <div id="google" className="google">
                        <span className="icon"></span>
                        <span className="buttonText">Continue With Google</span>
                    </div>
                </div>
                <div className="line"></div>
                <div className="name">
                    <input id="name" type="text"/>
                </div>
                <div className="email">
                    <input id="account" type="text"/>
                </div>
                <div className="password">
                    <input id="password" type="password" autoComplete="false"/>
                </div>
            </div>
            <div className="foot">
                <div className="error">
                    {props.error}
                </div>
                <div className="link">
                    Already a member?
                    <Link href="/signin">
                        <a style={{marginLeft: "10px"}}>SIGN IN</a>
                    </Link>
                </div>
                <div className="button">
                    <button className="item" type="submit">
                        SIGN UP
                    </button>
                </div>
            </div>
        </form>
    );
}

export default SingUpBox;