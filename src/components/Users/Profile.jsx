import { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { errorAlert, successAlert } from "../../actions/alert-actions";
import { getLoggedUser, updateUser } from "../../actions/auth-actions";
import ContentWrapper from "../../Layout/Main";
import { Status } from "../../shared/tableComponents";
import { BasicInput } from "../../shared/tableComponents/form-elements";

const Profile = (props) => {
    const links = [
        {
            name: 'Profile',
        }
    ];

    const { me, } = useSelector(state => ({
        me: state.currentUser.me,
    }), shallowEqual)
    const dispatch = useDispatch()

    const [state, setState] = useState({
        data: {
            name: '',
            email: '',
            username: '',
            role: '',
            status: '',
            contact: '',
            image: ''
        },
        error: {},
        options: [
            "back"
        ],
        disabled: true
    })

    useEffect(() => {
        dispatch(getLoggedUser())
    }, [])

    useEffect(() => {
        if (me && me.logged)
            setState({ ...state, data: me.logged });
    }, [me])

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

    const handleSubmit = () => {
        let data = { ...state.data };
        let temp = {};
        temp['name'] = data.name;
        temp['username'] = data.username;
        temp['status'] = data.status;
        temp['email'] = data.email;
        temp['image'] = data.image;
        temp['role'] = data.role;
        temp['contact'] = data.contact;
        dispatch(updateUser(data.id, temp)).then(
            res => {
                if (res?.status === 422) {
                    setState({ ...state, error: res?.data.message })
                } else if (res.status === 400) {
                    dispatch(errorAlert(res?.data?.message))
                } else {
                    dispatch(successAlert(res?.data?.message))
                }
            }
        )
    }

    const toggleEdit = () => {
        if (disabled) {
            setState({
                ...state,
                disabled: false,
                options: ['back', 'save'],
            })
        } else {
            setState({
                ...state,
                disabled: true,
                options: ['back']
            })
        }
    }

    let { name, image, username, email, contact, role, status } = state.data;
    let { error, disabled, options } = state;

    return <ContentWrapper links={links} options={options} onSubmit={handleSubmit} onBack={() => props.history.push('/dashboard')}>
        <div className="mx-auto profileCard d-flex align-items-center justify-content-center">
            <div className="card">
                <div className="card-body">
                    <button className="float-right m-2 editBtn" data-toggle="tooltip" data-placement="bottom" title="Edit" onClick={toggleEdit}>
                        <i className="ri-pencil-line"></i>
                    </button>
                    <div className="form-group d-flex justify-content-center">
                        <img src={image} alt="user_image" style={{ width: '100px', borderRadius: 45 }} />
                    </div>
                    <BasicInput
                        name="name"
                        label="Name"
                        value={name}
                        onChange={handleChange}
                        error={error.name}
                        disabled={disabled}
                    />
                    <BasicInput
                        name="email"
                        label="Email"
                        disabled
                        value={email}
                        onChange={handleChange}
                        error={error.email}
                    />
                    <BasicInput
                        name="username"
                        label="Username"
                        disabled
                        value={username}
                        onChange={handleChange}
                        error={error.username}
                    />
                    <BasicInput
                        name="role"
                        label="Role"
                        value={role}
                        onChange={handleChange}
                        error={error.role}
                        disabled={disabled}
                    />
                    <div className="form-group">
                        <label htmlFor="status">User Status: </label>
                        <div className="float-right"><Status status={status} /></div>
                    </div>
                    <BasicInput
                        name="contact"
                        label="Contact Number"
                        value={contact}
                        onChange={handleChange}
                        error={error.contact}
                        disabled={disabled}
                    />
                </div>
            </div>
        </div>
    </ContentWrapper>
}

export default Profile;