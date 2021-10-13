import React, { useEffect, Fragment } from 'react';
import { NavLink } from "react-router-dom";
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { SpinnerLoader } from '../shared/loader/Loader';
import { ActionHeader } from '../shared/tableComponents/form-elements';
import { toggleSidebar } from '../actions/site-actions';


const ContentWrapper = (props) => {

    const { sidebar } = useSelector(state => ({
        sidebar: state.site.collapsed
    }), shallowEqual)

    let { title, subtitle, links, options, onSubmit, onBack, onCancel, onReset, loading, onCreate } = props
    return (
        <main className={`main ${sidebar ? 'toggled' : ''}`} id="main">
            <div className="pageHeader">
                <h5 className={"h5 pt-4 px-4 px-md-4 mb-0"}>
                    {title && <h3 className="pageTitle">
                        {title}
                        {subtitle && <small className="text-muted">{subtitle}</small>}
                    </h3>}
                    <div className="title-breadcrum ">
                        <nav aria-label="breadcrumb">
                            <ol className={`breadcrumb m-0 ${options && 'px-2 py-1 align-items-center'}`}>
                                <li className="breadcrumb-item">
                                    <NavLink to="/dashboard" title={'Dashboard'}
                                        className={"text-decoration-none"}>
                                        <i className="fa fa-home"></i> Dashboard
                                    </NavLink>
                                </li>
                                {links && links.map((item, i) => {
                                    return (
                                        <Fragment key={i}>
                                            <li className="breadcrumb-item">
                                                {item.link ? <NavLink to={item.link} title={item.name}
                                                    className={"text-decoration-none"}>{item.name}</NavLink>
                                                    : <a href className="text-decoration-none">{item.name}</a>}
                                            </li>
                                        </Fragment>
                                    )
                                })}
                                <ActionHeader options={options}
                                    onSubmit={onSubmit}
                                    onCancel={onCancel}
                                    onBack={onBack}
                                    onReset={onReset}
                                    onCreate={onCreate}
                                />
                            </ol>
                        </nav>

                    </div>
                </h5>
                <div className="my-2"></div>
            </div>
            <div className="mainContent container-fluid px-4 px-md-4 pt-2">
                <section className="content-frame">
                    {loading ?
                        <div className="d-flex h-100 align-items-center justify-content-center">
                            <SpinnerLoader /></div> :
                        props.children}
                </section>
            </div>
        </main>
    )
}

export default ContentWrapper;