const ActionHeader = (props) => {
    let { options, onSubmit, onCancel, onReset, onBack, onCreate } = props;
    return <div className="ml-auto">
        {options && options.map((items, idx) => {
            if (items.includes('save')) {
                return <button className="btn btn-sm" onClick={onSubmit}>
                    Save
                </button>
            }
            if (items.includes('cancel')) {
                return <button className="btn btn-sm" onClick={onCancel}>
                    Cancel
                </button>
            }
            if (items.includes('reset')) {
                return <button className="btn btn-sm" onClick={onReset}>
                    Reset
                </button>
            }
            if (items.includes('back')) {
                return <button className="btn btn-sm" onClick={onBack}>
                    Back
                </button>
            }
            if (items.includes('create')) {
                return <button className="btn btn-sm" onClick={onCreate}>
                    Create New
                </button>
            }
        })}
    </div>
}

export default ActionHeader