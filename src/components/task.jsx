import React from "react";
import {CgClose,CgInfo} from "react-icons/cg" 
import {useNavigate} from "react-router-dom"
import {useCookies } from "react-cookie";


const Task = ({ taskObj, handleTaskClick, handleTaskDelete }) => {
  const [cookies] = useCookies(["username"]);
  const navigate = useNavigate()
  function handleInfoClick() {
    navigate(`/info/${taskObj.task}`)
  }
  return (
    <div
      id={taskObj.id}
      key={taskObj.id}
      className="task-container"
      style={taskObj.completed ? { background: "rgb(27, 208, 249)" } : {}}
    >
      <h3
        onClick={() => {
          handleTaskClick(taskObj.id,cookies.username);
        }}
      >
        {taskObj.task}
      </h3>
      <div className="btn-remove-container">
        <button
        onClick={handleInfoClick}
          className="about-task-btn"
        >
          <CgInfo/>
        </button>
      </div>
      <div className="btn-remove-container">
        <button
          onClick={() => handleTaskDelete(taskObj.id,cookies.username)}
          className="remove-task-btn"
        >
          <CgClose/>
        </button>
      </div>
    </div>
  );
};

export default Task;
