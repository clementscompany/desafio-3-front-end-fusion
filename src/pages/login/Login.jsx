    import { useState } from "react";
    import InputBox from "../../components/InputBox";
    import PasswordInput from "../../components/PasswordInput";
    import "../../scss/Login.scss";
    import { string, z } from "zod";
    import { ConfirmData, ValudateLoginInput } from "../../hooks/Validations";
    import { useNavigate } from "react-router-dom";


    function Login() {
        const [valueInput, setValue] = useState({email:"", password:""});
        const[erros, setErrors] = useState({maiErro:"", passError:""});
        const [textError, setTextError] = useState({message:"", className:""});
        const nav = useNavigate();

        const handleChange = (e)=>{
            const {name, value} = e.target;
            setValue({...valueInput, [name]:value });
            setErrors({ maiErro:"", passError:"" })
            setTextError({ message:"", className:"" })
        }
        const submitData = async (e)=>{
            e.preventDefault();
        }
        const handleClick = () => {
            if (ValudateLoginInput(valueInput.email, valueInput.password)) {
                const userSchema = z.object({
                    email: string().email("Email invalido..").min(6),
                    password: string().min(8, "A senha deve conter pelomenos 8 digitos..."),
                });
                try {
                    userSchema.parse({ email: valueInput.email, password: valueInput.password });
                    fetchData();
                } catch (error) {
                    let err = error.errors;
                    if (err[0].code === "too_small") {
                        setErrors({maiErro:"", passError: err[0].message });
                    } else{
                        setErrors({maiErro:err[0].message, passError:""});
                    }
                }
            } else{
                setTextError({ message:"Preencha todosos campos!", className:"error" })
            }  
        };
        
        async function fetchData() {
            let dataUser = sessionStorage.getItem("user_data") || false;
        
            if (dataUser) {
                dataUser = JSON.parse(dataUser);
        
                const user = dataUser.find(data => 
                    data.email === valueInput.email && 
                    data.senha === valueInput.password
                );
                
                if (user) {
                    setTextError({ message: "Seja bem-vindo!", className: "sucess" });
                } else {
                    setTextError({ message: "Dados não encontrados", className: "error" });
                }
            } else {
                setTextError({ message: "Dados não encontrados", className: "error" });
            }
        }
        

        return(
            <>
            <main className="mainLogin">
                <div className="formLogin">
                    <header>
                        <h1>FRONTEND FUSION</h1><i className="bi bi-code-slash"></i>
                    </header>
                    <div className={"textError " + textError.className }>
                        <span>{ textError.message !== '' ? textError.message : "Faça o Seu Login" }</span>
                    </div>
                    <form action="#" onSubmit={submitData}>
                        <InputBox 
                            value={ valueInput?.email} 
                            placeholder={"Digite seu email..."} 
                            handleChange={ handleChange }
                            error={ erros.maiErro }
                        />
                        <PasswordInput 
                            value={ valueInput?.password}
                            handleChange={handleChange}
                            placeholder={"Digite a sua senha..."}
                            error={ erros.passError }
                        />
                        <div className="buttonsLog">
                            <button className="logButton" type="submit" onClick={handleClick}>Login</button>
                            <button className="logButton" type="reset" onClick={()=> nav("/register")}>
                                Cadastre-se
                            </button>
                        </div>
                        <div className="forgotPass">
                            <a href="#" >Esqueceu a senha?</a>
                        </div>
                    </form>
                </div>
            </main>
            </>
        );
    }
    export default Login;
