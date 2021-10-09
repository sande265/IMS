import React, { useState, useEffect } from 'react';

const TablePagination = (props) => {

    const { current_page, last_page, changePage, pageFrom, pageTo } = props

    const [from, setFrom] = useState(current_page)
    const [to, setTo] = useState(current_page)
    const [last, setLast] = useState(last_page)

    const neighbours = 3

    useEffect(() => {
        pageRange()
    }, [props])

    const pageRange = () => {
        if (neighbours > 0) {
            setLast(current_page + neighbours < last_page ? current_page + neighbours : last_page)
            setFrom(current_page - neighbours > 0 ? current_page - neighbours : 1)
            setTo(current_page + neighbours < last_page ? current_page + neighbours : last_page)
        }
    }

    const items = []

    for (var i = from; i <= to; i++) {
        items.push(i)
    }

    let pagination = items.map((page, idx) => {
        if (page === current_page) {
            return (<li type="button" className={`page-item ${page === current_page ? 'active' : ''}`} key={`page${i}`}>
                <a href className="page-link" onClick={() => { changePage(page) }}>{page}</a>
            </li>);
        }
        return <li type="button" key={idx} className="page-item">
            <a href className="page-link" onClick={() => changePage(page)}>{page}</a>
        </li>
    })

    if (last_page === undefined || last_page <= 1) return <></>
    return <div>
        <span className="">Showing {pageFrom} - {pageTo} entries</span>
        <ul className="pagination float-right">
            {/* <li type="button" className={`page-item`}>
                <a href className="page-link" tabIndex="-1" aria-disabled="true" onClick={() => changePage(from)}>First</a>
            </li> */}
            <li type="button" className={`page-item ${current_page <= 1 ? `disabled` : ''}`}>
                <a href className="page-link" tabIndex="-1" aria-disabled="true" onClick={() => changePage(current_page - 1)}>{`<`}</a>
            </li>
            {pagination}
            <li type="button" className={`page-item ${current_page >= last_page ? `disabled` : ''}`}>
                <a href className="page-link" onClick={() => changePage(current_page + 1)}>{`>`}</a>
            </li>
        </ul>
    </div>
}

export default TablePagination;