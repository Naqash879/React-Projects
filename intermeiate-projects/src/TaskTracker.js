import "./tasktracker.css";
import { useState } from "react";

function TaskTracker() {
  let [addNewTask, setAddNewTask] = useState("");
  let [tasks, setTasks] = useState([]);
  let [completedTask, setCompletedTask] = useState([]);
  function handleTask() {
    if (addNewTask === "") {
      return alert("please Enter a Text");
    }
    const newTask = {
      id: tasks.length + 1,
      name: addNewTask,
      complete: false,
    };
    setTasks([...tasks, newTask]);
    setAddNewTask("");
  }

  const completeTask = (id) => {
    const completed = tasks.find((task) => task.id === id);

    if (completed) {
      setTasks(tasks.filter((task) => task.id !== id));
      setCompletedTask([...completedTask, { ...completed, complete: true }]);
    }
  };
  const restoreTask = (id) => {
    const resTask = completedTask.find((task) => task.id === id);
    if (resTask) {
      setCompletedTask(completedTask.filter((task) => task.id !== id));
      setTasks([...tasks, { ...resTask, complete: false }]);
    } else console.log("id not find");
  };
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="task-container">
      <h3>Task Tracker</h3>
      <div className="input-box">
        <input
          value={addNewTask}
          type="text"
          placeholder="Start writing and press enter to create task"
          onChange={(e) => setAddNewTask(e.target.value)}
        />
        <button onClick={() => handleTask()}>↩️</button>
      </div>
      <h4>Tasks</h4>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.complete}
              onChange={() => completeTask(task.id)}
            />
            <span>{task.name}</span>
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>
              🗑️
            </button>
          </li>
        ))}
      </ul>

      <h4>Completed Tasks</h4>
      <ul className="task-list">
        {completedTask.map((task, index) => (
          <li
            key={task.id}
            style={{ textDecoration: "line-through", color: "grey" }}
          >
            <input
              type="checkbox"
              checked
              readOnly
              onChange={() => restoreTask(task.id)}
            />
            <span>{task.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskTracker;
