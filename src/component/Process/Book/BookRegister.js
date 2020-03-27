import React, { useEffect, useState } from 'react';
import './BookRegister.css';
import './BookRegister_m.css';
import BookRegisterStep1 from './BookRegisterStep1';
import BookRegisterStep2 from './BookRegisterStep2';
import { useDispatch, useSelector } from 'react-redux';
import { bookChangeStepAction, bookChangeOpenAction, bookChangeParamsAction, bookRegisterRequestAction } from '../../../../reducers/bookRegister';
import { useCookies } from 'react-cookie';
import jwt from 'jsonwebtoken';
import { secret } from '../../../../src/constant/constant';
import Router from 'next/router';
import { SubCommonLoading } from '../../../component';

// [책 등록]
const BookRegister = () => {
    const [cookies] = useCookies(['TOKEN']);
    const dispatch = useDispatch();
    const bookRegister = useSelector(state => state.bookRegister);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const check = () => {
            if(bookRegister.bookRegisterDatas.result === "success") {
                alert(bookRegister.bookRegisterDatas.message);
            } else if(bookRegister.bookRegisterError.result === "error") {
                let message = bookRegister.bookRegisterError.message;
                switch(message) {
                    case "ER_DUP_ENTRY":
                        message = "이미 등록된 책입니다.\n검색을 통해 확인해보세요.";
                        break;
                    default:
                }
                alert(message);
            }
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
        check();
    }, [bookRegister])

    // [이벤트] 책 등록 닫기
    const handleClickBookRegisterClose = (e) => {
        e.preventDefault();
        dispatch(bookChangeOpenAction(false));
    }

    // [이벤트] 책 등록 스텝2 이동
    const handleClickBookRegisterStep2 = (thumbnail) => {
        if(bookRegister.bookRegisterParams.crop_thumbnail === '') {
            alert("기본 이미지는 사용하실 수 없습니다.\n원하시는 파일을 선택해주세요.");
        } else {
            const params = {
                thumbnail: thumbnail
            }
            dispatch(bookChangeParamsAction(params));
            dispatch(bookChangeStepAction(2));
        }
    }

    // [이벤트] 책 등록 스텝1 이동
    const handleClickBookRegisterStep1 = (e) => {
        e.preventDefault();
        const title = document.querySelector("#title").value;
        const author = document.querySelector("#author").value;
        const category = document.querySelector("#selectbox-category-book-register select");
        const bc_seq = new Number(category.options[category.selectedIndex].value);
        const summary = document.querySelector("#summary").value;
        const data = {
            title: title,
            author: author,
            bc_seq: bc_seq,
            summary: summary
        }
        dispatch(bookChangeParamsAction(data));
        dispatch(bookChangeStepAction(1));
    }

    // [이벤트] 책 등록
    const handleClickSubmit = (e) => {
        e.preventDefault();
        const token = cookies.TOKEN;
        if(token && token !== "undefined") {
            jwt.verify(token, secret, function(error, decoded) {
                if (error) {
                    if(error.name === "TokenExpiredError") {
                        Router.push('/signin');
                    }
                } else {
                    setTimeout(() => {
                        setLoading(true);
                        const title = document.querySelector("#title").value;
                        const author = document.querySelector("#author").value;
                        const category = document.querySelector("#selectbox-category-book-register select");
                        const bc_seq = new Number(category.options[category.selectedIndex].value);
                        const summary = document.querySelector("#summary").value;
                        if(title === "") {
                            alert("제목을 입력해 주세요.");
                            setLoading(false);
                            return;
                        }
                        if(author === "") {
                            alert("저자를 입력해 주세요.");
                            setLoading(false);
                            return;
                        }
                        if(bc_seq == 0) {
                            alert("카테고리를 선택해 주세요.");
                            setLoading(false);
                            return;
                        }
                        if(summary === "") {
                            alert("요약 내용을 입력해 주세요.");
                            setLoading(false);
                            return;
                        }
                        const params = {
                            thumbnail: bookRegister.bookRegisterParams.thumbnail,
                            thumbnail_name: bookRegister.bookRegisterParams.thumbnail_name,
                            m_seq: decoded.m_seq,
                            bc_seq: bc_seq,
                            title: title,
                            author: author,
                            summary: summary
                        }
                        dispatch(bookChangeParamsAction(params));
                        dispatch(bookRegisterRequestAction(params, token));
                    }, 0);
                }
            });
        } else {
            if(confirm("읽은 책으로 등록하기 위해서는 로그인이 필요합니다.\n로그인 페이지로 이동하시겠습니까?")){
                Router.push('/signin');
            }
        }
    }

    // [이벤트] 파일 변경
    const handleChangeFile = (e) => {
        e.preventDefault();

        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }

        const max_size = 2 * 1024 * 1024;
        const file = files[0];
        if(file) {
            if(file.size > max_size){
                alert("파일 용량을 초과하였습니다.\n최대 용량은 2MB입니다.");
                e.target.value = "";
            } else {
                const file_name = file.name;
                const reader = new FileReader();
                reader.onload = () => {
                    const data = {
                        crop_thumbnail: reader.result,
                        thumbnail_name: file_name
                    }
                    dispatch(bookChangeParamsAction(data));
                };
                reader.readAsDataURL(files[0]);
            }
        }
    }

    return (
        <div className={"cb-book-register" + (bookRegister.bookRegisterOpen ? " open" : " close")}>
            <SubCommonLoading loading={loading} color="#5D6DBE"/>
            <div className="head">
                <div className="title">
                    BOOK ADD - {bookRegister.bookRegisterStep == 1 ? "Thumbnail crop." : "Book infomation."}
                </div>
                <div className="close">
                    <div className="item" onClick={handleClickBookRegisterClose}>
                        <i className="material-icons">
                            clear
                        </i>
                    </div>
                </div>
            </div>
            <div className="body">
                {
                    bookRegister.bookRegisterStep == 1 
                    ? <BookRegisterStep1 
                        handleChangeFile={handleChangeFile} 
                        bookRegister={bookRegister} 
                        handleClickBookRegisterStep2={handleClickBookRegisterStep2} /> 
                    : bookRegister.bookRegisterStep == 2 
                    ? <BookRegisterStep2 /> 
                    : false 
                }
            </div>
            <div className={"foot" + (bookRegister.bookRegisterStep == 1 ? " hide" : "")}>
                <div className="button">
                    <div className={"item" + (bookRegister.bookRegisterStep == 1 ? " hide" : "")} onClick={handleClickBookRegisterStep1}>
                        Prev
                    </div>
                    <div className={"item" + (bookRegister.bookRegisterStep == 1 ? " hide" : "")} onClick={handleClickSubmit}>
                        Submit
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookRegister;