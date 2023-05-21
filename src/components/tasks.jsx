import React from "react";
import Task from "./task";
import { useParams } from "react-router-dom";

const Tasks = ({ tasks, handleTaskClick, handleTaskDelete }) => {
  const params = useParams();
  return (
    <>
      {tasks.map((task) => (
        <Task
          user={params.user}
          key={task.id}
          handleTaskClick={handleTaskClick}
          handleTaskDelete={handleTaskDelete}
          taskObj={task}
        />
      ))}
    </>
  );
};

export default Tasks;
