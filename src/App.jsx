import React, { useReducer} from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Routes,
  Route
} from "react-router-dom";
import { useCookies } from "react-cookie";
import { writeTaskData, deleteTaskData } from "./services/firebase";
import Tasks from "./components/tasks";
import Login from "./components/login";
import AddTask from "./components/addTask";
import TaskInfo from "./components/taskInfo";
import CreateAcc from "./components/createAcc";
import "./app.css";
import UserContextProvider from "./context/userContext";

const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [
        ...state,
        {
          task: action.payload.taskTitle,
          id: action.payload.id,
          completed: false,
        },
      ];
    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload.taskId);
    case "CLEAR_TASKS":
      return [];
    case "TOGGLE_TASK":
      return state.map((task) => {
        if (task.id === action.payload.taskId) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
    case "SET_TASKS":
      return action.payload.tasks;
    default:
      return state;
  }
};

const App = () => {
  const [cookies, setCookie] = useCookies(["username"]);
  const [tasks, dispatch] = useReducer(taskReducer, []);
  //adicionar componente alerta
  function alert(alertText) {}
  function handleTaskAdd(taskTitle, user) {
    const newTask = {
      task: taskTitle,
      id: uuidv4(),
      completed: false,
    };
    dispatch({ type: "ADD_TASK", payload: { taskTitle, id: newTask.id } });
    writeTaskData(user, newTask.id, taskTitle, false);
  }

  function handleUserData(name) {
    setCookie("username", name, { path: "/",maxAge:172800 });
  }
  function handleTaskDelete(taskId, user) {
    dispatch({ type: "DELETE_TASK", payload: { taskId } });
    const task = tasks.find((task) => task.id === taskId);
    deleteTaskData(user, task.id);
  }

  function handleTaskClear() {
    dispatch({ type: "CLEAR_TASKS" });
  }

  function setDbTaskData(data) {
    dispatch({ type: "SET_TASKS", payload: { tasks: data } });
  }

  function handleTaskClick(taskId, user) {
    dispatch({ type: "TOGGLE_TASK", payload: { taskId } });
    const task = tasks.find((task) => task.id === taskId);
    writeTaskData(user, task.id, task.task, !task.completed);
  }

  return (
      <div className="container">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Login
                  handleTaskClear={handleTaskClear}
                  handleUserData={handleUserData}
                ></Login>
              </>
            }
          />
          <Route
            exact
            path="/createAccount"
            element={
              <>
                <CreateAcc handleTaskClear={handleTaskClear}></CreateAcc>
              </>
            }
          />
          <Route
            exact
            path="/tasks"
            element={
              <>
                <h1>Minhas Tarefas</h1>
                <AddTask
                  setDbTaskData={setDbTaskData}
                  handleTaskAdd={handleTaskAdd}
                />
                <Tasks
                  tasks={tasks}
                  handleTaskClick={handleTaskClick}
                  handleTaskDelete={handleTaskDelete}
                />
              </>
            }
          />
          <Route
            exact
            path="/Info/:title"
            element={
              <>
                <h1>Detalhe da Tarefa</h1>
                <TaskInfo></TaskInfo>
              </>
            }
          />
        </Routes>
      </div>
  );
};

export default App;
