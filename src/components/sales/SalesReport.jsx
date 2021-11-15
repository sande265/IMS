import { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getSalesReport } from '../../actions/dashboard-actions';
import { generateQueryParams, getLongDate, getUrlParameter } from '../../helpers/GeneralHelpers';
import ContentWrapper from '../../Layout/Main'
import { SpinnerLoader } from '../../shared/loader/Loader';
import { Pagination, TableCrudBox, TableHeader, Table, HeaderFilter, FilterHeader } from '../../shared/tableComponents';

const columns = [
    "id",
    "product_name",
    { name: "cost price", alignment: 'right' },
    { name: "qty", alignment: 'right' },
    { name: "sale_price", alignment: 'right' },
    { name: "total sales", alignment: 'right' },
    { name: "sold_date", alignment: 'right' },
    { name: "profit/loss", alignment: 'right' },
    { name: "actions", alignment: 'center' }
]

const SalesReport = (props) => {
    let pathname = props.location.pathname
    let search_params = props.location.search

    const { report } = useSelector(state => ({
        report: state.dashboard.salesReport
    }), shallowEqual)
    const dispatch = useDispatch()

    const [state, setState] = useState({
        data: {},
        showFilterOptions: false
    })
    const [loading, setLoading] = useState(true)

    let date = new Date()
    let prev_mth = new Date(date.getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split("T")[0]
    let today = date.toISOString().split("T")[0];

    const [extra, setExtra] = useState({
        filter: [
            {
                key: "start_date",
                value: prev_mth,
                type: "date",
                name: "Start Date",
            },
            {
                key: "end_date",
                type: "date",
                value: today,
                name: "End Date",
            }
        ],
        limit: '10',
        page: 1,
        q: '',
        sort_by: null,
        sort_field: null,
        filterKey: "",
        filterValue: null,
        showFilterOptions: false,
    })

    useEffect(() => {
        if (report)
            setState({ ...state, data: report })
    }, [report])

    useEffect(() => {
        let filter = [...extra.filter]
        let { limit, page, q, sort_by, sort_field } = { ...extra }
        let query = getUrlParameter(search_params)
        Object.keys(query).map((key) => {
            if (key === "page") page = query[key]
            else if (key === "limit") limit = query[key]
            else if (key === "q") q = query[key]
            else if (key === "sort_by") sort_by = query[key]
            else if (key === "sort_field") sort_field = query[key]
            else {
                let index = filter.findIndex(x => x.key === key)
                if (index > -1) {
                    filter[index]["value"] = query[key]
                }
            }
        })
        setExtra({ ...extra, limit, page, q, sort_by, sort_field, filter })
    }, [])

    const setUrlQuery = () => {
        let filter = [...extra.filter]
        let { limit, page, q, sort_by, sort_field } = { ...extra };
        filter.push({
            key: "limit",
            value: limit
        })
        filter.push({
            key: "page",
            value: page
        })
        filter.push({
            key: "q",
            value: q
        })
        filter.push({
            key: "sort_by",
            value: sort_by
        })
        filter.push({
            key: "sort_field",
            value: sort_field
        })
        let query = generateQueryParams(filter)
        props.history.push({
            pathname: pathname,
            search: query
        })
    }

    /* Call API after filter state changes */
    useEffect(() => {
        fetchData();
    }, [extra])

    const fetchData = () => {
        let { limit, page, q, sort_by, sort_field, filterKey, filterValue, filter } = extra;
        dispatch(getSalesReport({ limit, page, q, sort_by, sort_field, filterKey, filterValue, filter }))
            .then(res => setLoading(false))
        setUrlQuery()
    }

    const changePage = (page) => {
        setExtra({ ...extra, page })
    }

    const limitChange = (e) => {
        let { value } = e.target;
        setExtra({ ...extra, limit: value })
    }

    const onApplyFilters = (filters, e) => {
        let filter = [...extra.filter]
        filters.map(item => {
            if (item.value) {
                let index = filter.findIndex(x => x.key === item.key)
                if (index > -1) {
                    filter[index]["value"] = item.value
                }
            }
        })
        setExtra({
            ...extra,
            filter: filter, page: 1
        })
        onToggleShowFilter()
    }

    const clearActiveFilter = () => {
        let filter = [...extra.filter]
        filter.map(i => {
            i["value"] = ""
        })
        setExtra({
            ...extra,
            filter,
            page: 1
        }, () => {

        })
    }

    const deleteActiveFilter = (key) => {
        let filter = [...extra.filter]
        let index = filter.findIndex(x => x.key === key)
        if (index > -1) {
            filter[index]["value"] = ""
            setExtra({
                ...extra,
                filter,
                page: 1
            })
        }
    }

    const onToggleShowFilter = () => {
        setState({
            ...state,
            showFilterOptions: !state.showFilterOptions
        })
    }

    let { data, current_page, from, last_page, to } = state.data;
    let { limit, filter } = extra;

    let SalesReport = loading ? <tr className="text-center">
        <td colSpan="10"><SpinnerLoader /></td>
    </tr> : data && data.length > 0 ? data.map((items, idx) => {
        let { id, actual_price, sale_price, product_name, sold_date, qty } = items;
        return <tr key={idx}>
            <td>{id}</td>
            <td>{product_name ? product_name : '-'}</td>
            <td className="text-right">{actual_price ? actual_price : '-'}</td>
            <td className="text-right">{qty ? qty : '-'}</td>
            <td className="text-right">{sale_price ? sale_price : '-'}</td>
            <td className="text-right">{sale_price && qty ? (sale_price * qty) : 0}</td>
            <td className="text-right">{sold_date ? getLongDate(sold_date) : '-'}</td>
            <td className="text-right">{sale_price && qty ? ((sale_price * 0.35) * qty).toFixed(2) : 0}</td>
            <td className="text-center">
                <TableCrudBox type="inventory" noEdit noDelete id={id} />
            </td>
        </tr>
    }) : <tr className="text-center">
        <td colSpan="10">No Records</td>
    </tr>

    let total_profit = 0
    let total_sales = 0
    for (var i = 0; i < data?.length; i++) {
        if (data[i] && data[i].sale_price)
            total_profit += ((data[i].sale_price * 0.35) * data[i].qty)
        total_sales += data[i].sale_price * data[i].qty
    }

    return <ContentWrapper>
        <div className="card">
            <div className="card-header">
                <FilterHeader
                    filter={filter}
                    limit={limit}
                    limitChange={limitChange}
                    showFilterOptions={state.showFilterOptions}
                    onToggleShowFilter={onToggleShowFilter}
                    deleteActiveFilter={deleteActiveFilter}
                    onApplyFilters={onApplyFilters}
                    clearActiveFilter={clearActiveFilter}
                />
            </div>
            <div className="card-body">
                <div className="table-wrapper">
                    <Table tableClass="table-hover" columns={columns}>
                        {SalesReport}
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className="text-right">Total: Rs. {total_sales.toFixed(2)}</td>
                            <td></td>
                            <td className="text-right">Total: Rs. {total_profit.toFixed(2)}</td>
                            <td></td>
                        </tr>
                    </Table>
                </div>
                <Pagination
                    current_page={current_page}
                    pageFrom={from}
                    pageTo={to}
                    last_page={last_page}
                    changePage={changePage}
                />
            </div>
        </div>
    </ContentWrapper>
}

export default SalesReport;