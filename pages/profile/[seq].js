import React from 'react';
import { LayoutHead, LayoutNavigation, LayoutSearch } from '../../src/component';
import { PageProfileDetail } from '../../src/component';
import { bookReadListRequestAction } from '../../reducers/bookRead';
import { profileRequestAction, bookRegisteredListRequestAction, reviewRegisteredListRequestAction } from '../../reducers/profile';
import { bookCategoryListRequestAction } from '../../reducers/bookCategory';

// [페이지] 프로필 상세
const ProfileDetail = ({ m_seq }) => {
    return (
        <React.Fragment>
            <LayoutHead />
            <LayoutNavigation />
            <LayoutSearch />
            <PageProfileDetail m_seq={m_seq} />
        </React.Fragment>
    )
}

// [SSR 페이지 초기화]
ProfileDetail.getInitialProps = async (ctx) => {
    const m_seq = ctx.query.seq;
    const params = {
        m_seq: m_seq,
        page_item_size: 9999
    }
    ctx.store.dispatch(profileRequestAction(params));
    ctx.store.dispatch(bookRegisteredListRequestAction(params));
    ctx.store.dispatch(bookReadListRequestAction(params));
    ctx.store.dispatch(reviewRegisteredListRequestAction(params));
    ctx.store.dispatch(bookCategoryListRequestAction());
    return params;
}

export default ProfileDetail;