import { useState } from "react";

export default function PasswordInput({ placeholder,value, handleChange,  error, ...rest }) {
    const [password, setPassword] = useState({ type: "password", open: false });

    const togglePassword = () => {
        setPassword((prevState) => ({
            type: prevState.type === "password" ? "text" : "password",
            open: !prevState.open,
        }));
    };

    return (
        <div className="inputBox">
            <label htmlFor="password">Senha</label>
            <div className="input">
                <input 
                    type={password.type}
                    name="password"
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    {...rest}
                />
                <span className="buttonEye" onClick={togglePassword}>
                    {password.open ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>}
                </span>
            </div>
            <small>{error}</small>
        </div>
    );
}