import React from 'react';
import './Empty.css';
import './Empty_m.css';

// [빈 화면]
const Empty = (props) => {
    return (
        <div className="cb-empty">
            {/* <img src="/img/empty-like.png" style={{width: "200px", marginBottom: "10px"}}/> */}
            <div className="cb-empty-text">{props.text}</div>
            <div className="cb-empty-subtext">{props.subtext}</div>
            {/* <div className="cb-book-effect">
                <span className="page turn"></span>
                <span className="page turn"></span>
                <span className="page turn"></span>
                <span className="page turn"></span>
                <span className="page turn"></span>
                <span className="page turn"></span>
                <span className="cover"></span>
                <span className="page"></span>
                <span className="cover turn"></span>
            </div> */}
        </div>
    )
}

export default Empty;