import React, { useRef} from "react";
import Button from "./button";
import LinkButton from "./linkButton"
import { useNavigate } from "react-router-dom";
// import { createUserData } from "../services/firebase";

const CreatAcc = ({ handleTaskClear }) => {
  const navigate = useNavigate();
  const userInputData = useRef("");
  const passInputData = useRef("");
  const confirmPassInputData = useRef("");
  const emailInputData = useRef("");
  
  function handleClick() {
    // handleTaskClear();
    if (passInputData.current.value === confirmPassInputData.current.value) {
      //criar conta 
      
    } else {
      console.log("senhas não conferem");
    }
  }
  function goToLogin() {
    navigate("/");
  }
  return (
    <>
      <h1>Pagina de Cadastro</h1>
      <div className="container-login">
        <input
          name="email"
          type="email"
          placeholder="Coloque seu Email"
          className="container-login-input"
          ref={emailInputData}
        ></input>
        <input
          name="user"
          type="text"
          placeholder="Coloque seu usuario"
          className="container-login-input"
          ref={userInputData}
        ></input>
        <input
          type="password"
          name="senha"
          placeholder="Coloque sua senha"
          className="container-login-input"
          ref={passInputData}
        ></input>
        <input
          type="password"
          name="senhaConfirm"
          placeholder="Coloque sua senha"
          className="container-login-input"
          ref={confirmPassInputData}
        ></input>
        <Button type="submit" func={handleClick}>Entrar</Button>
        <LinkButton func={goToLogin}>
          Já tem uma conta? clique aqui!
        </LinkButton>
      </div>
    </>
  );
};

export default CreatAcc;
