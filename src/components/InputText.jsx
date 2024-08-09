export default function InputText({ placeholder, error, handleChange, value, icon,name, label, ...rest}) {
    return (
        <div className="inputBox">
            <label>{label}</label>
            <div className="input">
                <input 
                    type="email"
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    {...rest}
                    name={name}
                />
                {icon}
            </div>
            <small>{error}</small>
        </div>
    );
}
