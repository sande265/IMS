import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from "react-router";
import { NavLink } from 'react-router-dom';
import { toggleSidebar } from '../actions/site-actions';
import { handleLogout } from '../helpers/GeneralHelpers';

const links = [
    {
        type: "link",
        path: "/dashboard",
        label: "Home",
        newWindow: false,
    },
    {
        type: "link",
        path: "/new-sale",
        label: "New Sale",
        newWindow: false,
    }
]

const Header = (props) => {
    let pathname = window.location.pathname;
    const history = useHistory();
    let title;
    if (pathname === "/") {
        title = "Dashboard";
    } else {
        title = pathname.split('/');
    }

    const { sidebar } = useSelector(state => ({
        sidebar: state.site.collapsed
    }), shallowEqual)

    const dispatch = useDispatch()

    const [display, setDisplay] = useState('none')

    const LinkItem = React.memo((props) => {
        const { link } = props
        return <li className="nav-item d-none d-sm-inline-block">
            <NavLink to={link.path ? link.path : "#"} className={`nav-link`}>
                <p>{link.label}</p>
            </NavLink>
        </li>
    })


    const useOutsideAlerter = (ref) => {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setDisplay('none')
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const handleToggleSidebar = () => {
        dispatch(toggleSidebar(!sidebar));
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    return (
        <header id="header" className={`d-flex align-items-center justify-content-between px-4 bg-primary ${sidebar ? 'toggled' : ''}`}>
            <ul className="navbar-nav flex-row">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" id="toggleSidebar" onClick={handleToggleSidebar} href role="button" >
                        <i className="fas fa-bars"></i>
                    </a>
                </li>
                {links.map((link, idx) => {
                    return <LinkItem link={link} key={idx} idx={idx} />
                })}
            </ul>

            <div className="dropdown" ref={wrapperRef}>
                <a className="header-item" href onClick={() => display === 'block' ? setDisplay('none') : setDisplay('block')}>
                    <i className="ri-user-3-line fs-6"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right" style={{ display: display }}>
                    <a href className="dropdown-item d-flex" onClick={() => history.push('/profile')}>
                        <i className="ri-user-line"></i>
                        <span className="ml-auto">Profile</span>
                    </a>
                    <a href className="dropdown-item d-flex" onClick={() => handleLogout()}>
                        <i className="ri-logout-box-line"></i>
                        <span className="ml-auto">
                            Logout
                        </span>
                    </a>
                </div>
            </div>
        </header>
    )
}

export default Header