import React, { useState, useEffect, useRef } from "react";
import {useCookies } from "react-cookie";
import Button from "./button";
import LinkButton from "./linkButton";
import { useNavigate } from "react-router-dom";


const Login = ({ handleTaskClear, handleUserData }) => {
  const [cookies] = useCookies(["username"]);
  const navigate = useNavigate();
  const [userInputData, setInputdata] = useState("");
  const passInputData = useRef("");
  useEffect(() => {
    if (cookies.username !== "" || null | undefined) {
      setInputdata(cookies.username);
    }
  }, []);
  function handleInputChange(e) {
    let data = e.target.value;
    setInputdata(data);
  }
  function handleClick() {
    handleTaskClear();
    // logar

    // pegar dados do usuario
    if (userInputData === "" || null | undefined) {
      //alertar
      return;
    }
    handleUserData(userInputData);
    navigate(`/tasks`);
  }
  function goToRegister() {
    navigate(`/CreateAccount`);
  }
  return (
    <>
      <h1>Pagina de login</h1>
      <div className="container-login">
        <input
          name="user"
          placeholder="Coloque seu usuário ou email"
          className="container-login-input"
          value={userInputData}
          onChange={handleInputChange}
        ></input>
        <input
          type="password"
          name="senha"
          placeholder="Coloque sua senha"
          className="container-login-input"
          ref={passInputData}
        ></input>
        <Button func={handleClick}>Entrar</Button>
        <LinkButton func={goToRegister}>
          Não tem uma conta? clique aqui!
        </LinkButton>
      </div>
    </>
  );
};

export default Login;
