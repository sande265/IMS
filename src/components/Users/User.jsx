import { getUser, getUserRepos } from "../../actions/users-actions";
import { isEmptyObject } from "jquery";
import { useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux"

const User = (props) => {

    let username = props.location && props.location.state?.username
    let type = props.location && props.location.state?.type

    const { user, repos } = useSelector(state => ({
        user: state.user && state.user?.user,
        repos: state.user && state.user?.repos
    }), shallowEqual)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserRepos(username, type))
    }, [])

    useEffect(() => {
        if (isEmptyObject(user))
            dispatch(getUser(username, type))
    }, [user])

    return <div className="container">
        <span className="" >
            <button className="btn py-2 px-3" onClick={() => props.history.push('/')}>
                <i className="fa fa-undo"></i> Back
            </button>
        </span>
        <div className="row">
            <div className="ml-auto mr-auto col-md-10 col-xl-6">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">{type === 'users' ? 'User' : 'Organization'} Details</h3>
                    </div>
                    <div className="card-body mx-5">
                        <div className="d-flex justify-content-center align-items-center">
                            <img style={{ borderRadius: '50%', width: '25%' }} src={user?.avatar_url} alt="avatar" />
                        </div>
                        <br />
                        <div className="mb-2" style={{ borderBottom: '1px solid #666' }}>
                            <span>Name:</span>
                            <span className="float-right">{user.name ? user.name : user.login}</span>
                        </div>
                        {type === 'users' && <div className="mb-2" style={{ borderBottom: '1px solid #666' }}>
                            <span>Bio:</span>
                            <span className="float-right">{user?.bio}</span>
                        </div>}
                        {type === 'users' && <div className="mb-2" style={{ borderBottom: '1px solid #666' }}>
                            <span>Blog:</span>
                            <span className="float-right">{user?.blog}</span>
                        </div>}
                        <div className="mb-2" style={{ borderBottom: '1px solid #666' }}>
                            <span>Github URL:</span>
                            <a className="float-right" rel="noreferrer" href={user?.html_url} target="_blank" >{user?.html_url}</a>
                        </div>
                        <div className="mb-2" style={{ borderBottom: '1px solid #666' }}>
                            <span>Public Repos:</span>
                            <span className="float-right">{user?.public_repos}</span>
                        </div>
                        <div >
                            <span>Location:</span>
                            <span className="float-right">{user.location ? user.location : 'NA'}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ml-auto mr-auto col-md-10 col-xl-6">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Repositories</h3>
                    </div>
                    <table className="table table-striped table-hover ">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {repos && repos.length > 0 ? repos.map((repo, idx) => {
                                return <tr>
                                    <td>
                                        <a href={repo?.html_url} target="_blank" rel="noreferrer">{repo?.name}</a>
                                    </td>
                                    <td>{repo.description ? repo.description : 'NA'}</td>
                                </tr>
                            }) : <tr>
                                <td>No Repos Found</td>
                            </tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
}

export default User