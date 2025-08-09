// DOM Elements
const todoForm = document.getElementById("todo-form");
const taskInput = document.getElementById("task");
const todoList = document.getElementById("todo-list");

// Load existing tasks on page load
document.addEventListener("DOMContentLoaded", loadTodos);

// Add new task
function addTodo() {
    const taskText = taskInput.value.trim();
    if (!taskText) return;

    const todo = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    saveTodoToLocal(todo);
    addTodoToDOM(todo);

    taskInput.value = "";
}

// Add task to DOM
function addTodoToDOM(todo) {
    const li = document.createElement("li");
    li.setAttribute("data-id", todo.id);

    li.innerHTML = `
        <span class="${todo.completed ? "completed" : ""}">${todo.text}</span>
        <button onclick="toggleComplete(${todo.id})">${todo.completed ? "Undo" : "Complete"}</button>
        <button onclick="editTodo(${todo.id})">Edit</button>
        <button onclick="deleteTodo(${todo.id})">Delete</button>
    `;

    todoList.appendChild(li);
}

// Toggle task completion
function toggleComplete(id) {
    const todos = getTodosFromLocal();
    const todo = todos.find(t => t.id === id);
    todo.completed = !todo.completed;
    localStorage.setItem("todos", JSON.stringify(todos));
    refreshList();
}

// Edit a task
function editTodo(id) {
    const todos = getTodosFromLocal();
    const todo = todos.find(t => t.id === id);
    const newText = prompt("Edit your task:", todo.text);
    if (newText !== null && newText.trim() !== "") {
        todo.text = newText.trim();
        localStorage.setItem("todos", JSON.stringify(todos));
        refreshList();
    }
}

// Delete a task
function deleteTodo(id) {
    let todos = getTodosFromLocal();
    todos = todos.filter(t => t.id !== id);
    localStorage.setItem("todos", JSON.stringify(todos));
    refreshList();
}

// Clear all tasks
function clearAllTodos() {
    if (confirm("Are you sure you want to clear all tasks?")) {
        localStorage.removeItem("todos");
        refreshList();
    }
}

// Save a task to localStorage
function saveTodoToLocal(todo) {
    const todos = getTodosFromLocal();
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Get tasks from localStorage
function getTodosFromLocal() {
    return JSON.parse(localStorage.getItem("todos")) || [];
}

// Load tasks on page load
function loadTodos() {
    const todos = getTodosFromLocal();
    todos.forEach(addTodoToDOM);
}

// Refresh the task list
function refreshList() {
    todoList.innerHTML = "";
    loadTodos();
}
