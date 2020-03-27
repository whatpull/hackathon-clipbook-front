import React from 'react';
import { LayoutHead, LayoutNavigation, LayoutSearch } from '../src/component';
import { PageSignUp } from '../src/component';
import Head from 'next/head';
import { bookCategoryListRequestAction } from '../reducers/bookCategory';

// [페이지] 회원가입
const SignUp = () => {
    return ( 
        <React.Fragment>
            <Head>
                <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css" />
            </Head>
            <LayoutHead />
            <LayoutNavigation />
            <LayoutSearch />
            <PageSignUp />
        </React.Fragment>
    )
}

// [SSR 페이지 초기화]
SignUp.getInitialProps = async (ctx) => {
    ctx.store.dispatch(bookCategoryListRequestAction());
}

export default SignUp;