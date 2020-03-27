import React from 'react';
import './ReviewRating.css';

// [리뷰 평점]
const ReviewRating = (props) => {
    return (
        <div className={"cb-review-rating" + (props.isReadOnly ? " cursor-default" : " cursor-pointer")}>
            <span data-value="1" className={props.ratingValue >= 1 ? "active" : ""} onClick={props.isReadOnly ? undefined : props.handleClickRating.bind(this)}>P</span>
            <span data-value="2" className={props.ratingValue >= 2 ? "active" : ""} onClick={props.isReadOnly ? undefined : props.handleClickRating.bind(this)}>P</span>
            <span data-value="3" className={props.ratingValue >= 3 ? "active" : ""} onClick={props.isReadOnly ? undefined : props.handleClickRating.bind(this)}>P</span>
            <span data-value="4" className={props.ratingValue >= 4 ? "active" : ""} onClick={props.isReadOnly ? undefined : props.handleClickRating.bind(this)}>P</span>
            <span data-value="5" className={props.ratingValue >= 5 ? "active" : ""} onClick={props.isReadOnly ? undefined : props.handleClickRating.bind(this)}>P</span>
        </div>
    )
}

export default ReviewRating