import React, { Component } from 'react'

class ContentModal extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    /**
     * Alert if clicked on outside of element
     */
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.props.handleToggleModal()
        }
    }
    render() {
        let { handleToggleModal, onSubmit, title, modalBody, btnTitle, actions, color } = this.props
        return (
            <div className="modal" style={{ display: 'block', height: 'auto' }} ref={this.wrapperRef}>
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button"
                                onClick={() => handleToggleModal()}
                                className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span></button>
                            <h4 className="modal-title">{title ? title : ""}</h4>
                        </div>
                        <div className={`modal-body text-center bg-${color}`}>
                            {modalBody}
                        </div>
                        {(actions || actions === null) && <div className="modal-footer">
                            <button type="button"
                                onClick={() => handleToggleModal()}
                                className="btn btn-default btn-sm pull-left"
                                data-dismiss="modal">Cancel
                            </button>
                            <button
                                onClick={() => onSubmit()}
                                type="button"
                                className="btn btn-success btn-sm">{btnTitle ? btnTitle : "Save"}
                            </button>
                        </div>}
                    </div>
                </div>
            </div>
        )
    }
}

export default ContentModal