import React, { useState, useEffect } from 'react';
import './Loading.css';
import HashLoader from "react-spinners/HashLoader";
import Router from 'next/router';

// 로딩
const Loading = () => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        Router.events.on('routeChangeStart', handleRouteChangeStart);
        Router.events.on('routeChangeComplete', handleRouteChangeComplete);
        Router.events.on('routeChangeError', handleRouteChangeError);
        return () => {
            Router.events.off('routeChangeStart', handleRouteChangeStart);
            Router.events.off('routeChangeComplete', handleRouteChangeComplete);
            Router.events.off('routeChangeError', handleRouteChangeError);
        }
    }, [loading]);

    const handleRouteChangeStart = (url) => {
        setLoading(true);
    }

    const handleRouteChangeComplete = (url) => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }

    const handleRouteChangeError = (error) => {
        console.log(error);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }

    return (
        <div className={"cb-loading" + (loading ? " open" : " close")}>
            <HashLoader
                size={50}
                color={"#5D6DBE"}
                loading={loading}
            />
        </div>
    )
}

export default Loading;