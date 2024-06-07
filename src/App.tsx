import React from "react";
import "./App.css";
import { TodoList } from "./Components/TodoList/TodoList";

const TODOS = [
  { id: Date.now(), text: "Learn React", completed: false },
  { id: Date.now() + 1, text: "Build a todo app", completed: false },
  { id: Date.now() + 2, text: "Deploy to production", completed: false },
];

function App() {
  return (
    <div className="App">
      <TodoList todos={TODOS} />
    </div>
  );
}

export default App;
