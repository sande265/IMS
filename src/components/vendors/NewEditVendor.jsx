import { successAlert } from "../../actions/alert-actions";
import { getVendor, createVendor, editVendor } from "../../actions/vendor-actions";
import { localValidation } from "../../helpers/ValidationHelper";
import ContentWrapper from "../../Layout/Main";
import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { StatusInput, BasicInput } from "../../shared/tableComponents/form-elements";

const initState = {
    data: {
        vendor_name: '',
        total: '',
        purchase_amount: '',
        purchase_date: '',
        status: true
    },
    error: {
        endor_name: '',
        total: '',
        purchase_amount: '',
        purchase_date: '',
    }
}

const NewEditVendors = (props) => {
    let { id } = props.match.params;
    const links = [
        {
            name: 'Vendors',
            link: '/vendors'
        },
        {
            name: id ? 'Edit' : 'New',
        }
    ]

    const { vendor } = useSelector(state => ({
        vendor: state.vendors.vendor,
    }), shallowEqual)

    const [state, setState] = useState(initState)

    const dispatch = useDispatch()

    useEffect(() => {
        if (id)
            fetchData()
    }, [])

    const fetchData = () => {
        dispatch(getVendor(id))
    }

    useEffect(() => {
        if (id && vendor && vendor.data)
            setState({ ...state, data: vendor.data })
    }, [vendor])

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

    let validationRule = {
        vendor_name: ['required'],
    }

    const handleSubmit = (e) => {
        let data = { ...state.data };
        e.preventDefault();
        const validation = localValidation(data, validationRule, error, false)
        if (validation.localvalidationerror) {
            setState({ ...state, error: validation.error })
        } else {
            if (id) {
                dispatch(editVendor(id, data)).then(
                    res => {
                        if (res.status === 422) {
                            setState({ ...state, error: res.data })
                        } else if (res.status === 200) {
                            dispatch(successAlert(res.data.message))
                        }
                    }
                )
            } else {
                dispatch(createVendor(data)).then(
                    res => {
                        if (res.status === 422) {
                            setState({ ...state, error: res.data.message })
                        } else if (res.status === 200) {
                            dispatch(successAlert(res.data.message))
                            props.history.push('/vendors')
                        }
                    }
                )
            }
        }
    }

    const goBack = () => {
        props.history.goBack();
    }

    const handleReset = () => {
        id ? fetchData() : setState(initState)
    }

    let { data, error } = state;

    return <ContentWrapper links={links} options={['save', 'reset', 'back']}
        onSubmit={handleSubmit} onReset={handleReset} onBack={goBack}>
        <div className="row">
            <div className="col-xs-12 col-sm-6">
                <div className="card">
                    <div className="card-header with-border">
                        Vendor Details
                    </div>
                    <div className="card-body">
                        <BasicInput
                            label="Vendor Name *"
                            name="vendor_name"
                            value={data.vendor_name}
                            onChange={onChange}
                            error={error.vendor_name}
                        />
                        <BasicInput
                            label="Purchase Amount"
                            name="purchase_amount"
                            value={data.purchase_amount}
                            onChange={onChange}
                            error={error.purchase_amount}
                        />
                        <BasicInput
                            label="Purchase Date"
                            name="purchase_date"
                            type="date"
                            value={data.purchase_date}
                            onChange={onChange}
                            error={error.purchase_date}
                        />
                        <BasicInput
                            label="Total"
                            name="total"
                            value={data.total}
                            onChange={onChange}
                            error={error.total}
                        />
                    </div>
                </div>
            </div>
            <div className="col-xs-12 col-sm-6">
                <div className="card">
                    <div className="card-header with-border">
                        Status
                    </div>
                    <div className="card-body">
                        <StatusInput
                            name="status"
                            checked={data.status}
                            onChange={onChange}
                            error={error.status}
                        />
                    </div>
                </div>
            </div>
        </div>
    </ContentWrapper>
}

export default NewEditVendors;