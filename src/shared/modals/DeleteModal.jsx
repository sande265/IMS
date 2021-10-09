import React, { Component } from 'react'

class DeleteModel extends Component {
    render() {
        let { handleToggleModel, deleteItem, title, message, tree_path, tree_path_extra, btnTitle } = this.props
        return (
            <div className="modal" style={{ display: 'block', height: 'auto' }}>
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button"
                                onClick={() => handleToggleModel()}
                                className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span></button>
                            <h4 className="modal-title">{title ? title : ""}</h4>
                            {tree_path && tree_path.tree_path &&
                                <p>{`${tree_path.tree_path} > ${tree_path_extra.name}`}</p>}
                        </div>
                        <div className="modal-body">
                            <p>{message ? message : "Are you sure to delete ?"}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button"
                                onClick={() => handleToggleModel()}
                                className="btn btn-default btn-sm pull-left"
                                data-dismiss="modal">Cancel
                            </button>
                            <button
                                onClick={() => deleteItem()}
                                type="button"
                                className="btn btn-success btn-sm confirm-delete">{btnTitle ? btnTitle : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DeleteModel