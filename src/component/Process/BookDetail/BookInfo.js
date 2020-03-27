import React from 'react';
import './BookInfo.css';
import './BookInfo_m.css';
import { ProfileTypeA, BookFavorite, BookRead, BookItem } from '../Common';

// [책 정보]
const BookInfo = (props) => {
    return (
        <div className="cb-book-info">
            <div className="head">
                <div className="title">
                    {props.book.book.title}
                </div>
                <div className="button">
                    <BookRead b_seq={props.b_seq} isRead={props.book[""].read} margin={"0 5px 0 0"}/>
                    <BookFavorite b_seq={props.b_seq} isFavorite={props.book[""].favorite} margin={"0 5px 0 0"}/>
                    {/* 분리여부 검토 : 리뷰버튼 */}
                    <div className="item" onClick={props.handleClickReviewWriteOpen}>
                        <span className="material-icons" style={{fontSize: "20px"}}>
                            {props.isOpenReviewWrite ? "favorite" : "favorite_border"}
                        </span>
                    </div>
                </div>
            </div>
            <div className="body">
                <div className="left">
                    <BookItem item={props.book} disableLink={true} margin={"0 5px 20px 0"}/>
                </div>
                <div className="right">
                    <div className="writer">
                        <ProfileTypeA m_seq={props.book.book.m_seq} picture={props.book[""].writer_picture} name={props.book.writer.name} account={props.book.writer.account} />
                    </div>
                    <div className="author">작가 : {props.book.book.author}</div>
                    <div className="genres">장르 : {props.book.category.kr_name}</div>
                    <div className="ratings">평점 : {props.book[''].avg_rating}</div>
                    <div className="report">
                        {
                            props.book.book.summary.split('\n').map((line, index) => {
                                return (<span key={index}>{line}<br/></span>)
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookInfo;