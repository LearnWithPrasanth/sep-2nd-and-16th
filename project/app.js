// ********** SELECT ITEMS **********
// const form = document.getElementById("myform");
const form = document.querySelector(".todo-form");
const alertMsg = document.querySelector(".alert");
const todo = document.querySelector("#todo");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".todo-container");
const list = document.querySelector(".todo-list");
const clearBtn = document.querySelector(".clear-btn");

// ********** Edit ITEMS **********
let editElement;
let editID;
let editMode = false;

// ********** EVENT LISTENERS **********
form.addEventListener("submit", addTodo);
clearBtn.addEventListener("click", clearTodos);
window.addEventListener("DOMContentLoaded", setupTodos);

// ********** FUNCTIONS **********
function addTodo(e) {
    e.preventDefault();
    let value = todo.value;
    if (value === "") {
        displayAlert("danger", "Please enter a value");
        return;
    }

    if (editMode) {
        editElement.textContent = value;
        displayAlert("success", "item edited");
        resetToDefault();
        editFromLocalStorage(editID, value);
        return;
    }

    let id = new Date().getTime().toString();
    let element = document.createElement("article");
    element.classList.add("todo-item");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `
    <p class="title">${value}</p>
    <div class="btn-container">
        <!-- edit btn -->
        <button type="button" class="edit-btn">
        <i class="fas fa-edit"></i>
        </button>
        <!-- delete btn -->
        <button type="button" class="delete-btn">
        <i class="fas fa-trash"></i>
        </button>
    </div>
    `;

    // Event listeners for edit and delete buttons
    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", editTodo);
    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteTodo);

    list.appendChild(element);
    addToLocalStorage(id, value);
    container.classList.add("show-container");
    displayAlert("success", "item added to the list");
    resetToDefault();
}

function editTodo(e) {
    let element = e.currentTarget.parentElement.parentElement;
    editID = element.dataset.id;
    editElement = e.currentTarget.parentElement.previousElementSibling;
    editMode = true;
    submitBtn.textContent = "edit";
    todo.value = editElement.textContent;
}

function deleteTodo(e) {
    let element = e.currentTarget.parentElement.parentElement;
    list.removeChild(element);

    if (list.children.length === 0) {
        container.classList.remove("show-container");
    }

    deleteFromLocalStorage(element.dataset.id);
}

function clearTodos() {
    let todos = document.querySelectorAll(".todo-item");
    todos.forEach((todo) => list.removeChild(todo));
    container.classList.remove("show-container");

    localStorage.removeItem("todos");
}

function displayAlert(type, message) {
    alertMsg.textContent = message;
    alertMsg.classList.add(`alert-${type}`);
    setTimeout(() => {
        alertMsg.textContent = "";
        alertMsg.classList.remove(`alert-${type}`);
    }, 2000);
}

function resetToDefault() {
    todo.value = "";
    submitBtn.textContent = "submit";
    editMode = false;
    editElement = undefined;
}

// ********** LOCAL STORAGE **********
function getFromLocalStorage() {
    let todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : [];
}

function addToLocalStorage(id, value) {
    let todos = getFromLocalStorage();
    let newTodo = { id, value }; // same as{id: id, value: value}
    todos.push(newTodo);

    localStorage.setItem("todos", JSON.stringify(todos));
}

function editFromLocalStorage(id, value) {
    let todos = getFromLocalStorage();
    let updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
            todo.value = value;
        }
        return todo;
    });

    localStorage.setItem("todos", JSON.stringify(updatedTodos));
}

function deleteFromLocalStorage(id) {
    let todos = getFromLocalStorage();
    let updatedTodos = todos.filter((todo) => {
        if (todo.id !== id) {
            return todo;
        }
    });

    localStorage.setItem("todos", JSON.stringify(updatedTodos));
}

// ********** SETUP ITEMS **********
function setupTodos() {
    let todos = getFromLocalStorage();
    todos.forEach((todo) => setupTodo(todo.id, todo.value));

    container.classList.add("show-container");
}

function setupTodo(id, value) {
    let element = document.createElement("article");
    element.classList.add("todo-item");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `
    <p class="title">${value}</p>
    <div class="btn-container">
        <!-- edit btn -->
        <button type="button" class="edit-btn">
        <i class="fas fa-edit"></i>
        </button>
        <!-- delete btn -->
        <button type="button" class="delete-btn">
        <i class="fas fa-trash"></i>
        </button>
    </div>
    `;

    // Event listeners for edit and delete buttons
    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", editTodo);
    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteTodo);

    list.appendChild(element);
}
