const form = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const dateInput = document.getElementById("dateInput");
const todoList = document.getElementById("todoList");
const filter = document.getElementById("filter");

let todos = [];

/* ADD TODO */
form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (todoInput.value.trim() === "" || dateInput.value === "") {
        alert("To-Do dan Tanggal wajib diisi!");
        return;
    }

    todos.push({
        id: Date.now(), // ID unik (PENTING)
        text: todoInput.value,
        date: dateInput.value
    });

    todoInput.value = "";
    dateInput.value = "";

    displayTodos();
});

/* FILTER */
filter.addEventListener("change", displayTodos);

/* DISPLAY */
function displayTodos() {
    todoList.innerHTML = "";

    const today = new Date().toISOString().split("T")[0];

    todos
        .filter(todo => {
            if (filter.value === "today") {
                return todo.date === today;
            }
            return true;
        })
        .forEach(todo => {
            const li = document.createElement("li");

            li.innerHTML = `
                <div class="todo-text">
                    <strong>📝 ${todo.text}</strong>
                    <span>📅 ${todo.date}</span>
                </div>
                <button class="delete-btn">🗑</button>
            `;

            /* DELETE WITH ANIMATION */
            li.querySelector(".delete-btn").addEventListener("click", () => {
                li.classList.add("remove");

                setTimeout(() => {
                    todos = todos.filter(t => t.id !== todo.id);
                    displayTodos();
                }, 400);
            });

            todoList.appendChild(li);
        });
}
