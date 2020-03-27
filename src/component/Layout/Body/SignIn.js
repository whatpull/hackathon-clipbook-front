import React, { useEffect, useState, useRef } from 'react';
import './SignIn.css';
import './SignIn_m.css';
import SignInBox from '../../Process/Member/SignInBox';
import { useDispatch, useSelector } from 'react-redux';
import { signinRequestAction } from '../../../../reducers/signin';
import Router from 'next/router';
import { useCookies } from 'react-cookie';
import jwt from 'jsonwebtoken';
import { secret } from '../../../../src/constant/constant';

// [로그인]
const SignIn = () => {
    const [cookies, setCookie] = useCookies(['TOKEN']);
    const dispatch = useDispatch();
    const signin = useSelector(state => state.signin);
    const [error, setError] = useState("");
    const usePrevious = (value) => {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }
    const prevSignin = usePrevious(signin);

    useEffect(() => {
        const check = () => {
            if(prevSignin) {
                if(JSON.stringify(signin) !== JSON.stringify(prevSignin)) {
                    const signin_temp = signin;
                    const datas = signin_temp.signinDatas;
                    const error = signin_temp.signinError;
                    if(datas && datas.result === "success") {
                        // 만료시간 적용
                        const data = jwt.verify(datas.data.token, secret);
                        setCookie('TOKEN', datas.data.token, { path: '/', expires: new Date(data.exp*1000) });
                        Router.push("/");
                    } else if(error && error.message) {
                        let message = error.message;
                        setError(message);
                    }
                }
            }
        }
        check();
    }, [cookies, signin, prevSignin]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const account = e.target.querySelector("#account").value;
        const password = e.target.querySelector("#password").value;
        const data = {
            account: account,
            password: password
        }
        if(account && password) {
            dispatch(signinRequestAction(data));
        } else {
            setError("계정 또는 비밀번호를 입력해 주세요.");
        }
    }

    return (
        <div className="cb-login">
            <SignInBox handleSubmit={handleSubmit} error={error}/>
        </div>
    );
}

export default SignIn;