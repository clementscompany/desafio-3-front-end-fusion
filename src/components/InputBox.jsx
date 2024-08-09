export default function InputBox({ placeholder, error, handleChange, value, ...rest}) {
    return (
        <div className="inputBox">
            <label htmlFor="email">E-mail</label>
            <div className="input">
                <input 
                    type="email"
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    {...rest}
                    name="email"
                />
                <i className="bi bi-envelope-at-fill"></i>
            </div>
            <small>{error}</small>
        </div>
    );
}
