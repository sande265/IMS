
const BasicInput = (props) => {
    let { name, onChange, label, value, error, type } = props;

    return (
        <div className={`form-group`}>
            <label htmlFor={name ? name : label}>{label ? label : ''}</label>
            <input
                className={`form-control ${error && 'is-invalid'}`}
                name={name}
                value={value}
                type={type ? type : 'text'}
                onChange={onChange}
                id={name}
            />
            {error && <small className="text-danger">{error}</small>}
        </div>
    )
}

export default BasicInput