// import logo from './logo.svg';
// import './App.css';

import { useEffect, useState } from "react";
import TodoBanner from "./TodoBanner";
import TodoCreator from "./TodoCreator";
import TodoRow from "./TodoRow";
import VisibilityControl from "./VisibilityControl";

function App(props) {
  useEffect(() => {
    let data = localStorage.getItem("todos");
    setTodoItems(
      data != null
        ? JSON.parse(data)
        : [
            { action: "Buy Flowers", done: false },
            { action: "Get Shoes", done: false },
            { action: "Collect Tickets", done: true },
            { action: "Call Joe", done: false },
          ]
    );
  }, []);

  const [name, setName] = useState("Adam");
  const [showCompleted, setShowCompleted] = useState(true);
  const [todoItems, setTodoItems] = useState([
    { action: "Buy Flowers", done: false },
    { action: "Get Shoes", done: false },
    { action: "Collect Tickets", done: true },
    { action: "Call Joe", done: false },
  ]);

  const createNewTodo = (task) => {
    if (!todoItems.find((item) => item.action === task)) {
      setTodoItems((todoItems) => [
        ...todoItems,
        { action: task, done: false },
      ]);
    }
  };

  const toggleTodo = (todo) => {
    setTodoItems((todoItems) => {
      return todoItems.map((item) =>
        item.action === todo.action ? { ...item, done: !item.done } : item
      );
    });
  };

  const TodoTableRows = ({ doneValue }) => {
    return (
      <>
        {todoItems
          .filter((item) => item.done === doneValue)
          .map((item) => {
            return (
              <TodoRow key={item.action} item={item} callback={toggleTodo} />
            );
          })}
      </>
    );
  };

  return (
    <div>
      <TodoBanner name={name} tasks={todoItems} />
      <div className="container-fluid">
        <div className="my-1">
          <TodoCreator callback={createNewTodo} />
        </div>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Description</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>
            <TodoTableRows doneValue={false} />
          </tbody>
        </table>
        <div className="bg-secondary text-white text-center p2">
          <VisibilityControl
            description="Completed Tasks"
            isChecked={showCompleted}
            callback={(checked) => setShowCompleted(checked)}
          />
        </div>
        {showCompleted && (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>
              <TodoTableRows doneValue={true} />
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
