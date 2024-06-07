import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Todolist.css";
import {
  addTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../../store/todolistSlice";
import { AppDispatch, RootState } from "../../store/store";
import Users from "../Users/Users";

interface Todo {
  id: string;
  content: string;
}

const Todolist = () => {
  const todos = useSelector((state: RootState) => state.todolist.todos);
  const dispatch = useDispatch<AppDispatch>();
  const [input, setInput] = useState<string>("");
  const [updateItem, setUpdateItem] = useState<null | string>(null);
  const [updateInput, setUpdateInput] = useState<string>("");
  const [oddItemColor, setOddItemColor] = useState<string>("lightpink");
  const [evenItemColor, setEvenItemColor] = useState<string>("lightblue");

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

  const handleEditButton = (id: string, prevContent: string) => {
    setUpdateItem(id);
    setUpdateInput(prevContent);
  };

  const handleUpdate = (todo: Todo) => {
    dispatch(updateTodo(todo));
    setUpdateItem(null);
  };

  return (
    <div className="todolist-container">
      <h1>Todolist</h1>
      <Users />

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
        {todos.map((todo: Todo, index: number) => (
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
