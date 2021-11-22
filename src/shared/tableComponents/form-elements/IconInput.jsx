import { useState } from "react";

const IconInput = (props) => {

    const [toggled, setToggled] = useState(false)

    let { name, onChange, label, value, error, type, disabled, placeholder, className, icon, autoComplete, required } = props;

    return <div className={`${className ? className : ''} form-group`}>
        {label && <label htmlFor={name}>{label} {required ? <span className="text-danger">&nbsp;*</span> : ''}</label>}
        <div className="input-group">
            <input
                type={`${type === 'password' ? toggled ? 'text' : 'password' : 'text'}`}
                className={`form-control ${error ? 'is-invalid' : ''}`}
                id={name}
                name={name}
                disabled={disabled}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                autoComplete={autoComplete}
            />
            <div className="input-group-append">
                {type === 'password' ? <span onClick={() => setToggled(!toggled)} className={`${toggled ? 'ri-eye-line' : 'ri-eye-off-line'} input-group-text py-0`}></span>
                    : <i className={`${icon} input-group-text py-0`}></i>}
            </div>
        </div>
        {error && <small className="text-danger">{error}</small>}
    </div>
}

export default IconInput;