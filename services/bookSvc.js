import axios from 'axios';
import { baseURL } from '../src/constant/constant';
const instance = axios.create({
    baseURL: baseURL
});

/**
 * 책 리스트 조회
 * @param {*} params 변수
 */
export const bookList = (params) => {
    return instance.get('/public/book/list', {
        params: params
    });
}

/**
 * 책 조회
 * @param {*} params 변수
 */
export const book = (params) => {
    return instance.get('/public/book/' + params.b_seq, {
        params: {
            br_m_seq: params.br_m_seq,
            bf_m_seq: params.bf_m_seq
        }
    });
}

/**
 * 책 등록
 * @param {*} params 변수
 * @param {*} token 토큰
 */
export const bookRegister = (params, token) => {
    const formData = new FormData();
    formData.append('thumbnail', _dataURItoBlob(params.thumbnail), params.thumbnail_name);
    formData.append('m_seq', params.m_seq);
    formData.append('bc_seq', params.bc_seq);
    formData.append('title', params.title);
    formData.append('author', params.author);
    formData.append('summary', params.summary);
    return instance.post('/private/book', formData, {
        headers: {
            'x-access-token': token ? token : "",
            'Content-Type': 'multipart/form-data'
        }
    });
}

/**
 * 읽은 책 리스트 조회
 * @param {*} params 변수
 */
export const bookReadList = (params) => {
    return instance.get('/public/read/list', {
        params: params
    });
}

/**
 * 읽은 책 등록
 * @param {*} params 변수
 * @param {*} token 토큰
 */
export const bookReadOn = (params, token) => {
    return instance.post('/private/read', params, {
        headers: {
            'x-access-token': token ? token : ""
        }
    });
}

/**
 * 읽은 책 삭제
 * @param {*} params 변수
 * @param {*} token 토큰
 */
export const bookReadOff = (params, token) => {
    return instance.delete('/private/read', {
        params: params,
        headers: {
            'x-access-token': token ? token : ""
        }
    });
}

/**
 * 즐겨찾는 책 리스트 조회
 * @param {*} params 변수
 */
export const bookFavoriteList = (params) => {
    return instance.get('/public/favorite/list', {
        params: params
    });
}

/**
 * 즐겨찾는 책 등록
 * @param {*} params 변수
 * @param {*} token 토큰
 */
export const bookFavoriteOn = (params, token) => {
    return instance.post('/private/favorite', params, {
        headers: {
            'x-access-token': token ? token : ""
        }
    });
}

/**
 * 즐겨찾는 책 삭제
 * @param {*} params 변수
 * @param {*} token 토큰
 */
export const bookFavoriteOff = (params, token) => {
    return instance.delete('/private/favorite', {
        params: params,
        headers: {
            'x-access-token': token ? token : ""
        }
    });
}

// [유틸리티] dataURI => Blob 컨버팅
const _dataURItoBlob = (dataURI) => {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++)
    {
        ia[i] = byteString.charCodeAt(i);
    }

    var bb = new Blob([ab], { "type": mimeString });
    return bb;
}