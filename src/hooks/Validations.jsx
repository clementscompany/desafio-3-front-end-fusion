export const ValudateLoginInput = (email, password)=>{
  return email.trim() !== "" && password.trim() !== "";
}
export const ValidateRegister = (inputValue) => {

  const hasNonEmptyField = 
    inputValue.nome.trim() !== "" &&
    inputValue.email.trim() !== "" &&
    inputValue.telefone.trim() !== "" &&
    inputValue.cargo.trim() !== "" &&
    inputValue.senha.trim() !== "" &&
    inputValue.confirmarSenha.trim() !== "";

  return hasNonEmptyField;
};

export const ValidatePasswords = (password)=>{
  const resultPass = 
  password.senha.trim() === password.confirmarSenha.trim();

  return resultPass;
}
export const ConfirmData = (email, password, inputEmail, inputPassword)=>{
  const validate = 
  email === inputEmail && password === inputPassword;
  return validate;
}
