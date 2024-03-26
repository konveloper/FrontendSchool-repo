const todoInput = document.querySelector('.todoInput');
const todos = document.querySelector('.todos');
const submitBtn = document.querySelector('.submitBtn');

const TODOLIST = 'todoList';
let todoList = [];

function saveTodo(todo) {
  const todoObj = {
    text: todo,
    id: todoList.length + 1,
  };
  todoList.push(todoObj);
  saveTodoList();
}

function paintTodo(todo) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'X';
  deleteBtn.classList.add('deleteBtn');
  deleteBtn.addEventListener('click', deleteTodo);
  span.innerHTML = todo;
  li.appendChild(span);
  li.appendChild(deleteBtn);
  li.id = todoList.length + 1;
  todos.appendChild(li);
}

function createTodo(e) {
  e.preventDefault();
  const todo = todoInput.value;
  if (todoInput.value == '') {
    alert('할 일을 입력해주세요.');
  } else {
    paintTodo(todo);
    saveTodo(todo);
    todoInput.value = '';
  }
}

function loadTodoList() {
  const loadedTodoList = localStorage.getItem(TODOLIST);
  if (loadedTodoList !== null) {
    const parsedTodoList = JSON.parse(loadedTodoList);
    for (let todo of parsedTodoList) {
      const { text } = todo;
      paintTodo(text);
      saveTodo(text);
    }
  }
}

function deleteTodo(e) {
  const { target: button } = e;
  const li = button.parentNode;
  todos.removeChild(li);
  todoList = todoList.filter((todo) => todo.id !== Number(li.id));
  saveTodoList();
}

function saveTodoList() {
  localStorage.setItem(TODOLIST, JSON.stringify(todoList));
}

function init() {
  loadTodoList();
  submitBtn.addEventListener('click', createTodo);
}
init();
