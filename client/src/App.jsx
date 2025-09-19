"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react"; // modern icons

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [showeditmodal, setShoweditmodal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (name.trim() && age.trim()) {
      axios
        .post("http://localhost:3000/addtodo", { name, age })
        .then(() => {
          setName("");
          setAge("");
          getAllTask();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/deletetask/${id}`)
      .then(() => {
        getAllTask();
      })
      .catch((err) => alert(err));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!currentTodo) return;

    axios
      .put(`http://localhost:3000/updatetask/${currentTodo._id}`, {
        name,
        age,
      })
      .then(() => {
        setShoweditmodal(false);
        setCurrentTodo(null);
        setName("");
        setAge("");
        getAllTask();
      })
      .catch((err) => console.log(err));
  };

  function getAllTask() {
    axios
      .get("http://localhost:3000/getalltodo")
      .then((res) => setTodos(res.data.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getAllTask();
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-12 p-6 bg-white shadow-xl rounded-2xl relative">
      <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
        Todo Manager
      </h1>

      {/* Add Form */}
      <form
        onSubmit={handleAddTodo}
        className="space-y-4 bg-gray-50 p-4 rounded-xl shadow-sm"
      >
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          type="number"
          placeholder="Enter Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg font-medium shadow-md hover:bg-blue-700 transition"
        >
          <Plus size={18} /> Add Todo
        </button>
      </form>

      {/* Todo List */}
      <ul className="mt-6 space-y-4">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="flex justify-between items-center p-4 bg-gray-100 rounded-xl shadow hover:shadow-md transition"
          >
            <div>
              <p className="font-semibold text-gray-800">{todo.name}</p>
              <p className="text-sm text-gray-500">{todo.age} years old</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setCurrentTodo(todo);
                  setName(todo.name);
                  setAge(todo.age);
                  setShoweditmodal(true);
                }}
                className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => handleDelete(todo._id)}
                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Edit Modal */}
      {showeditmodal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm">
          <div className="w-[400px] bg-white p-6 rounded-2xl shadow-xl relative">
            <button
              onClick={() => setShoweditmodal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold mb-4 text-gray-700">Edit Todo</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                placeholder="Update Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="number"
                placeholder="Update Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium shadow-md hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
  