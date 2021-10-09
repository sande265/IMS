import React from 'react';

const Status = (props) => {
    let { status, callback, activeLabel, inActiveLabel } = props;
    if (status === 1 || status === '1') {
        return <div onClick={callback ? () => callback() : ''} style={{
            width: '80px !important',
            maxWidth: '80px !important',
            cursor: "default",

        }}>
            <span className="badge rounded-pill text-white bg-success">{activeLabel ? activeLabel : 'Active'}</span>
        </div>
    } else {
        return <div onClick={callback ? () => callback() : ''} style={{
            width: '80px !important',
            maxWidth: '80px !important',
            cursor: "default",

        }}>
            <span className="badge rounded-pill text-white bg-danger">{inActiveLabel ? inActiveLabel : 'Inactive'}</span>
        </div>
    }
}

export default Status;