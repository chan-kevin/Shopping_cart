import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Todolist.css";
import {
  addTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../../store/todolist/todolistSlice";

const Todolist = () => {
  const todos = useSelector((state) => state.todolist.todos);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [updateItem, setUpdateItem] = useState(null);
  const [updateInput, setUpdateInput] = useState("");
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

  const handleEditButton = (id, prevContent) => {
    setUpdateItem(id);
    setUpdateInput(prevContent);
  };

  const handleUpdate = (todo) => {
    dispatch(updateTodo(todo));
    setUpdateItem(null);
  };

  return (
    <div className="todolist-container">
      <h1>Todolist</h1>

      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="add-input"
        />
        <button onClick={handleAddTodo} className="btn">
          Add
        </button>
      </div>

      <ul>
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
            {updateItem === todo.id ? (
              <input
                value={updateInput}
                onChange={(e) => setUpdateInput(e.target.value)}
              />
            ) : (
              <li className="todo">{todo.content}</li>
            )}

            <div>
              {updateItem === todo.id ? (
                <button
                  onClick={() =>
                    handleUpdate({ id: todo.id, content: updateInput })
                  }
                  className="btn"
                >
                  Confirm
                </button>
              ) : (
                <button
                  onClick={() => handleEditButton(todo.id, todo.content)}
                  className="btn"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => dispatch(deleteTodo(todo.id))}
                className="btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Todolist;
