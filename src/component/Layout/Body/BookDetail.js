import React, { useState } from 'react';
import './BookDetail.css';
import './BookDetail_m.css';
import BookInfo from '../../Process/BookDetail/BookInfo';
import ReviewList from '../../Process/ReviewList/ReviewList';
import ReviewWrite from '../../Process/Review/ReviewWrite';
import { useSelector } from 'react-redux';

// [책 상세]
const BookDetail = (props) => {
    const book = useSelector(state => state.book);
    const review = useSelector(state => state.review);
    const [isOpenReviewWrite, setIsOpenReviewWrite] = useState(false);

    // [이벤트] 리뷰 쓰기 오픈
    const handleClickReviewWriteOpen = (e) => {
        if(e) {
            e.preventDefault();
        }
        setIsOpenReviewWrite(true);
    }

    // [이벤트] 리뷰 쓰기 닫기
    const handleClickReviewWriteClose = (e) => {
        if(e) {
            e.preventDefault();
        }
        setIsOpenReviewWrite(false);
    }

    return (
        <React.Fragment>
            <div className="cb-book-detail">
                <div className="max-wrapper">
                    { 
                        (() => {
                            if(book && book.bookDatas[0]) {
                                return (
                                    <BookInfo book={book.bookDatas[0]} 
                                        handleClickReviewWriteOpen={handleClickReviewWriteOpen} 
                                        isOpenReviewWrite={isOpenReviewWrite}
                                        b_seq={props.b_seq} />
                                )
                            } else {
                                return (
                                    <div style={{width: '100%'}}>
                                        {book.bookError}
                                    </div>
                                )
                            }
                        })()
                    }
                    <ReviewList reviewList={review.reviewListDatas} isNext={review.reviewListExistNext} />
                </div>
            </div>
            <ReviewWrite b_seq={props.b_seq} isOpen={isOpenReviewWrite} handleClickReviewWriteClose={handleClickReviewWriteClose}/>
        </React.Fragment>
    )
}

export default BookDetail;