import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import * as actions from "./store/actions";
import { initiateStore } from "./store/store";

const store = initiateStore();

const App = () => {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState());
    });
  }, []);

  const completeTask = (taskId) => {
    store.dispatch(actions.taskCompleted(taskId));
  };
  const changeTitle = (taskId) => {
    store.dispatch(actions.titleChanged(taskId));
  };
  const deleteTask = (taskId) => {
    store.dispatch(actions.taskDeleted(taskId));
  };

  return (
    <>
      <h1> App</h1>
      <ul>
        {state.map((element) => (
          <li key={element.id}>
            <p>{element.title}</p>
            <p> {`Completed: ${element.completed}`}</p>
            <button onClick={() => completeTask(element.id)}>Complete</button>
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
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
