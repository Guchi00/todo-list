import React, { useState, ChangeEvent } from "react";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";
import "./TodoList.css";

//This is an interface specifying how the todo should look like
//just like I created for the Tile yesterday.
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

//Then this is the props interface.
interface TodoListProps {
  todos: Todo[];
}

export const TodoList = (props: TodoListProps) => {
  const { todos } = props;
  const [data, setData] = useState<Todo[]>(todos);
  const [title, setTitle] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleAddNewTodo = () => {
    if (title.trim() === "") return; //To prevent adding an empty todo
    const newTodo = { id: Date.now() + 3, text: title, completed: false };
    setData((prev) => [...prev, newTodo]);
    setTitle("");
  };

  const keyboardAccessibility = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      handleAddNewTodo();
    }
  };

  const handleDeleteTodo = (todo: Todo) => {
    const updateTodo = data.filter((todoItem) => todoItem !== todo);
    setData(updateTodo);
  };

  const handleMarkedAsCompleted = (todo: Todo) => {
    const updatedTodo = data.map((todoItem) =>
      todoItem.id === todo.id
        ? { ...todoItem, completed: !todoItem.completed }
        : todoItem
    );
    setData(updatedTodo);
  };

  return (
    <>
      <div className="container">
        <div className="add_todo_container">
          <div className="text_and_plus_container">
            <h1>Todo List</h1>
            <ModeIcon className="pen" />
            <button
              onClick={() => {
                handleAddNewTodo();
              }}
            >
              +
            </button>
          </div>

          <input
            type="text"
            onChange={handleChange}
            placeholder="Add New Todo"
            value={title}
            onKeyDown={keyboardAccessibility}
          />
        </div>

        {data.map((todo) => {
          return (
            <div className="list" key={todo.id}>
              <span
                onClick={() => handleMarkedAsCompleted(todo)}
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.text}
              </span>
              <div className="actions">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  className="checkbox"
                  onChange={() => handleMarkedAsCompleted(todo)}
                />
                <DeleteIcon
                  onClick={() => handleDeleteTodo(todo)}
                  className="delete_action"
                />
              </div>
            </div>
          );
        })}
        <p className="ugochi">Todo List prepared by Ugochi Iwuchukwu</p>
      </div>
    </>
  );
};
