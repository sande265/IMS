const SelectInput = (props) => {
    let { name, onChange, label, value, error, options, defaultValue } = props;

    return (
        <div className="form-group">
            <label for={name ? name : label}>{label ? label : ''}</label>
            <select className={`form-control ${error ? 'is-invalid' : ''}`}
                name={name} id={name}
                onChange={onChange}
                value={value}
                defaultValue={defaultValue}
                lang="en">
                <option>--- Select {label ? label : name} ---</option>
                {options && options.map(items => {
                    return <option value={items.value}>{items.name}</option>
                })}
            </select>
            {error && <small className="text-danger">{error}</small>}
        </div>
    )
}

export default SelectInput