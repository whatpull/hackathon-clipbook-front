import React, { useState, useRef } from 'react';
import './ReviewItem.css';
import './ReviewItem_m.css';
import { ProfileTypeA, ReviewRating } from '../Common';
import Moment from 'react-moment';
Moment.globalFormat = 'YYYY-MM-DD hh:mm';

// [책 리뷰 리스트 아이템]
const ReviewItem = (props) => {
    const review = useRef(null);
    const [isMore, setIsMore] = useState(false);

    // [이벤트] 더보기
    const handleClickMore = (e) => {
        review.current.scrollTop = 0;
        setIsMore(!isMore);
    }

    return (
        <div className="cb-reviewitem" onClick={handleClickMore.bind(this)}>
            <div className="review-info">
                <div className="account">
                    <ProfileTypeA m_seq={props.item.review.m_seq} picture={props.item.writer.picture} name={props.item.writer.name} account={props.item.writer.account} />
                </div>
                <div className="rating">
                    <ReviewRating ratingValue={props.item.rating.rating} isReadOnly={true}/>
                    <Moment>{props.item.review.create_date}</Moment>
                </div>
            </div>
            <div className="review-content">
                <div id={"review-" + props.item.review.br_seq} ref={review} className={"review" + (isMore ? " open" : " close")}>
                    <div>
                        {
                            props.item.review.review.split('\n').map((line, index) => {
                                return (<span key={index}>{line}<br/></span>)
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewItem;