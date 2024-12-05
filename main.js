var tasksVariable = []
var taskListLength = 0
window.onload = function() {
  loadTasks();
  document.getElementById('taskInput').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });
};

deleteAll.addEventListener('click', function() {
  const userConfirmed = confirm("Are you sure you want to delete all tasks?");
  deleteAllTasks(userConfirmed)
});

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';



  tasks.forEach((task, idx) => {
    const li = document.createElement('li');
    li.textContent = task;
    li.setAttribute('data-id', idx);

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.addEventListener('click', () => completeTask(idx));

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editTask(idx));

    li.appendChild(completeButton);
    li.appendChild(editButton);

    taskList.appendChild(li);

    tasksVariable.push(li)
    taskListLength = tasksVariable.length
  });
}

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.push(taskText);

    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
  }

  taskInput.value = '';
}


function completeTask(id) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.splice(id, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
}

function editTask(id) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const newTask = prompt("Edit Task:", tasks[id]);
  if (newTask !== null && newTask !== "") {
    tasks[id] = newTask;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
  }
}

function deleteAllTasks(userConfirmed) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  if (userConfirmed) {
    for (let i = tasks.length - 1; i >= 0; i--) {
      tasks.splice(i, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      loadTasks();
    }
  }
}
