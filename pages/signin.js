import React from 'react';
import { LayoutHead, LayoutNavigation, LayoutSearch } from '../src/component';
import { PageSignIn } from '../src/component';
import Head from 'next/head';
import { bookCategoryListRequestAction } from '../reducers/bookCategory';

// [페이지] 로그인
const SignIn = () => {
    return (
        <React.Fragment>
            <Head>
                <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css" />
            </Head>
            <LayoutHead />
            <LayoutNavigation />
            <LayoutSearch />
            <PageSignIn />
        </React.Fragment>
    )
}

// [SSR 페이지 초기화]
SignIn.getInitialProps = async (ctx) => {
    ctx.store.dispatch(bookCategoryListRequestAction());
}

export default SignIn;