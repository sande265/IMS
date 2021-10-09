import React from "react";
import MenuBar from "./MenuBar";
import { menu } from '../menus'

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: null,
            profile: {},
            addClassName: true,
            sideList: []
        }
    }

    componentWillMount() {
        this.setState({
            sideList: menu
        })
    }

    componentDidMount() {

        document.getElementById('toggleSidebar').onclick = function (e) {
            document.getElementById('sidebarMenu') && document.getElementById('sidebarMenu').classList.toggle('toggled');
            document.getElementById('main') && document.getElementById('main').classList.toggle('toggled');
            document.getElementById('header') && document.getElementById('header').classList.toggle('toggled');
        }

        window.addEventListener("resize", this.resize.bind(this));
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                document.getElementById('sidebarMenu') && document.getElementById('sidebarMenu').classList.add('toggled');
                document.getElementById('main') && document.getElementById('main').classList.add('toggled');
                document.getElementById('header') && document.getElementById('header').classList.add('toggled');
                this.setState(({
                    addClassName: false
                }))
            }
            if (window.innerWidth > 768) {
                document.getElementById('sidebarMenu') && document.getElementById('sidebarMenu').classList.remove('toggled');
                document.getElementById('main') && document.getElementById('main').classList.remove('toggled');
                document.getElementById('header') && document.getElementById('header').classList.remove('toggled');
                this.setState({
                    addClassName: true
                })

            }
        }, false);
    }

    handleItemSelect = (selectedItem) => {
        this.setState({ selectedItem })
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


    render() {
        // console.log('addClassName', this.state.addClassName)
        const { selectedItem, profile } = this.state


        return (
            <div className="container-fluid">
                <div className="row">

                    <nav id="sidebarMenu" className="sidebar">
                        <div className="logo d-flex align-items-center justify-content-start">
                            <img src="/brand_logo.png" alt="logo" style={{ height: 50 }} />
                        </div>

                        <div className="position-sticky  mainNav">
                            <MenuBar
                                menuItems={this.state.sideList}
                                onItemSelect={this.handleItemSelect}
                                menuTitle={selectedItem?.header}
                            />
                        </div>
                    </nav>
                </div>
            </div>
        )
    }
}

export default Sidebar