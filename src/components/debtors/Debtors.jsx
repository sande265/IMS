import { Pagination, Status, Table, TableCrudBox, TableHeader } from "../../shared/tableComponents";
import ContentWrapper from "../../Layout/Main";
import { useEffect, useState } from "react";
import { generateQueryParams, getUrlParameter } from "../../helpers/GeneralHelpers";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { deleteDebtor, getAllDebtors } from "../../actions/debtor-actions";
import { SpinnerLoader } from "../../shared/loader/Loader";

const links = [
    {
        name: 'Debtors',
        path: '/debtors'
    }
]

const Debtors = (props) => {

    let pathname = props.location.pathname
    let search_params = props.location.search

    let columns = ['#', 'Debtor Name', 'Remaining Amount', 'Pending Intrest', 'rate', { name: 'actions', alignment: 'center', width: 150 }]

    const { debtors } = useSelector(state => ({
        debtors: state.debtors.debtors,
    }), shallowEqual);
    const dispatch = useDispatch()

    const [state, setState] = useState({
        data: {},
        showModal: false
    })
    const [loading, setLoading] = useState(true)
    const [modal, setModal] = useState({
        showModal: false,
        QRModal: false
    })
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

    const handleToggleModal = (id) => {
        state.showModal
            ? setModal({ ...modal, showModal: !modal.showModal })
            : setModal({ ...modal, showModal: !modal.showModal, itemToDelete: id });
    }

    const deleteItem = () => {
        dispatch(deleteDebtor(modal.itemToDelete)).then(res => fetchData());
        setModal({ ...modal, showModal: !modal.showModal });
    }

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

    useEffect(() => {
        if (debtors)
            setState({ ...state, data: debtors })
    }, [debtors])

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
        dispatch(getAllDebtors({ limit, page, q, sort_by, sort_field, filterKey, filterValue, filter }))
            .then(res => setLoading(false))
        setUrlQuery()
    }

    let { data, current_page, from, last_page, per_page, to, total } = state.data;

    let tableBody = loading ? <tr className="text-center">
        <td colSpan="10"><SpinnerLoader /></td>
    </tr> : data && data.length > 0 ? data.map((items, idx) => {
        let { id, name, remaning_amount, status, pending_intrest, rate } = items;
        return <tr key={idx}>
            <td>{id}</td>
            <td role="button" onClick={() => props.history.push(`/debtors/${id}/edit`)}>{name ? name : '-'}</td>
            <td>{remaning_amount ? 'Rs.' + remaning_amount : '-'}</td>
            <td className="text-center">
                <Status status={status} />
            </td>
            <td className="text-right">{pending_intrest ? 'Rs. ' + pending_intrest : '-'}</td>

            <td className="text-right">{rate ? rate + '%' : 0}</td>
            <td className="text-center">
                <TableCrudBox type="inventory" noView id={id} handleToggleModal={e => handleToggleModal(id)} />
            </td>
        </tr>
    }) : <tr className="text-center">
        <td colSpan="10">No Records</td>
    </tr>

    const onCreate = () => {
        props.history.push('/debtors/new')
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

    return <ContentWrapper title="Debtors" links={links} options={['create']} onCreate={onCreate}>
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
                        {tableBody}
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

export default Debtors;