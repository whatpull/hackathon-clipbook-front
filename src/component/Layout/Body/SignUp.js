import React, { useEffect, useState, useRef } from 'react';
import './SignUp.css';
import './SignUp_m.css';
import SignUpBox from '../../Process/Member/SignUpBox';
import { useDispatch, useSelector } from 'react-redux';
import { signupRequestAction } from '../../../../reducers/signup';
import Router from 'next/router';

// [회원가입]
const SignUp = () => {
    const dispatch = useDispatch();
    const signup = useSelector(state => state.signup);
    const [error, setError] = useState("");
    const usePrevious = (value) => {
        const ref = useRef();
        useEffect(() => {
          ref.current = value;
        });
        return ref.current;
    }
    const prevSignup = usePrevious(signup);

    useEffect(() => {
        const check = () => {
            if(prevSignup) {
                if(JSON.stringify(signup) !== JSON.stringify(prevSignup)) {
                    const signup_temp = signup;
                    const datas = signup_temp.signupDatas;
                    const error = signup_temp.signupError;
                    if(datas && datas.result === "success") {
                        // 페이지 이동
                        alert(datas.message);
                        Router.push("/signin");
                    } else if(error && error.message) {
                        let message = error.message;
                        switch(message) {
                            case "ER_DUP_ENTRY":
                                message = "이미 가입한 계정입니다.";
                                break;
                            default:
                        }
                        setError(message);
                    }
                }
            }
        }
        check();
    }, [signup, prevSignup]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.querySelector("#name").value;
        const account = e.target.querySelector("#account").value;
        const password = e.target.querySelector("#password").value;
        const data = {
            name: name,
            account: account,
            password: password
        }
        if(name && account && password) {
            dispatch(signupRequestAction(data));
        } else {
            setError("이름, 계정 또는 비밀번호를 입력해주세요.");
        }
    }

    return (
        <div className="cb-join">
            <SignUpBox handleSubmit={handleSubmit} error={error}/>
        </div>
    );
}

export default SignUp;