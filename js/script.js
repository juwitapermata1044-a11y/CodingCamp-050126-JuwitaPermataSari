const form = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const dateInput = document.getElementById("dateInput");
const todoList = document.getElementById("todoList");
const filter = document.getElementById("filter");

let todos = [];

form.addEventListener("submit", function(e) {
    e.preventDefault();

    if (todoInput.value === "" || dateInput.value === "") {
        alert("To-Do dan Tanggal wajib diisi!");
        return;
    }

    const todo = {
        text: todoInput.value,
        date: dateInput.value
    };

    todos.push(todo);
    todoInput.value = "";
    dateInput.value = "";
    displayTodos();
});

filter.addEventListener("change", displayTodos);

function displayTodos() {
    todoList.innerHTML = "";

    const today = new Date().toISOString().split("T")[0];

    todos.forEach((todo, index) => {
        if (filter.value === "today" && todo.date !== today) return;

        const li = document.createElement("li");
        li.innerHTML = `
            ${todo.text} (${todo.date})
            <button onclick="deleteTodo(${index})">Delete</button>
        `;
        todoList.appendChild(li);
    });
}

function deleteTodo(index) {
    todos.splice(index, 1);
    displayTodos();
}
