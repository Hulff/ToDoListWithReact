import React from "react";
import Button from "./button";
import { useParams, useNavigate } from "react-router-dom";

const TaskInfo = () => {
  const navigate = useNavigate();
  const params = useParams();
  function handleInfoClickBack() {
    navigate(-1);
  }
  return (
    <>
      <div className="container-button-back">
        <Button func={handleInfoClickBack}>Voltar</Button>
      </div>
      <div className="container-task-info">
        <p>{params.title}</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
          doloremque omnis ipsum sequi distinctio officiis porro, libero dolores
          saepe est totam sint, voluptate id quo numquam amet sunt. Doloribus,
          iusto?
        </p>
      </div>
    </>
  );
};

export default TaskInfo;
