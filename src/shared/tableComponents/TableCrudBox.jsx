import React, { useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const TableCrudBox = (props) => {
    let { id, handleToggleModal, type, noView, noDelete, noEdit, actionBtn } = props

    const [NavItems, setNavItems] = useState([
        {
            type: "link",
            path: `/${type}/${id}`,
            title: "View",
            newWindow: false,
            icon: "ri-eye-fill",
            class: "table-view"
        },
        {
            type: "link",
            path: `/${type}/${id}/edit`,
            title: "Edit",
            newWindow: false,
            icon: "ri-pencil-fill",
            class: "table-edit"
        },
    ]);
    const noViewButton = () => {
        let items = [...NavItems]
        let idx = items && items.findIndex(x => x.title === 'View')
        items.splice(idx, 1)
        setNavItems(items)
    }

    const noEditButton = () => {
        let items = [...NavItems]
        let idx = items && items.findIndex(x => x.title === 'Edit')
        items.splice(idx, 1)
        setNavItems(items)
    }

    useEffect(() => {
        noView && noViewButton()
        noEdit && noEditButton()
    }, [noView, noEdit])

    useEffect(() => {
        if (noEdit && noView) {
            setNavItems([])
        }
    }, [noEdit, noView])

    const LinkItem = React.memo((props) => {
        const { link } = props
        return <NavLink to={link.path ? link.path : "#"} title={link.title} className={link.class}>
            <i className={link.icon}></i>
        </NavLink>
    })

    return <div className="btn-group">
        {NavItems.map((link, idx) => {
            return <LinkItem key={idx} link={link} />
        })}
        {noDelete ? '' : <a href onClick={(e) => { e.stopPropagation(); handleToggleModal(id) }} title="Delete" className="table-delete">
            <i className="ri-delete-bin-6-fill"></i>
        </a>}
    </div>

}

export default TableCrudBox;