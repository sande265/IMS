import { successAlert } from "../../actions/alert-actions";
import { editCustomer, getCustomer, newCustomer } from "../../actions/customer-actions";
import { localValidation } from "../../helpers/ValidationHelper";
import ContentWrapper from "../../Layout/Main";
import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { StatusInput, BasicInput } from "../../shared/tableComponents/form-elements";

const initState = {
    data: {
        customer_name: '',
        email: '',
        contact: '',
        location: '',
        status: true
    },
    error: {
        customer_name: '',
        email: '',
        contact: '',
        location: '',
    }
}

const NewEditCustomers = (props) => {
    let { id } = props.match.params;
    const links = [
        {
            name: 'Customers',
            link: '/customers'
        },
        {
            name: id ? 'Edit' : 'New',
        }
    ]

    const { customer } = useSelector(state => ({
        customer: state.customers.customer,
    }), shallowEqual)

    const [state, setState] = useState(initState)

    const dispatch = useDispatch()

    useEffect(() => {
        if (id)
            fetchData()
    }, [])

    const fetchData = () => {
        dispatch(getCustomer(id))
    }

    useEffect(() => {
        if (id && customer && customer.data)
            setState({ ...state, data: customer.data })
    }, [customer])

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
        customer_name: ['required'],
        contact: ['required'],
        email: ['required', 'email']
    }

    const handleSubmit = (e) => {
        let data = { ...state.data };
        e.preventDefault();
        const validation = localValidation(data, validationRule, error, false)
        if (validation.localvalidationerror) {
            setState({ ...state, error: validation.error })
        } else {
            if (id) {
                dispatch(editCustomer(id, data)).then(
                    res => {
                        if (res.status === 422) {
                            setState({ ...state, error: res.data })
                        } else if (res.status === 200) {
                            dispatch(successAlert(res.data.message))
                        }
                    }
                )
            } else {
                dispatch(newCustomer(data)).then(
                    res => {
                        if (res.status === 422) {
                            setState({ ...state, error: res.data.message })
                        } else if (res.status === 200) {
                            dispatch(successAlert(res.data.message))
                            props.history.push('/customers')
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
        console.log("form reset");
        id ? fetchData() : setState(initState)
    }

    console.log("state", state);

    let { data, error } = state;

    return <ContentWrapper links={links} options={['save', 'reset', 'back']}
        onSubmit={handleSubmit} onReset={handleReset} onBack={goBack}>
        <div className="row">
            <div className="col-xs-12 col-sm-6">
                <div className="card">
                    <div className="card-header with-border">
                        Customer Details
                    </div>
                    <div className="card-body">
                        <BasicInput
                            label="Customer Name *"
                            name="customer_name"
                            value={data.customer_name}
                            onChange={onChange}
                            error={error.customer_name}
                        />
                        <BasicInput
                            label="Contact *"
                            name="contact"
                            value={data.contact}
                            onChange={onChange}
                            error={error.contact}
                        />
                        <BasicInput
                            label="Email *"
                            name="email"
                            value={data.email}
                            onChange={onChange}
                            error={error.email}
                        />
                        <BasicInput
                            label="Location"
                            name="location"
                            value={data.location}
                            onChange={onChange}
                            error={error.location}
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

export default NewEditCustomers;