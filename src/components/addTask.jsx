import React, { useState,useEffect} from "react";
import Button from "./button";
import { useNavigate} from "react-router-dom";
import { getTaskData } from "../services/firebase";
import { useCookies } from 'react-cookie';

const AddTask = ({ handleTaskAdd, setDbTaskData }) => {
  const [cookies] = useCookies(['username']);
  const navigate = useNavigate();
  useEffect(() => {
    //buscar dados do DB
    if (cookies.username === undefined||null) {
      //alertar
      return navigate("/");
    }
    const getTasks = async () => {
      try {
        const data = await getTaskData(cookies.username);
        console.log(data);
        //hide  animation de loading
        document.getElementById("loadingDiv").style.opacity = "0";
        setTimeout(() => {
          if (data != null) {
            setDbTaskData(data);
          }
          if (data == null) {
            setDbTaskData([]);
          }
          document.getElementById("loadingDiv").style.display = "none";
          document.getElementById("taskAddContainer").style.marginBottom = 0;
        }, 500);
      } catch (error) {
        console.error(error);
      }
    };
    getTasks();
  }, []);

  const [inputData, setInputdata] = useState("");
  function handleInputChange(e) {
    let data = e.target.value;
    console.log(data);
    setInputdata(data);
  }
  function handleClick() {
    handleTaskAdd(inputData, cookies.username);
    setInputdata("");
  }
  return (
    <div id="taskAddContainer" className="container-task-add">
      <input
        value={inputData}
        onChange={handleInputChange}
        placeholder="Adicione tarefas"
        type="text"
      ></input>
      <Button func={handleClick}>Adicionar</Button>
      <div id="loadingDiv" className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default AddTask;
