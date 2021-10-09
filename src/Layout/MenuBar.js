import React, { Component, Fragment } from 'react';
import SubMenu from './SubMenu';
import { Link } from "react-router-dom";


class MenuBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sideTreeList: [...props.menuItems],
            selectedItem: null,
            selectedSubItem: null,
            currentPath: null,
            addClassName: true
        };
    }

    componentDidMount() {
        const path = window.location.pathname;
        this.showHideMenu(path);
        window.addEventListener("resize", this.resize.bind(this));
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 1024) {
                this.setState(({
                    addClassName: false
                }))
            }
            if (window.innerWidth > 983) {
                this.setState({
                    addClassName: true
                })

            }
        }, false);

    }

    resize() {
        if (window.innerWidth <= 1024) {
            this.setState(({
                addClassName: true
            }))
        }
        if (window.innerWidth > 983) {
            this.setState({
                addClassName: false
            })

        }
    }


    componentDidUpdate() {
        const { pathname } = window.location;
        if (pathname != this.state.currentPath) {
            this.setState({ currentPath: pathname })
            this.showHideMenu(pathname);
        }
    }

    showHideMenu(id) {
        const sideTreeList = this.state.sideTreeList.map((elm) => {
            if (elm.items) {
                const temp = elm.items.find(subElm => subElm.id == id || subElm.children.includes(id) || id.includes(subElm.link));
                if (temp) {
                    // this.setSelectedSubItem(temp)
                    this.props.onItemSelect(elm)
                    this.setState({ selectedItem: elm, selectedSubItem: temp })
                    return { ...elm, active: true };
                }
            }
            if (elm.id == id || elm.link == id) {
                this.props.onItemSelect(elm)

                this.setState({ selectedItem: elm, selectedSubItem: elm.items ? elm.items[0] : null })
                return { ...elm, active: true };
            } else return { ...elm, active: false };
        });

        this.setState({ sideTreeList });
    }

    setSelectedSubItem = (selectedSubItem) => {
        this.setState({ selectedSubItem })
    }



    render() {
        const { sideTreeList, selectedItem, selectedSubItem } = this.state;
        return (
            <div className={`${this.state.addClassName === true ? "menu-bar" : ""} p-0`} id={'menu-bar-id'}>
                {/*{this.props.menuTitle && <h5 className={"ml-3 mt-5"}>{selectedItem?.header}<hr/></h5>}*/}
                <ul className="nav flex-column">
                    {sideTreeList.map((item, i) => {
                        return (
                            <Fragment key={i}>
                                {item.status &&
                                    <>

                                        <Link key={item.id} to={item.link} style={{ textDecoration: 'none' }}>
                                            <li key={item.id} className="nav-item" onClick={() => this.showHideMenu(item.id)}>

                                                {item.items && item.items
                                                    ?
                                                    <a href className={`nav-link ${item.active ? item.items ? 'active' : 'active' : ''}`} data-bs-toggle="collapse" data-bs-target={`#${item.header}`} aria-expanded="true" >
                                                        <div className="d-flex justify-content-between">
                                                            <div>
                                                                <i className={item.icon ? item.icon : 'icon-icons-nettv-64x64-39 '} />
                                                                {item.label}
                                                            </div>

                                                            <i className={`ads ${item.active ? item.items ? 'ri-arrow-up-s-line' : 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}`}></i>
                                                        </div>
                                                    </a>
                                                    :
                                                    <span>
                                                        <a href className={`nav-link ${item.active ? item.items ? 'active' : 'active' : null}`}>
                                                            <i className={item.icon ? item.icon : 'icon-icons-nettv-64x64-39 '} />
                                                            {item.label}
                                                        </a>
                                                    </span>
                                                }

                                            </li>


                                        </Link>
                                        {item.items && item.active &&
                                            <SubMenu items={item.items} itemActive={item.active}
                                                header={item.header}
                                                subItem={selectedSubItem}
                                                onSubItemSelect={this.setSelectedSubItem}
                                                selectedItem={selectedItem.items[0]} />}
                                    </>
                                }
                            </Fragment>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default MenuBar;
