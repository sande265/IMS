import {successAlert} from "../../actions/alert-actions";
import {localValidation} from "../../helpers/ValidationHelper";
import ContentWrapper from "../../Layout/Main";
import {useEffect, useState} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {StatusInput, BasicInput} from "../../shared/tableComponents/form-elements";
import {editDebtor, getDebtor, newDebtor} from "../../actions/debtor-actions";
import IconInput from "../../shared/tableComponents/form-elements/IconInput";

const initState = {
    data: {
        name: '',
        type: '',
        status: true,
        pri_amt: '',
        rate: '',
        accured_int: ''
    },
    error: {
        name: '',
        type: '',
        status: true,
        pri_amt: '',
        rate: '',
        accured_int: ''
    }
}

const NewEditDebtors = (props) => {
    let {id} = props.match.params;
    const links = [
        {
            name: 'Debtors',
            link: '/debtors'
        },
        {
            name: id ? 'Edit' : 'New',
        }
    ]

    const {debtor} = useSelector(state => ({
        debtor: state.debtors.debtor,
    }), shallowEqual)

    const [state, setState] = useState({...initState})

    const dispatch = useDispatch()

    useEffect(() => {
        if (id)
            fetchData()
    }, [])

    const fetchData = () => {
        dispatch(getDebtor(id))
    }

    useEffect(() => {
        if (id && debtor && debtor.data)
            setState({...state, data: debtor.data})
    }, [debtor])

    const onChange = (e) => {
        const {target} = e;
        let data = {...state.data};
        let error = {...state.error};
        const {name, type} = target;
        const value = type === 'checkbox' ? target.checked : target.value;
        data[name] = value;
        if (error[name] !== '') error[name] = ''
        setState({...state, data, error})
    }

    let validationRule = {
        name: ['required'],
        type: ['required'],
        status: ['required'],
        pri_amt: ['required'],
        rate: ['required'],
        accured_int: ['required'],
    }

    const handleSubmit = (e) => {
        let data = {...state.data};
        e.preventDefault();
        const validation = localValidation(data, validationRule, error, false)
        if (validation.localvalidationerror) {
            setState({...state, error: validation.error})
        } else {
            if (id) {
                dispatch(editDebtor(id, data)).then(
                    res => {
                        if (res?.status === 422) {
                            setState({...state, error: res.data})
                        } else if (res?.status === 200) {
                            dispatch(successAlert(res.data.message))
                        }
                    }
                )
            } else {
                dispatch(newDebtor(data)).then(
                    res => {
                        if (res?.status === 422) {
                            setState({...state, error: res.data.message})
                        } else if (res?.status === 200) {
                            dispatch(successAlert(res.data.message))
                            props.history.push('/debtors')
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

    let {data, error} = state;

    return <ContentWrapper links={links} options={['save', 'reset', 'back']}
        onSubmit={handleSubmit} onReset={handleReset} onBack={goBack}>
        <div className="row">
            <div className="col-xs-12 col-sm-8">
                <div className="card">
                    <div className="card-header with-border">
                        Debtor Details
                    </div>
                    <div className="card-body">
                        <BasicInput
                            label="Debtor Name *"
                            name="name"
                            value={data.name}
                            onChange={onChange}
                            error={error.name}
                        />
                        <BasicInput
                            label="Type *"
                            name="type"
                            value={data.type}
                            onChange={onChange}
                            error={error.type}
                        />
                        <BasicInput
                            label="Principal Amount *"
                            name="pri_amt"
                            value={data.pri_amt}
                            onChange={onChange}
                            error={error.pri_amt}
                        />
                        <IconInput
                            label="Rate *"
                            icon="ri-percent-line"
                            name="rate"
                            type="number"
                            value={data.rate}
                            onChange={onChange}
                            error={error.rate}
                        />
                        <BasicInput
                            label="Accured Intrest *"
                            name="accured_int"
                            value={data.accured_int}
                            onChange={onChange}
                            error={error.accured_int}
                        />
                    </div>
                </div>
            </div>
            <div className="col-xs-12 col-sm-4">
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

export default NewEditDebtors;