const KEY = 'myTodoList';
const dataTodo = [];

// display todo list when app is open
window.onload = displayAll;

// add todo list and display
const addTodo = document.getElementById('add-todo');
addTodo.onclick = getTodo;

// function get todo from input
function getTodo() {
  const todoInput = document.getElementById('todo-input');
  // check long character
  if (todoInput.value.length >= 10 || todoInput.value.length === 0) {

    const alert = document.querySelector('.alert');
    alert.classList.remove('d-none');
    setTimeout(() => { alert.classList.add('d-none') }, 3000);

  } else {

    dataTodo.unshift(addData(todoInput.value));
    // check KEY already exist
    if (localStorage.myTodoList) {

      const existsData = JSON.parse(localStorage.getItem(KEY));
      existsData.unshift(addData(todoInput.value));
      localStorage.setItem(KEY, JSON.stringify(existsData));

    } else {

      localStorage.setItem(KEY, JSON.stringify(dataTodo));

    }

    displayAll();
    todoInput.value = '';
  }
}

// function object todo
function addData(todo) {
  return {
    todo,
    isComplete: false,
  };
}

// function display all todo list
function displayAll() {
  const listGroup = document.querySelector('.list-group');
  const existsData = JSON.parse(localStorage.getItem(KEY));

  listGroup.innerHTML = '';
  // check local storage is exist
  existsData.forEach((todoList, i) => {
    if (todoList.isComplete === false) {
      listGroup.innerHTML += `
              <li class="list-group-item d-flex align-items-center justify-content-between">
                <span class="fs-5">${todoList.todo}</span>
                <div><i onclick="isComplete(${i})" class="fas fa-check fs-5 text-secondary me-3 check"></i><i onclick="delTodo(${i})" class="fas fa-trash-alt fs-5 text-danger delete"></i>
                </div>
              </li>
          `;
    } else {
      listGroup.innerHTML += `
              <li class="list-group-item d-flex align-items-center justify-content-between">
                <span class="fs-5">${todoList.todo}</span>
                <div><i onclick="isComplete(${i})" class="fas fa-check fs-5 text-success me-3 check"></i><i onclick="delTodo(${i})" class="fas fa-trash-alt fs-5 text-danger delete"></i>
                </div>
              </li>
          `;
    }
  });
}

// function delete todo list
function delTodo(i) {
  const existsData = JSON.parse(localStorage.getItem(KEY));

  existsData.splice(i, 1);
  localStorage.setItem(KEY, JSON.stringify(existsData));

  displayAll();
}

// function is complete or not todo
function isComplete(i) {
  const existsData = JSON.parse(localStorage.getItem(KEY));
  const isComplete = document.querySelectorAll('.check');

  if (existsData[i].isComplete === false) {
    existsData[i].isComplete = true;
    isComplete[i].classList.add('text-success');
  } else {
    existsData[i].isComplete = false;
    isComplete[i].classList.remove('text-success');
  }

  localStorage.setItem(KEY, JSON.stringify(existsData));

  displayAll();
}
