import axios from 'axios';
import { baseURL } from '../src/constant/constant';
const instance = axios.create({
    baseURL: baseURL
});

/**
 * 책 카테고리 리스트 조회
 */
export const bookCategoryList = () => {
    return instance.get('/public/category/list');
}