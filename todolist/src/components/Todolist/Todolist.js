import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Todolist.css";
import {
  addTodo,
  deleteTodo,
  getTodos,
} from "../../store/todolist/todolistSlice";

const Todolist = () => {
  const todos = useSelector((state) => state.todolist.todos);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [oddItemColor, setOddItemColor] = useState("lightpink");
  const [evenItemColor, setEvenItemColor] = useState("lightblue");

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  const handleAddTodo = () => {
    dispatch(addTodo(input));
    const tempColor = oddItemColor;
    setOddItemColor(evenItemColor);
    setEvenItemColor(tempColor);
    setInput("");
  };

  return (
    <div className="todolist-container">
      <h1>Todolist</h1>

      <div className="add-container">
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={handleAddTodo}>add</button>
      </div>

      <ul className="list-container">
        {todos.map((todo, index) => (
          <div
            key={todo.id}
            className="todo-contatiner"
            style={
              index % 2 === 0
                ? { backgroundColor: evenItemColor }
                : { backgroundColor: oddItemColor }
            }
          >
            <li className="todo">{todo.content}</li>
            <button
              onClick={() => dispatch(deleteTodo(todo.id))}
              className="delete-btn"
            >
              delete
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Todolist;
