import axios from 'axios';
import { baseURL } from '../src/constant/constant';
const instance = axios.create({
    baseURL: baseURL
});

/**
 * 리뷰 리스트 조회
 * @param {*} params 변수 
 */
export const reviewList = (params) => {
    return instance.get('/public/review/list', {
        params: params
    });
}

/**
 * 리뷰 등록
 * @param {*} params 변수
 * @param {*} token 토큰
 */
export const reviewWrite = (params, token) => {
    return instance.post('/private/review', params, {
        headers: {
            'x-access-token': token ? token : "",
        }
    });
}