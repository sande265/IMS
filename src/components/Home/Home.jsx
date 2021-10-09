import { Fragment, useState } from "react"
import { useDispatch } from "react-redux"
import { errorAlert, successAlert } from "../../actions/alert-actions"
import { getUser } from "../../actions/users-actions"
import { SpinnerLoader } from "../../shared/loader/Loader"
import ContentWrapper from "../../Layout/Main"

const Home = (props) => {

    const initData = {
        name: '',
        type: ''
    }

    const [state, setState] = useState({
        data: initData,
        error: {
            name: ''
        },
        loading: false,
    })

    const dispatch = useDispatch()

    const handleChange = (e) => {
        e.persist()
        let { name, value } = e.target;
        let _data = { ...state.data };
        let _error = { ...state.error };
        _data[name] = value;
        if (_error[name] !== '') _error[name] = ''
        setState({ ...state, data: _data, error: _error })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setState({ ...state, loading: true })
        if (!data.name) {
            setState({ ...state, error: { name: ['Name is Required.'], loading: false } })
        } else {
            await dispatch(getUser(data.name, data.type)).then(
                res => {
                    setState({ ...state, loading: false })
                    if (res.status === 200) {
                        dispatch(successAlert("Successfully Retrived"))
                        props.history.push({
                            pathname: `/user/${data.name}`,
                            state: {
                                username: data.name,
                                type: data.type
                            }
                        })
                    }
                    if (res.status === 404) dispatch(errorAlert(res.data.message))
                }
            )
        }
    }

    let { data, error, loading } = state;

    return <ContentWrapper>
        <form onSubmit={handleSubmit} className=" d-flex justify-content-center align-items-center" >
            <div className="card ">
                <h5 className="card-header">Search Users / Organizations</h5>
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="type">Select type</label>
                        <select name="type" id="type" className="form-control" style={{ color: '#777' }} onChange={handleChange}>
                            <option value="">--- Select Search Option ---</option>
                            <option value="users">User</option>
                            <option value="orgs">Organization</option>
                        </select>
                    </div>
                    {data.type && <Fragment>
                        <div className="form-group">
                            <label htmlFor="name">{data.type === 'users' ? 'Username' : 'Organization Name'} * </label>
                            <input
                                name="name"
                                id="name"
                                className={`form-control mt-1 ${error.name && 'is-invalid'}`}
                                value={data.name}
                                onChange={handleChange}
                            />
                            {error['name'] && <small className="text-danger">{error['name']}</small>}
                        </div>
                        <button className="btn btn-primary mt-3 float-right" onClick={handleSubmit}>
                            {loading ? <SpinnerLoader /> : 'Submit'}
                        </button>
                    </Fragment>}
                </div>
            </div>
        </form>
    </ContentWrapper>
}

export default Home