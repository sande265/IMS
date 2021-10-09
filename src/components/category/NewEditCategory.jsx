import { successAlert } from "../../actions/alert-actions";
import { localValidation } from "../../helpers/ValidationHelper";
import ContentWrapper from "../../Layout/Main";
import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { StatusInput, BasicInput } from "../../shared/tableComponents/form-elements";
import { editCategory, getCategory, newCategory } from "../../actions/category-actions";

const initState = {
    data: {
        name: '',
        description: '',
        status: true
    },
    error: {
        name: '',
        description: '',
        status: ''
    }
}

const NewEditCategory = (props) => {
    let { id } = props.match.params;
    const links = [
        {
            name: 'Categories',
            link: '/categories'
        },
        {
            name: id ? 'Edit' : 'New',
        }
    ]

    const { category } = useSelector(state => ({
        category: state.categories.category,
    }), shallowEqual)

    const [state, setState] = useState(initState)

    const dispatch = useDispatch()

    useEffect(() => {
        if (id)
            fetchData()
    }, [])

    const fetchData = () => {
        dispatch(getCategory(id))
    }

    useEffect(() => {
        if (id && category && category.data)
            setState({ ...state, data: category.data })
    }, [category])

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
        name: ['required'],
    }

    const handleSubmit = (e) => {
        let data = { ...state.data };
        e.preventDefault();
        const validation = localValidation(data, validationRule, error, false)
        if (validation.localvalidationerror) {
            setState({ ...state, error: validation.error })
        } else {
            if (id) {
                dispatch(editCategory(id, data)).then(
                    res => {
                        if (res?.status === 422) {
                            setState({ ...state, error: res.data })
                        } else if (res?.status === 200) {
                            dispatch(successAlert(res.data.message))
                        }
                    }
                )
            } else {
                dispatch(newCategory(data)).then(
                    res => {
                        if (res?.status === 422) {
                            setState({ ...state, error: res.data.message })
                        } else if (res?.status === 200) {
                            dispatch(successAlert(res.data.message))
                            props.history.push('/categories')
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
            <div className="col-xs-12 col-sm-8">
                <div className="card">
                    <div className="card-header with-border">
                        Category Details
                    </div>
                    <div className="card-body">
                        <BasicInput
                            label="Category Name *"
                            name="name"
                            value={data.name}
                            onChange={onChange}
                            error={error.name}
                        />
                        <BasicInput
                            label="Description *"
                            name="description"
                            value={data.description}
                            onChange={onChange}
                            error={error.description}
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

export default NewEditCategory;