const StatusInput = (props) => {
    let { name, onChange, error, checked, label } = props;
    return <div className="d-flex align-items-center">
        <label htmlFor={name} className="form-check-label">{label ? label : 'Active'}</label>
        <input
            name={name}
            id={name}
            type="checkbox"
            className="ml-auto"
            onChange={onChange}
            // value={data.status}
            checked={checked}
        />
        {error && <small className="text-danger">{error}</small>}
    </div>
}

export default StatusInput