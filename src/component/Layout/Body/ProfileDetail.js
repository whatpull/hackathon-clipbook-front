import React from 'react';
import './ProfileDetail.css';
import './ProfileDetail_m.css';
import ProfileInfo from '../../Process/ProfileDetail/ProfileInfo';
import BookReadListTypeR from '../../Process/BookReadList/BookReadListTypeR';
import BookListTypeR from '../../Process/BookList/BookListTypeR';
import ReviewListTypeR from '../../Process/ReviewList/ReviewListTypeR';
import { useSelector } from 'react-redux';

// [프로필] 상세
const ProfileDetail = (props) => {
    const bookRead = useSelector(state => state.bookRead);
    const profile = useSelector(state => state.profile);

    return (
        <div id="cb-profile-detail" className="cb-profile-detail">
            <div className="max-wrapper">
                <ProfileInfo profile={profile.profileDatas} disableLink={true}/>
                <div className="title">
                    등록한 책({profile.bookRegisteredListDatas.length}) 
                    {/* <img src="/img/icon-swipe.png" className="icon-symbol"/> */}
                </div>
                <BookListTypeR m_seq={props.m_seq} bookRegisteredList={profile.bookRegisteredListDatas} isNext={profile.bookRegisteredListExistNext}/>
                <div className="title">
                    읽은 책({bookRead.bookReadListDatas.length})
                </div>
                <BookReadListTypeR m_seq={props.m_seq} bookReadList={bookRead.bookReadListDatas} isNext={bookRead.bookReadListExistNext} />
                <div className="title">
                    리뷰({profile.reviewRegisteredListDatas.length})
                </div>
                <ReviewListTypeR m_seq={props.m_seq} reviewRegisteredList={profile.reviewRegisteredListDatas} isNext={profile.reviewRegisteredListExistNext}/>
            </div>
        </div>
    )
}

export default ProfileDetail;