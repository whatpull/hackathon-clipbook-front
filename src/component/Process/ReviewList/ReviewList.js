import React from 'react';
import './ReviewList.css';
import './ReviewList_m.css';
import ReviewItem from './ReviewItem';
import Empty from '../Common/Empty';

// [책 리뷰 리스트]
const ReviewList = (props) => {
    return (
        <div className="cb-reviewlist">
            {
                (() => {
                    if(props.reviewList.length > 0) {
                        return (
                            props.reviewList.map((item, index) => {
                                return (
                                    <ReviewItem item={item} key={index}/>
                                )
                            })
                        )
                    } else {
                        return (
                            <Empty text={"NO REVIEW"} subtext={"Please be the first reviewer."}/>
                        )
                    }
                })()
            }
            {
                (() => {
                    if(props.isNext) {
                        return (
                            <div className="btn-more">
                                <i className="material-icons" style={{transform: 'rotate( 90deg )'}}>
                                    last_page
                                </i>
                            </div>
                        )
                    }
                })()
            }
        </div>
    )
}

export default ReviewList;