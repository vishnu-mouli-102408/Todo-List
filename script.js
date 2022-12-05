// Add Todo

const addTodo = async () => {
    const redToast = document.getElementById("redToast");

    if (localStorage.getItem("todos") === null) localStorage.setItem("todos", "[]");
    todos = JSON.parse(localStorage.getItem("todos"));

    const name = document.getElementById("name-input");
    const desc = document.getElementById("description-input");
    const endTime = document.getElementById("endTime-input");

    if (name.value === "" || desc.value === "") {
        const toast = new bootstrap.Toast(redToast)
        return toast.show()
    };

    todos.push({
        // _id: todos.length === 0 ? '1' : todos[0]._id++,
        title: name.value,
        desc: desc.value,
        time: endTime.value
    });

    localStorage.setItem("todos", JSON.stringify(todos));
    location.reload();
}

// Show todo

let todos = localStorage.getItem("todos");
const todoList = document.getElementById("todo-list");

if (!todos || todos === "[]") {
    todoList.innerHTML = `<div class="alert alert-primary" role="alert">Todo list is empty...</div>`;
} else {
    todos = JSON.parse(todos);
    let ihtml = "";

    for (let i = 0; i < todos.length; i++) {
        ihtml += `
        <div class="s-todo d-flex text-muted pt-3">
        <div class="left-side d-flex">
        <i class="bi bi-pin-angle bd-placeholder-img flex-shrink-0 me-2 rounded-circle"></i>
        <p class="pb-3 mb-0 small lh-sm border-bottom">
          <strong class="d-block text-gray-dark">${todos[i].title}</strong>
          ${todos[i].desc}<br><br>

          <i class="bi bi-alarm"></i> ${(todos[i].time).slice(0, 2) === "00" ? `12:${(todos[i].time).slice(3, 5)} am` : Number.parseInt((todos[i].time).slice(0, 2)) < 12 ? `${todos[i].time} am` : `${Number.parseInt((todos[i].time).slice(0, 2)) - 12}:${(todos[i].time).slice(3, 5)} pm`}
        </p>
        </div>
        <div class="right-side">
        <button type="button" class="btn btn-primary" onclick="let del = JSON.parse(localStorage.todos).splice(Number.parseInt(this.getElementsByTagName('span')[0].innerHTML)+1); localStorage.setItem('todos', JSON.stringify(del)); location.reload();">
        <i class="bi bi-trash3"></i>
        <span class="display-none">${i}</span>
        </button>
        </div>
        </div>
`
    }

    todoList.innerHTML = ihtml;
}