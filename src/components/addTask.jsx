import React, { useState, useEffect, useContext } from "react";
import Button from "./button";
import { useNavigate } from "react-router-dom";
import { getTaskData } from "../services/firebase";
import { useCookies } from "react-cookie";
import "./styles/tasksPage.css";
import { UserContext } from "../context/userContext";

const AddTask = ({ handleTaskAdd, setDbTaskData }) => {
  const navigate = useNavigate();
  const { taskData } = useContext(UserContext);
  const [cookies] = useCookies(["username"]);
  const [inputData, setInputdata] = useState("");
  const [textData, setTextdata] = useState("Sem informações");
  let txtArea = document.getElementById("taskInfoTxtArea");
  let showTaskBtn = document.getElementById("showTaskBtn");
  let saveTaskBtn = document.getElementById("saveTaskBtn");

  useEffect(() => {
    //buscar dados do DB
    let loadingDiv = document.getElementById("loadingDiv");
    let taskAddDiv = document.getElementById("taskAddContainer");
    const getTasks = async () => {
      try {
        const data = await getTaskData(cookies.username);
        console.log(data);
        //hide  animation de loading
        loadingDiv.style.opacity = "0";
        setTimeout(() => {
          if (data != null) {
            setDbTaskData(data);
          }
          if (data == null) {
            setDbTaskData([]);
          }
          loadingDiv.style.display = "none";
          taskAddDiv.style.marginBottom = 0;
        }, 500);
      } catch (error) {
        console.error(error);
      }
    };
    if (cookies.username === undefined || null) {
      //alertar
      return navigate("/");
    }
    if (taskData.length == 0) {
      getTasks();
    } else {
      loadingDiv.style.display = "none";
      taskAddDiv.style.marginBottom = 0;
    }
  }, []);
  function handleInputChange(e) {
    let data = e.target.value;
    console.log(data);
    setInputdata(data);
  }
  function handleTextChange(d) {
    let data = d.target.value;
    console.log(data);
    setTextdata(data);
  }
  function handleClick() {
    txtArea.style.animation =
      "1s ease 0s 1 normal forwards running hideTextArea";
    setTimeout(() => {
      txtArea.hidden = true;
    }, 1200);
    showTaskBtn.hidden = false;
    saveTaskBtn.hidden = true;
    handleTaskAdd(inputData, textData, cookies.username);
    setInputdata("");
    setTextdata("");
  }
  function showTaskInfoTextArea() {
    if (inputData == "") {
      document.getElementById("taskAddInput").placeholder =
        "Você precisa dar um nome";
      return;
    }
    txtArea.hidden = false;
    txtArea.style.animation =
      "1s ease 0s 1 normal forwards running showTextArea";
    showTaskBtn.hidden = true;
    saveTaskBtn.hidden = false;
  }

  return (
    <div id="taskAddContainer" className="container-task-add">
      <input
        id="taskAddInput"
        value={inputData}
        onChange={handleInputChange}
        placeholder="Adicione tarefas"
        type="text"
      ></input>
      <Button id="showTaskBtn" func={showTaskInfoTextArea}>
        Adicionar
      </Button>
      <Button id="saveTaskBtn" hidden func={handleClick}>
        Salvar
      </Button>
      <div id="taskInfoDiv" className="task-info-container">
        <textarea
          onChange={handleTextChange}
          hidden
          id="taskInfoTxtArea"
          placeholder="Adicione informações sobre a tarefa"
        ></textarea>
      </div>
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
