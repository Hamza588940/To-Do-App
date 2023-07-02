const btn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const input = document.getElementById("taskInput");

btn.addEventListener("click", () => {
  let uniquID = Date.now();
  const existingData = JSON.parse(localStorage.getItem("todos")) || [];
  const todos = {
    id: uniquID,
    task: input.value,
  };
  existingData.push(todos);
  localStorage.setItem("todos", JSON.stringify(existingData));
  input.value = "";
  renderTodo();
});

const renderTodo = () => {
  let data = JSON.parse(localStorage.getItem("todos"));
  let li = "";
  data.map((todo, index) => {
    li += `<li onClick="markTodo(event,${index})">
   <span class="todo-text">${todo.task}</span>
    <div>
    <button class="btn btn-primary" onClick="Edit(event)">Edit</button>
    <button class="btn btn-success d-none" onClick="Save(event,${index})">Save</button>

    <button class="btn btn-danger">Delete</button>
    </div>
    </li>`;
  });
  taskList.innerHTML = li;
};

renderTodo();

const markTodo = (event, i) => {
  if (event.target.tagName == "SPAN") {
    event.target.classList.toggle("task");
  }
  if (event.target.innerText == "Delete") {
    const existingData = JSON.parse(localStorage.getItem("todos"));
    existingData.splice(i, 1);
    localStorage.setItem("todos", JSON.stringify(existingData));
    renderTodo();
  }
};

let inputField = document.createElement("input");
inputField.classList.add("form-control");
const Edit = (e) => {
  e.stopPropagation();
  e.target.classList.add("d-none");
  e.target.nextElementSibling.classList.remove("d-none");
  const todoItem = e.target.parentElement.previousElementSibling;
  const todoText = todoItem.textContent;
  inputField.value = todoText;
  todoItem.textContent = "";
  todoItem.appendChild(inputField);
};
// hamza
const Save = (e, i) => {
  e.stopPropagation();
  e.target.classList.add("d-none");
  e.target.previousElementSibling.classList.remove("d-none");
  if (inputField.value === "") {
    const existingData = JSON.parse(localStorage.getItem("todos"));
    existingData.splice(i, 1);
    localStorage.setItem("todos", JSON.stringify(existingData));
    renderTodo();
  } else {
    const existingData = JSON.parse(localStorage.getItem("todos"));
    existingData[i].task = inputField.value;
    localStorage.setItem("todos", JSON.stringify(existingData));
    renderTodo();
  }
};
