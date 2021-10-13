import React, { useEffect, useRef, useState } from "react";
import MenuBar from "./MenuBar";
import { menu } from '../menus'
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../actions/site-actions";

const Sidebar = (props) => {
    let initState = {
        selectedItem: null,
        profile: {},
        addClassName: true,
        sideList: menu ? menu : []
    }

    const { sidebar } = useSelector(state => ({
        sidebar: state.site.collapsed
    }), shallowEqual)

    const [state, setState] = useState(initState)

    const handleItemSelect = (selectedItem) => {
        setState({ ...state, selectedItem })
    }

    const dispatch = useDispatch();

    useEffect(() => {
        if (window.innerWidth <= 768) {
            dispatch(toggleSidebar(true))
        } else if (window.innerWidth > 768) {
            dispatch(toggleSidebar(false))
        }
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                dispatch(toggleSidebar(true))
            } else if (window.innerWidth > 768) {
                dispatch(toggleSidebar(false))
            }
        })
    }, [])

    const { selectedItem } = state

    const useOutsideAlerter = (ref) => {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    if (window.innerWidth < 768) {
                        dispatch(toggleSidebar(!sidebar))
                    }
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    return (
        <div className="container-fluid">
            <div className="row">
                <nav id="sidebarMenu" className={`sidebar ${sidebar ? 'toggled' : ''}`} ref={wrapperRef}>
                    <div className="logo d-flex align-items-center justify-content-start">
                        <img src="/brand_logo.png" alt="logo" style={{ height: 50 }} />
                    </div>

                    <div className="position-sticky  mainNav">
                        <MenuBar
                            menuItems={state.sideList}
                            onItemSelect={handleItemSelect}
                            menuTitle={selectedItem?.header}
                        />
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Sidebar