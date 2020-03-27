import React, { useEffect, useRef, useState } from 'react';
import './ReviewWrite.css';
import './ReviewWrite_m.css';
import { ReviewRating } from '../Common';
import { useDispatch, useSelector } from 'react-redux';
import { ratingChoiceAction } from '../../../../reducers/rating';
import { reviewWriteRequestAction } from '../../../../reducers/reviewWrite';
import { useCookies } from 'react-cookie';
import jwt from 'jsonwebtoken';
import { secret } from '../../../../src/constant/constant';
import Router from 'next/router';
import { SubCommonLoading } from '../../../component';

// [리뷰 쓰기]
const ReviewWrite = (props) => {
    const [cookies] = useCookies(['TOKEN']);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const rating = useSelector(state => state.rating);
    const reviewWrite = useSelector(state => state.reviewWrite);
    const usePrevious = (value) => {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }
    const prevReviewWrite = usePrevious(reviewWrite);

    useEffect(() => {
        const check = () => {
            if(prevReviewWrite) {
                if(JSON.stringify(reviewWrite) !== JSON.stringify(prevReviewWrite)) {
                    const reviewWrite_temp = reviewWrite;
                    const datas = reviewWrite_temp.reviewWriteDatas;
                    const error = reviewWrite_temp.reviewWriteError;
                    if(datas && datas.result === "success") {
                        initReviewWirte();
                    } else if(error && error.message) {
                        let message = error.message;
                        switch(message) {
                            case "ER_DUP_ENTRY":
                                message = "이미 리뷰를 작성하셨습니다.\n리뷰는 최대 한개까지만 작성이 가능합니다.";
                                break;
                            default:
                        }
                        alert(message);
                    }
                }
            }
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
        check();
    }, [reviewWrite, prevReviewWrite])

    const initReviewWirte = () => {
        document.querySelector(".cb-review-write #review").value = "";
        dispatch(ratingChoiceAction(0));
        props.handleClickReviewWriteClose();
    }

    const handleClickRating = (e) => {
        const value = new Number(e.target.getAttribute("data-value"));
        dispatch(ratingChoiceAction(value));
    }

    const handleClickSubmit = (e) => {
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
                        const review = document.querySelector(".cb-review-write #review").value;
                        if(rating === 0) {
                            alert("평점을 선택해 주세요.");
                            setLoading(false);
                            return;
                        }
                        if(review === "") {
                            alert("리뷰를 작성해 주세요.");
                            setLoading(false);
                            return;
                        }
                        const params = {
                            m_seq: decoded.m_seq,
                            b_seq: props.b_seq,
                            rating: rating,
                            review: review
                        }
                        dispatch(reviewWriteRequestAction(params, token));
                    }, 0);
                }
            });
        } else {
            if(confirm("리뷰를 작성하기 위해서는 로그인이 필요합니다.\n로그인 페이지로 이동하시겠습니까?")){
                Router.push('/signin');
            }
        }
    }

    return (
        <div className={"cb-review-write" + (props.isOpen ? " open" : " close")}>
            <SubCommonLoading loading={loading} color="rgba(255,91,91,1)"/>
            <div className="head">
                <div className="title">
                    <span className="material-icons" style={{marginRight: "5px", fontSize: "20px"}}>
                        favorite
                    </span>
                    Write a review
                </div>
                <div className="close">
                    <div className="item" onClick={props.handleClickReviewWriteClose}>
                        <i className="material-icons">
                            clear
                        </i>
                    </div>
                </div>
            </div>
            <div className="body">
                <div className="rating">
                    <ReviewRating ratingValue={rating} isReadOnly={false} handleClickRating={handleClickRating}/>
                </div>
                <div className="review">
                    <textarea id="review"></textarea>
                </div>
            </div>
            <div className="foot">
                <div className="button">
                    <div className="item" onClick={handleClickSubmit.bind(this)}>
                        Submit
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewWrite;