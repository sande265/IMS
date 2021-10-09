import { deleteInventory, getInventories } from "../../actions/inventory-actions";
import ContentWrapper from "../../Layout/Main"
import { useEffect, useState } from "react";
import { shallowEqual, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Pagination, Status, TableCrudBox, TableHeader, Table } from "../../shared/tableComponents";
import { SpinnerLoader } from "../../shared/loader/Loader";
import { getUrlParameter, getDate, generateQueryParams } from "../../helpers/GeneralHelpers";
import DeleteModel from "../../shared/modals/DeleteModal";

const links = [
    {
        name: 'Inventory',
        path: '/inventory'
    }
]

const columns = [
    "id", "name", "color", "price", "actual_price",
    { name: 'Quantity', alignment: 'right' },
    { name: "status", alignment: 'center' },
    { name: "is sold", alignment: 'center' },
    { name: 'purchased date', alignment: 'right' },
    { name: 'actions', alignment: 'center' }
]

const Inventory = (props) => {
    let pathname = props.location.pathname
    let search_params = props.location.search

    const { inventories } = useSelector(state => ({
        inventories: state.inventory.inventories,
    }), shallowEqual);
    const dispatch = useDispatch()

    const [state, setState] = useState({
        data: {},
        showModal: false
    })
    const [loading, setLoading] = useState(true)
    const [modal, setModal] = useState({
        showModal: false
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

    // useEffect(() => {
    //     fetchData()
    // }, [])

    const handleToggleModal = (id) => {
        state.showModal
            ? setModal({ ...modal, showModal: !modal.showModal })
            : setModal({ ...modal, showModal: !modal.showModal, itemToDelete: id });
    }

    const deleteItem = () => {
        dispatch(deleteInventory(modal.itemToDelete)).then(res => fetchData());
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
        if (inventories)
            setState({ ...state, data: inventories })
    }, [inventories])

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
        dispatch(getInventories({ limit, page, q, sort_by, sort_field, filterKey, filterValue, filter }))
            .then(res => setLoading(false))
        setUrlQuery()
    }

    let { data, current_page, from, last_page, per_page, to, total } = state.data;

    let inventoriesList = loading ? <tr className="text-center">
        <td colSpan="10"><SpinnerLoader /></td>
    </tr> : data && data.length > 0 ? data.map((items, idx) => {
        let { id, actual_price, color, price, product_name, status, purchased_date, is_sold, qty } = items;
        return <tr key={idx}>
            <td>{id}</td>
            <td>{product_name ? product_name : '-'}</td>
            <td>{color ? color : '-'}</td>
            <td>{price ? price : '-'}</td>
            <td>{actual_price ? actual_price : '-'}</td>
            <td className="text-right">{qty ? qty : 0}</td>
            <td className="text-center">
                <Status status={status} />
            </td>
            <td className="text-center">
                <Status status={is_sold} activeLabel="Yes" inActiveLabel="No" />
            </td>
            <td className="text-right">{purchased_date ? getDate(purchased_date) : '-'}</td>
            <td className="text-center">
                <TableCrudBox type="inventory" noView id={id} handleToggleModal={e => handleToggleModal(id)} />
            </td>
        </tr>
    }) : <tr className="text-center">
        <td colSpan="10">No Records</td>
    </tr>

    const onCreate = () => {
        props.history.push('/inventory/new')
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

    return <ContentWrapper title="Inventory" links={links} options={['create']} onCreate={onCreate}>
        {modal.showModal && (
            <DeleteModel
                title='Delete Product'
                handleToggleModel={() => handleToggleModal()}
                deleteItem={() => deleteItem()}
            />
        )}
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
                        {inventoriesList}
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

export default Inventory;