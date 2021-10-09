import { getCustomers } from "../../actions/customer-actions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import ContentWrapper from "../../Layout/Main";
import { useEffect, useState } from "react";
import { SpinnerLoader } from "../../shared/loader/Loader";
import { Table, TableHeader, Pagination, TableCrudBox, Status } from "../../shared/tableComponents";
import { getUrlParameter, getDate, generateQueryParams } from "../../helpers/GeneralHelpers";

const links = [
    {
        name: 'Customers',
        link: '/customers'
    }
]

const columns = [
    'id', 'Customer Name', 'email', 'contact', 'location',
    { name: 'status', alignment: 'center' },
    'created_date',
    { name: 'actions', alignment: 'center' }
]

const Customers = (props) => {
    let pathname = props.location.pathname
    let search_params = props.location.search

    const { customers } = useSelector(state => ({
        customers: state.customers.customers
    }), shallowEqual);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true)
    const [state, setState] = useState({
        data: {}
    });
    const [extra, setExtra] = useState({
        filter: [],
        limit: '10',
        page: 1,
        q: '',
        sort_by: null,
        sort_field: null,
        filterKey: "",
        filterValue: null,
        showFilterOptions: false,
    })

    // useEffect(() => {
    //     fetchData()
    // }, [])

    useEffect(() => {
        if (customers)
            setState({ ...state, data: customers })
    }, [customers])

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

    useEffect(() => {
        fetchData();
    }, [extra])

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

    const fetchData = () => {
        let { limit, page, q, sort_by, sort_field, filterKey, filterValue, filter } = extra;
        dispatch(getCustomers({ limit, page, q, sort_by, sort_field, filterKey, filterValue, filter }))
            .then(res => setLoading(false))
        setUrlQuery()
    }

    let { data, current_page, from, last_page, per_page, to, total } = state.data;

    let customersList = loading ? <tr className="text-center">
        <td colSpan="10"><SpinnerLoader /></td>
    </tr> : data && data.length > 0 ? data.map((items, idx) => {
        let { id, customer_name, email, contact, location, status, created_at } = items;
        return <tr key={idx}>
            <td>{id}</td>
            <td>{customer_name ? customer_name : '-'}</td>
            <td>{email ? email : '-'}</td>
            <td>{contact ? contact : '-'}</td>
            <td>{location ? location : '-'}</td>
            <td className="text-center">
                <Status status={status} />
            </td>
            <td>{created_at && getDate(created_at)}</td>
            <td className="text-center">
                <TableCrudBox type="customers" id={id} noView />
            </td>
        </tr>
    }) : <tr className="text-center">
        <td colSpan="10">No Records Found</td>
    </tr>

    const onCreate = () => {
        props.history.push('/customers/new')
    }

    const changePage = (page) => {
        setExtra({ ...extra, page })
    }

    const limitChange = (e) => {
        let { value } = e.target;
        setExtra({ ...extra, limit: value })
    }

    const searchChange = (e) => {
        let { value } = e.target;
        let query = value
        if ((query && query.length >= 3) || query.length === 0)
            setExtra({ ...extra, q: query })
    }

    return <ContentWrapper links={links} title={"Customers"} options={['create']} onCreate={onCreate}>
        <div className="card">
            <div className="card-header">
                <TableHeader
                    limitChange={(e) => limitChange(e)}
                    limit={extra.limit}
                    searchChange={(e) => searchChange(e)}
                />
            </div>
            <div className="card-body">
                <div className="table-wrapper">
                    <Table tableClass="table-hover" columns={columns}>
                        {customersList}
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

export default Customers