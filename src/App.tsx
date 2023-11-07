import React, { useState } from "react";
import "./App.css";

interface Todo {
  id: string;
  todo: string;
}

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editId, setEditId] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editId) {
      const editTodo = todos.find((item) => item.id === editId);
      const updatedTodos = todos.map((t) =>
        t.id === editTodo?.id ? { id: t.id, todo } : { id: t.id, todo: t.todo }
      );
      setTodos(updatedTodos);
      setEditId("");
      setTodo("");
      return;
    }

    if (todo.trim() !== "") {
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      setTodo("");
    }
  };

  const handleDelete = (id: string) => {
    const delTodo = todos.filter((todo) => todo.id !== id);
    setTodos(delTodo);
  };

  const handleEdit = (id: string) => {
    const editTodo = todos.find((item) => item.id === id);
    if (editTodo) {
      setTodo(editTodo.todo);
      setEditId(id);
    }
  };

  return (
    <div className="App">
      <div className="contain">
        <h1 className="header">To-Do List</h1>

        <form className="todoform" onSubmit={handleSubmit}>
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="What Are Your Tasks Today....."
          />
          <button type="submit">{editId ? "Edit" : "Add"}</button>
        </form>
        <ul className="allTodos">
          {todos.map((t) => (
            <li className="singleTodo" key={t.id}>
              <span className="todoText">{t.todo}</span>
              <button onClick={() => handleEdit(t.id)}>Edit</button>
              <button onClick={() => handleDelete(t.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
