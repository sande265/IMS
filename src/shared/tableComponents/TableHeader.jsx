import React from 'react';

const TableHeader = (props) => {
    let { limit, limitChange, q, searchChange } = props;
    return (
        <div className="row">
            <div className="col-lg-6 col-6 ">
                <div className="dataTables_length pt-2" id="example1_length">
                    <label className="d-inline-flex"><p className="mt-2">Show&nbsp;</p>
                        <select
                            name="example1_length"
                            value={limit}
                            onChange={limitChange}
                            className="form-control input-sm"
                            style={{ backgroundColor: '#171941' }}>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select><p className="mt-2">&nbsp;entries</p></label>
                </div>
            </div >
            <div className="col-lg-6 col-6 pt-2  text-right">
                <div id="example1_filter" className="dataTables_filter">
                    <label className="d-inline-flex"><p className="mt-2">Search:&nbsp;&nbsp;</p>
                        <input
                            type="search"
                            className="form-control input-sm"
                            value={q}
                            onChange={searchChange}
                        />
                    </label>
                </div>
            </div>

        </div >
    );
}

export default TableHeader;