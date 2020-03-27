import React from "react";
// 넥스트
import App from "next/app";
import Head from 'next/head';
// 리덕스
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import reducer from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
// 리덕스 사가
import createSagaMiddleware from "redux-saga"; // redux-saga를 생성하기 위한 라이브러리
import withReduxSaga from 'next-redux-saga';
import rootSaga from '../sagas';
// [글로벌 리소스]
import '../src/App.css';
import '../src/App_w.css';
// [로딩]
import { CommonLoading } from '../src/component';
// [쿠키]
import { CookiesProvider } from 'react-cookie';

// [커스텀] 앱
// 1. 리덕스 연결(redux)
// 2. 리덕스 사가 연결(redux-saga)
class ClipBookApp extends App {
    static async getInitialProps({Component, ctx}) {
        return {
            pageProps: { // Call page-level getInitialProps
                ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
            }
        };
    }

    render() {
        const {Component, pageProps, store} = this.props;
        return (
            <Provider store={store}>
                <Head>
                    <title>Clipbook</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width, user-scalable=no" />
                </Head>
                <CookiesProvider>
                    <CommonLoading />
                    <Component {...pageProps}/>
                </CookiesProvider>
            </Provider>
        );
    }
}

// [리덕스] 스토어 생성 및 연결 설정
const configureStore = ( initialState, options ) => {
    // 1: Create the middleware
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    const enhancer = process.env.NODE_ENV === 'production' ? 
        compose(applyMiddleware(...middlewares)) :
        composeWithDevTools(applyMiddleware(...middlewares));
    // 2: Add an extra parameter for applying middleware:
    const store = createStore(reducer, initialState, enhancer);
    // 3: Run your sagas:
    store.sagaTask = sagaMiddleware.run(rootSaga);
    // 4: now return the store:
    return store;
}

export default withRedux(configureStore)(withReduxSaga(ClipBookApp));