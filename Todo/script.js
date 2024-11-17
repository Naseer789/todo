const addButton = document.getElementById("addBtn");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const emptyMessage = document.getElementById("empty-message");

addButton.addEventListener("click", addTodo);

todoInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addTodo();
  }
});

document.addEventListener("DOMContentLoaded", loadTasks);

function addTodo() {
  const taskText = todoInput.value.trim();
  
  if (taskText) {
    const todo = {
      text: taskText,
      completed: false
    };
    
    addTaskToList(todo);
    saveTaskToStorage(todo);
    todoInput.value = "";  
    toggleEmptyMessage();
  }
}

function addTaskToList(todo) {
  const listItem = document.createElement("li");
  listItem.classList.add("todo-item");

  const taskText = document.createElement("span");
  taskText.textContent = todo.text;
  if (todo.completed) {
    listItem.classList.add("completed");
  }

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete");
  deleteButton.addEventListener("click", function() {
    deleteTask(listItem, todo);
  });

  listItem.appendChild(taskText);
  listItem.appendChild(deleteButton);

  listItem.addEventListener("click", function() {
    toggleTaskCompletion(listItem, todo);
  });

  todoList.appendChild(listItem);
}

function toggleTaskCompletion(listItem, todo) {
  todo.completed = !todo.completed;
  listItem.classList.toggle("completed");
  updateTaskInStorage(todo);
}

function deleteTask(listItem, todo) {
  todoList.removeChild(listItem);
  removeTaskFromStorage(todo);
  toggleEmptyMessage();
}

function toggleEmptyMessage() {
  if (todoList.children.length === 0) {
    emptyMessage.style.display = "block";
  } else {
    emptyMessage.style.display = "none";
  }
}

function saveTaskToStorage(todo) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(todo);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(function(todo) {
    addTaskToList(todo);
  });
  toggleEmptyMessage();
}

function updateTaskInStorage(todo) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskIndex = tasks.findIndex(t => t.text === todo.text);
  if (taskIndex !== -1) {
    tasks[taskIndex] = todo;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

function removeTaskFromStorage(todo) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(t => t.text !== todo.text);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}