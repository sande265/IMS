const FileInput = (props) => {
    let { name, onChange, label, value, error } = props;

    return (
        <div className="form-group">
            <div class="custom-file">
                <input type="file"
                    className={`custom-file-input ${error && 'is-invalid'}`}
                    name={name} id={name}
                    onChange={onChange}
                    value={value} lang="en" />
                <label className="custom-file-label" for={name ? name : label}>{label ? label : ''}</label>
            </div>
            {error && <small className="text-danger">{error}</small>}
        </div>
    )
}

export default FileInput