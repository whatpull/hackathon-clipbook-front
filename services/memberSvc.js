import axios from 'axios';
import { baseURL } from '../src/constant/constant';
const instance = axios.create({
    baseURL: baseURL
});

/**
 * 로그인
 * @param {*} params 변수
 */
export const signin = (params) => {
    return instance.post("/public/signin", params);
}

/**
 * 회원가입
 * @param {*} params 변수 
 */
export const signup = (params) => {
    return instance.post("/public/signup", params);
}

/**
 * 프로필 조회
 * @param {*} params 변수 
 */
export const profile = (params) => {
    return instance.get("/public/member/" + params.m_seq);
}

/**
 * 소셜 로그인
 * @param {*} params 변수
 */
export const signinSocial = (params) => {
    return instance.post("/public/signin/social", params);
}

/**
 * 소셜 회원가입
 * @param {*} params 변수 
 */
export const signupSocial = (params) => {
    return instance.post("/public/signup/social", params);
}