import { localValidation } from "../../helpers/ValidationHelper";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../actions/auth-actions";
import { isAuthenticated } from "../../helpers/GeneralHelpers";

const Login = (props) => {

    const [state, setState] = useState({
        data: {
            username: '',
            password: ''
        },
        error: {
            // username: '',
            // password: ''
        },
    })

    useEffect(() => {
        const loggedin = isAuthenticated()
        if (loggedin) {
            props.history.push('/dashboard')
        }
    }, [])

    const dispatch = useDispatch()

    const onChange = (e) => {
        e.preventDefault()
        let { name, value } = e.target;
        let _data = { ...state.data };
        let _error = { ...state.error };
        _data[name] = value;
        if (_error[name] !== '')
            _error[name] = ''
        setState({ ...state, data: _data, error: _error })
    }

    let validationRule = {
        username: ['required'],
        password: ['required']
    }

    const handleSubmit = (e) => {
        let { data, error } = state;
        e.preventDefault();
        const validation = localValidation(data, validationRule, error, false)
        if (validation.localvalidationerror) {
            setState({ ...state, error: validation.error })
        } else {
            let { username, password } = data;
            dispatch(loginUser({ username, password })).then(
                res => {
                    if (res && res.status === 200) {
                        props.history.push('/dashboard')
                    }
                }
            )
        }
    }

    let { data, error } = state;

    return <div className="content">
        <div className="row content-wrapper">
            <div className="col-12 mx-auto">
                <div className="card z-index-0">
                    <div className="card-header text-center pt-4">
                        <h5>Login with</h5>
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
                        <div className="ml-auto px-1" style={{ color: "#fff", fontSize: 50 }}>
                            <i className="fab fa-facebook"></i>
                        </div>
                        <div className="mx-auto px-1 " style={{ color: "#fff", fontSize: 50 }}>
                            <i className="fab fa-apple"></i>
                        </div>
                        <div className="mr-auto px-1" style={{ color: "#fff", fontSize: 50 }}>
                            <i className="fab fa-google"></i>
                        </div>
                    </div>
                    <div className="mt-2 text-center" style={{ position: 'relative' }}>
                        <p className="text-sm font-weight-bold mb-2 text-secondary text-border d-inline z-index-2 px-3">
                            or
                        </p>
                    </div>
                    <div className="card-body">
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="mb-3">
                                <input
                                    type="username"
                                    name="username"
                                    className="form-control"
                                    placeholder="Enter Your Username"
                                    aria-label="Email"
                                    onChange={onChange}
                                // value={data.username}
                                />
                                {error['username'] && <small className="text-danger">{error['username']}</small>}
                            </div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Password"
                                    aria-label="Password"
                                    onChange={onChange}
                                // value={data.password}
                                />
                                {error['password'] && <small className="text-danger">{error['password']}</small>}
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn bg-gradient-dark w-100 my-4 mb-2">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Login;