import React from 'react';
import { useHistory } from "react-router";
import { NavLink } from 'react-router-dom';

const links = [
    {
        type: "link",
        path: "/dashboard",
        label: "Home",
        newWindow: false,
    },
]

const Header = (props) => {
    let pathname = window.location.pathname;
    const history = useHistory();
    let title;
    if (pathname === "/") {
        title = "Dashboard";
    } else {
        let _title = pathname.split('/');
        title = _title
    }
    const handleLogout = (props) => {
        localStorage.clear();
        sessionStorage.clear();
        history.push({
            pathname: "/"
        })
        window.location.reload(true)

    }

    const LinkItem = React.memo((props) => {
        const { link } = props
        return <li className="nav-item d-none d-sm-inline-block">
            <NavLink to={link.path ? link.path : "#"} className={`nav-link`}>
                <p>{link.label}</p>
            </NavLink>
        </li>
    })

    return (
        <header id="header" className={" d-flex align-items-center justify-content-between px-4 bg-primary"}>
            <ul className="navbar-nav flex-row">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" id="toggleSidebar" href role="button" >
                        <i className="fas fa-bars"></i>
                    </a>
                </li>
                {links.map((link, idx) => {
                    return <LinkItem link={link} key={idx} idx={idx} />
                })}
            </ul>

            <div>
                <div className="btn-group">
                    <span className="header-item" href onClick={() => history.push('/profile')}><i className="ri-user-3-line fs-6"></i></span>
                    {/* <a className="header-item pe-1" href onClick={handleLogout}><i className="ri-logout-box-r-line fs-6"></i></a> */}
                </div>
            </div>
        </header>
    )
}

export default Header