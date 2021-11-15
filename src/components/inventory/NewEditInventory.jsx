import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { BasicInput, FileInput, StatusInput } from "../../shared/tableComponents/form-elements";
import ContentWrapper from "../../Layout/Main"
import { getInventory, editInventory, createInventory } from "../../actions/inventory-actions";
import { localValidation } from "../../helpers/ValidationHelper";
import { successAlert } from "../../actions/alert-actions";
import { getDate } from "../../helpers/GeneralHelpers";
import ProductInfo from "./QR/productInfoInQR";

const initState = {
    loading: false,
    data: {
        product_name: '',
        color: '',
        price: '',
        actual_price: '',
        sale_price: '',
        purchased_date: '',
        image: '',
        sold_date: '',
        image_preview: '',
        qty: '',
        slug: '',
        status: true
    },
    error: {}
}

const NewEditInventory = (props) => {

    const { id } = props.match.params

    const links = [
        {
            name: 'Inventory',
            link: '/inventories'
        },
        {
            name: id ? 'Edit' : "New",
        }
    ]

    const { inventory } = useSelector(state => ({
        inventory: state.inventory.inventory,
    }), shallowEqual)

    const [state, setState] = useState(initState)

    const dispatch = useDispatch()

    useEffect(() => {
        if (id)
            fetchData()
        if (!id)
            setState(initState)
    }, [])

    const fetchData = () => {
        dispatch(getInventory(id))
    }

    useEffect(() => {
        if (inventory && inventory.data && parseInt(inventory.data.id) === parseInt(id)) {
            let data = { ...inventory.data }
            if (data.purchased_date) data['purchased_date'] = getDate(data.purchased_date)
            if (data.sold_date !== null) data['sold_date'] = getDate(data.sold_date)
            if (data.image) data['image_preview'] = data.image
            setState({ ...state, data, loading: false })
        }
    }, [id, inventory])

    const onChange = (e) => {
        const { target } = e;
        let data = { ...state.data };
        let error = { ...state.error };
        const { name, type } = target;
        const value = type === 'checkbox' ? target.checked : target.value;
        data[name] = value;
        if (error[name] !== '') error[name] = ''
        setState({ ...state, data, error })
    }

    const onImageUpload = (e) => {
        let { name } = e.target;
        let _data = { ...state.data };
        let _error = { ...state.error };
        let file = e.target.files[0];
        if (file) {
            _data[name] = file;
            _data['image_preview'] = URL.createObjectURL(file)
        }
        if (_error[name] !== '') _error[name] = '';
        setState({ ...state, data: _data, error: _error });
    }

    let validationRule = {
        product_name: ['required'],
        color: ['required'],
        price: ['required', 'numeric'],
        actual_price: ['required'],
        qty: ['required']
        // purchased_date: ['required']
    }

    const handleSubmit = (e) => {
        let data = { ...state.data };
        e.preventDefault();
        const validation = localValidation(data, validationRule, error, false)
        if (validation.localvalidationerror) {
            setState({ ...state, error: validation.error })
        } else {
            if (id) {
                let formData = new FormData();
                if (data.image) {
                    formData.append("id", id)
                    delete initState.data.image_preview
                    Object.keys(initState.data).map(item => {
                        if (data[item]) {
                            formData.append(item, data[item])
                        }
                    })
                    formData.append("_method", "patch")
                }
                dispatch(data.image ? createInventory(formData) : editInventory(id, data)).then(
                    res => {
                        if (res.status === 422) {
                            setState({ ...state, error: res.data.message })
                        } else if (res.status === 200) {
                            dispatch(successAlert(res.data.message))
                        }
                    }
                )
            } else {
                let formData = new FormData();
                Object.keys(data).map(item => {
                    if (data[item]) {
                        formData.append(item, data[item])
                    }
                })
                dispatch(createInventory(formData)).then(
                    res => {
                        if (res.status === 422) {
                            setState({ ...state, error: res.data.message })
                        } else if (res.status === 200) {
                            dispatch(successAlert(res.data.message))
                            props.history.push('/inventories')
                        }
                    }
                )
            }
        }
    }

    const handleBack = () => {
        props.history.goBack()
    }

    const handleReset = () => {
        id ? fetchData() : setState(initState)
    }

    const removeImage = () => {
        let data = { ...state.data }
        data['image'] = ''
        data['image_preview'] = ''
        setState({ ...state, data })
    }

    let { data, error } = state;

    let imagePreview = null
    if (data.image_preview)
        imagePreview = <div className="img-container">
            <img src={data.image_preview} className="img-preview" alt="img" />
            <i className="fa fa-times-circle text-danger img-icon" onClick={removeImage}></i>
        </div>

    return <ContentWrapper links={links} options={['save', 'reset', 'back']}
        loading={state.loading}
        onSubmit={handleSubmit}
        onBack={handleBack}
        onReset={handleReset}>
        <div className="row">
            <div className="col-xs-12 col-sm-6">
                <div className="card">
                    <div className="card-header with-border">
                        Product Info
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-xs-12 col-sm-6">
                                <BasicInput
                                    label="Product Name *"
                                    name="product_name"
                                    value={data.product_name}
                                    onChange={onChange}
                                    error={error.product_name}
                                />
                            </div>
                            <div className="col-xs-12 col-sm-6">
                                <BasicInput
                                    label="Color *"
                                    name="color"
                                    value={data.color}
                                    onChange={onChange}
                                    error={error.color}
                                />
                            </div>
                            <div className="col-xs-12 col-sm-6">
                                <BasicInput
                                    label="Price *"
                                    name="price"
                                    value={data.price}
                                    onChange={onChange}
                                    error={error.price}
                                    type="number"
                                />
                            </div>
                            <div className="col-xs-12 col-sm-6">
                                <BasicInput
                                    label="Quantity"
                                    name="qty"
                                    value={data.qty}
                                    onChange={onChange}
                                    error={error.qty}
                                    type="number"
                                />
                            </div>
                            <div className="col-xs-12 col-sm-6">
                                <BasicInput
                                    label="Actual Price *"
                                    name="actual_price"
                                    value={data.actual_price}
                                    type="number"
                                    onChange={onChange}
                                    error={error.actual_price}
                                />
                            </div>
                            {id &&
                                <div className="col-xs-12 col-sm-6">
                                    <BasicInput
                                        label="Sale Price"
                                        name="sale_price"
                                        value={data.sale_price}
                                        type="number"
                                        onChange={onChange}
                                        error={error.sale_price}
                                    />
                                </div>}
                            {id &&
                                <div className="col-xs-12 col-sm-6">
                                    <BasicInput
                                        label="Sale Date"
                                        name="sold_date"
                                        value={data.sold_date}
                                        type="date"
                                        onChange={onChange}
                                        error={error.sold_date}
                                    />
                                </div>}
                            <div className="col-xs-12 col-sm-6">
                                <BasicInput
                                    label="Purchased Date *"
                                    name="purchased_date"
                                    type="date"
                                    value={data.purchased_date}
                                    onChange={onChange}
                                    error={error.purchased_date}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {id && <div className="card">
                    <div className="card-header with-border">
                        Product QR
                    </div>
                    <div className="card-body">
                        <ProductInfo value={id} />
                    </div>
                </div>}
            </div>
            <div className="col-xs-12 col-sm-6">
                <div className="card">
                    <div className="card-header with-border">
                        Status
                    </div>
                    <div className="card-body">
                        <StatusInput
                            name="status"
                            onChange={onChange}
                            checked={data.status}
                            label="Active"
                        />
                    </div>
                </div>
                <div className="card">
                    <div className="card-header with-border">
                        Product Image
                    </div>
                    <div className="card-body">
                        <FileInput
                            type="file"
                            label="Select Product Image"
                            name="image"
                            // value={state.data.image}
                            onChange={e => onImageUpload(e)}
                            error={error.image}
                        />
                        {imagePreview}
                    </div>
                </div>
            </div>
        </div>
    </ContentWrapper>
}

export default NewEditInventory;