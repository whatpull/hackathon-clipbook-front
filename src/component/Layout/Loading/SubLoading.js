import React from 'react';
import './SubLoading.css';
import BarLoader from "react-spinners/BarLoader";

const SubLoading = (props) => {
    return (
        <div className={"cb-sub-loading" + (props.loading ? " open" : " close")}>
            <BarLoader
                color={props.color}
                loading={props.loading}
            />
        </div>
    )
}

export default SubLoading;