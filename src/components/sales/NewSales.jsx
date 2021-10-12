import { Fragment, useEffect, useState } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { getInventories } from "../../actions/inventory-actions";
import { sellItem } from "../../actions/sale-actions";
import ContentWrapper from "../../Layout/Main";
import { SpinnerLoader } from "../../shared/loader/Loader";
import SimpleModal from "../../shared/modals/SimpleModal";
import SelectSearch from "../../shared/SelectSearch/SelectSearch";
import { BasicInput } from "../../shared/tableComponents/form-elements";

const NewSales = (props) => {
    const links = [
        {
            name: 'New Sale'
        }
    ]
    const { inventories } = useSelector(state => ({
        inventories: state.inventory.inventories,
    }), shallowEqual)
    const dispatch = useDispatch()

    const [state, setState] = useState({
        data: {
            product_id: '',
            qty: 1,
            sale_price: ''
        },
        error: {},
        inventoryList: [],
        loading: true,
        postLoading: false
    })

    const [modal, setModal] = useState({
        showModal: false
    })

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        dispatch(getInventories())
    }

    useEffect(() => {
        if (inventories && inventories.data) {
            let data = inventories.data.filter(x => x.qty >= 1).map(item => {
                return {
                    name: item.product_name,
                    value: item.id
                }
            })
            setState({ ...state, inventoryList: data, loading: false })
        }
    }, [inventories])

    const onOptionRefresh = (value) => {
        setState({ ...state, loading: true })
        dispatch(getInventories({ limit: 10, filter: [{ key: 'name', value: value }] }))
            .then(res => setState({ ...state, loading: false }))
    }

    const onSelectSearchChange = (e, name) => {
        let { value } = e;
        let data = { ...state.data };
        let error = { ...state.error };
        data[name] = value;
        error[name] = '';
        setState({
            ...state,
            data,
            error
        });
    }

    const handleChange = (e) => {
        const { target } = e;
        let data = { ...state.data };
        let error = { ...state.error };
        const { name, type } = target;
        const value = type === 'checkbox' ? target.checked : target.value;
        data[name] = value;
        if (error[name] !== '') error[name] = ''
        setState({ ...state, data, error })
    }

    const handleToggleModal = () => {
        state.showModal
            ? setModal({ ...modal, showModal: !modal.showModal })
            : setModal({ ...modal, showModal: !modal.showModal, });
    }

    const handleCancel = () => {
        props.history.push('/inventories');
    }

    const handleSale = () => {
        setState({ ...state, postLoading: true })
        let data = { ...state.data };
        let id = data.product_id;
        delete data.product_id
        dispatch(sellItem(id, data)).then(
            res => {
                setState({ ...state, postLoading: false })
                console.log("Res", res);
                if (res?.status === 422) {
                    setState({ ...state, error: res?.data?.message })
                }
                setModal({ ...modal, showModal: !modal.showModal });
            }
        )
    }

    let { inventoryList, loading, data, error, postLoading } = state;

    return <ContentWrapper title="New Sale" links={links} options={['back']} onBack={() => props.history.goBack()}>
        {modal.showModal && (
            <SimpleModal
                title='Sell Product'
                handleToggleModel={() => handleToggleModal()}
                onSubmit={() => handleSale()}
                message="Are you sure to Sell?"
                btnTitle="Sell"
            />
        )}
        <div className="w-50 mx-auto d-flex align-items-center justify-content-center">
            <div className="card">
                <div className="card-body">
                    <div className="form-group">
                        <label>Search Product</label>
                        <SelectSearch
                            options={inventoryList ? inventoryList : []}
                            value={data.product_id}
                            onChange={e => onSelectSearchChange(e, 'product_id')}
                            placeholder='Search Products'
                            onOptionsRefresh={e => onOptionRefresh(e)}
                            loading={loading}
                        />
                    </div>
                    {data.product_id &&
                        <Fragment>
                            <BasicInput
                                name="sale_price"
                                label="Sale Price"
                                placeholder="Please Enter Sale Price of the selected item."
                                onChange={handleChange}
                                error={error.sale_price}
                            />
                            <BasicInput
                                name="qty"
                                label="Quantity"
                                placeholder="Default Quantity is 1"
                                onChange={handleChange}
                                error={error.qty}
                            />
                            <div className="btn-group float-right">
                                <button className="btn btn-sm btn-secondary" onClick={handleCancel}>Cancel</button>
                                <button className="btn btn-sm btn-success" disabled={postLoading} onClick={handleToggleModal}>
                                    {postLoading ? <SpinnerLoader /> : 'Sell'}
                                </button>
                            </div>
                        </Fragment>}
                </div>
            </div>
        </div>
    </ContentWrapper>
}

export default NewSales;