import React, { Component } from 'react';
import { Link } from "react-router-dom";

class SubMenu extends Component {
    state = {
        selectedSubItem: null
    };

    componentDidMount() {
        const { selectedItem, subItem } = this.props;
        if (this.props.selectedItem || subItem) {
            this.setState({ selectedSubItem: subItem ? subItem : selectedItem })
        }

    }

    componentDidUpdate() {
        const { subItem } = this.props;
        if (subItem && subItem !== this.state.selectedSubItem) {
            this.setState({ selectedSubItem: subItem })
        }
    }

    subItemClick(item) {
        this.props.onSubItemSelect(item)
        this.setState({ selectedSubItem: item })
    }

    render() {
        const { selectedSubItem } = this.state;
        const { items, header } = this.props;
        return (

            <div className="collapse show" id={header}>
                <ul className={"btn-toggle-nav list-unstyled fw-normal pb-1"}>
                    {items.map((item, i) => (
                        <li key={item.id}>
                            <Link key={i} to={item.link} className={`link-dark rounded ${(selectedSubItem && item.id === selectedSubItem.id) ? 'active' : ''}`} onClick={() => this.subItemClick(item)}>{item.label}</Link>
                        </li>
                    ))}
                </ul>
            </div>

        );
    }
}

export default SubMenu;
