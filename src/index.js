import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import {
  titleChanged,
  taskDeleted,
  completeTask,
  loadTasks,
  getTasks,
  getTaskLoadingStatus,
  createTask,
} from "./store/task";
import configureStore from "./store/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { getError } from "./store/errors";

const store = configureStore();

const App = () => {
  const state = useSelector(getTasks());
  const isLoading = useSelector(getTaskLoadingStatus());
  const error = useSelector(getError());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId));
  };
  const deleteTask = (taskId) => {
    dispatch(taskDeleted(taskId));
  };
  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h1> App</h1>
      <button onClick={() => dispatch(createTask())}>Add Task</button>
      <hr />
      <ul>
        {state.map((element) => (
          <li key={element.id}>
            <p>{element.title}</p>
            <p> {`Completed: ${element.completed}`}</p>
            <button onClick={() => dispatch(completeTask(element.id))}>
              Complete
            </button>
            <button onClick={() => changeTitle(element.id)}>
              Change Title
            </button>
            <button onClick={() => deleteTask(element.id)}>Delete Task</button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
