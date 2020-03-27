import React from 'react';
import './BookItem.css';
import Router from 'next/router';
import { ReviewRating } from '../Common';
import Moment from 'react-moment';

// [책 아이템]
const BookItem = (props) => {
    
    // 썸네일 생성
    const thumbnail = () => {
        const domain = "https://clipbook-file.s3.ap-northeast-2.amazonaws.com"
        const name = props.item.thumbnail.name;
        const path = props.item.thumbnail.path;
        return domain + path.substring(path.indexOf('/'))+ "/" + name;
    }

    const handleClick = (e) => {
        e.preventDefault();
        if(!props.disableLink) {
            Router.push("/book/[seq]", "/book/" + props.item.book.b_seq);
        }
    }

    return (
        <div className={"cb-book-item-effect" + (props.disableLink ? " cursor-auto" : "")} onClick={handleClick.bind(this)} style={{margin: props.margin, transform: props.transform}}>
            <div className="book">
                <div className="front">
                    <div className="cover" style={{backgroundImage: 'url('+thumbnail()+')'}}>
                        {
                            (() => {
                                switch(props.type) {
                                    case "review":
                                        return (
                                            <div className="line" style={{backgroundImage: 'url('+ "/img/icon-user-man.png" +')'}}>
                                                <ReviewRating ratingValue={props.item.rating.rating} isReadOnly={true}/>
                                                <Moment format={"YYYY-MM-DD"}>{props.item.review.create_date}</Moment>
                                            </div>
                                        )
                                    default:
                                        return (
                                            <div className="line" style={{opacity: "0.3"}}>
                                                <div className="title" style={{fontSize: "15px", fontWeight: "bold"}}>{props.item.book.title}</div>
                                                <div className="author" style={{fontSize: "10px"}}>{props.item.book.author}</div>
                                            </div>
                                        )
                                }
                            })()
                        }
                    </div>
                </div>
                <div className="left-side" style={{backgroundImage: 'url('+thumbnail()+')'}}>
                        {
                            (() => {
                                switch(props.type) {
                                    case "review":
                                        return (
                                            <div className="line">
                                            </div>
                                        )
                                    default:
                                        return (
                                            <div className="line" style={{opacity: "0.3"}}>
                                            </div>
                                        )
                                }
                            })()
                        }
                    <h2>
                        <span></span>
                        <span></span>
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default BookItem;