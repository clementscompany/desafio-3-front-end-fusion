import { useState } from "react";
import InputText from "../../components/InputText";
import PasswordInput from "../../components/PasswordInput";
import "../../scss/Register.scss";
import { ValidatePasswords, ValidateRegister } from "../../hooks/Validations";
import {z, string} from "zod";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [inputValue, setInputValue] = useState({
        nome: "",
        email: "",
        telefone: "",
        cargo: "",
        senha: "",
        confirmarSenha: "",
        linkedin: "",
        github: "",
    });
    const [textError, setTextError] = useState({message:"", className:""})
    const [small, setSmall] = useState({password:"", email:""});
    const Nav = useNavigate();

    const handleChange = (e) => {
        setInputValue({
            ...inputValue,
            [e.target.name]: e.target.value,
        });
        setTextError({message:"", className:""})
        setSmall({password:"", email:""});
    };

    const hanleSubmit = (e)=>{
        e.preventDefault();
    }
    const hanleClick = ()=>{
      if (ValidateRegister(inputValue)) {
        if (ValidatePasswords(inputValue)) {
            const userValudations = z.object({
                email: string().email("Email invalido!").min(6),
                password: string().min(8, "A senha deve possuir no minimo 8 digitos")
            });
            try {
                // verificar se ja foi cadastrado!
                userValudations.parse({email:inputValue.email, password:inputValue.senha});
                let user_data = sessionStorage.getItem("user_data") || `[]`;
                user_data = JSON.parse(user_data);
                if (user_data.length > 0) {
                    user_data.filter(data=>{ 
                        if (data.nome === inputValue.nome && data.email === inputValue.email) {
                            setTextError({message:"Estes dados jaforam cadastrados!", className:"error"});
                        } else{
                            user_data.push(inputValue)
                            sessionStorage.setItem("user_data", JSON.stringify(user_data));
                            setTextError({ message:"Cadastrado com sucesso!", className:"sucess" });
                        }
                    });
                } else{
                    user_data.push(inputValue)
                    sessionStorage.setItem("user_data", JSON.stringify(user_data));
                    setTextError({ message:"Cadastrado com sucesso!", className:"sucess" });
                }
                
            } catch (error) {

                if (error.errors[0].code === "too_small") {
                    setSmall({ password:error.errors[0].message, email:""})
                } else{
                    setSmall({ password:"", email:error.errors[0].message})
                }
            }
        } else{
            setTextError({message:"As senhas não correspondem", className:"error"})
        }
      } else{
        setTextError({message:"Preencha os campos obrigatorios!", className:"error"})
      }
    }
    return (
        <>
            <div className="mainRegister">
                <div className="formRegister">
                    <header>
                        <h1>FRONTEND FUSION</h1><i className="bi bi-code-slash"></i>
                    </header>
                    <div className={"textError "+ textError.className }>
                        <span>{textError.message !== "" ? textError.message : "Insira os teus Dados"}</span>
                    </div>
                    <form action="#" onSubmit={hanleSubmit}>
                        <div className="grid">
                            <InputText
                                placeholder="Digite seu nome..."
                                label="Nome"
                                icon={<i className="bi bi-person"></i>}
                                name="nome"
                                type="text"
                                value={inputValue.nome}
                                onChange={handleChange}
                            />
                            <InputText
                                placeholder="Digite o seu e-mail"
                                label="E-mail"
                                icon={<i className="bi bi-envelope-at"></i>}
                                name="email"
                                value={inputValue.email}
                                onChange={handleChange}
                                error={ small.email }
                            />
                            <InputText
                                placeholder="Digite o seu telefone"
                                label="Telefone"
                                icon={<i className="bi bi-telephone"></i>}
                                name="telefone"
                                type="tel"
                                value={inputValue.telefone}
                                onChange={handleChange}
                            />
                            <div className="inputBox">
                                <label htmlFor="role">Cargo pretendido</label>
                                <select
                                    name="cargo"
                                    id="role"
                                    value={inputValue.cargo}
                                    onChange={handleChange}
                                >
                                    <option value="">Selecione</option>
                                    <option value="frontend">Frontend Developer</option>
                                    <option value="backend">Backend Developer</option>
                                    <option value="fullstack">Fullstack Developer</option>
                                    <option value="designer">Designer</option>
                                </select>
                            </div>
                            <PasswordInput
                                placeholder="Digite a sua Senha..."
                                name="senha"
                                value={inputValue.senha}
                                onChange={handleChange}
                                error={ small.password }
                            />
                            <InputText
                                placeholder="Confirme a sua senha"
                                label="Confirme a sua senha"
                                type="password"
                                icon={<i className="bi bi-lock"></i>}
                                name="confirmarSenha"
                                value={inputValue.confirmarSenha}
                                onChange={handleChange}
                                error={ small.password }
                            />
                            <InputText
                                placeholder="Insira o link do seu LinkedIn (opcional)"
                                label="LinkedIn (opcional)"
                                icon={<i className="bi bi-linkedin"></i>}
                                name="linkedin"
                                value={inputValue.linkedin}
                                onChange={handleChange}
                            />
                            <InputText
                                placeholder="Insira o link do seu GitHub (opcional)"
                                label="GitHub (opcional)"
                                icon={<i className="bi bi-github"></i>}
                                name="github"
                                value={inputValue.github}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="registerButton">
                            <button className="" type="submit" onClick={hanleClick}>Cadastrar</button>
                            <button className="" type="reset" onClick={()=> Nav("/")}>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
