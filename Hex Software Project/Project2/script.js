// Getting elements by id
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const pendingTaskList = document.getElementById('pending-task-list');
const completedTaskList = document.getElementById('completed-task-list');


// Initializing the tasks array
let tasks = [];

// Load tasks from local storage
if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    renderTasks();
}

// Adding the event listener to add task button
addTaskBtn.addEventListener('click', addTask);

// Defining a function to add task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const task = {
            text: taskText,
            completed: false
        };
        tasks.push(task);
        renderTasks();
        taskInput.value = '';
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}


// Defining a function to render tasks
function renderTasks() {
    pendingTaskList.innerHTML = '';
    completedTaskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''}>
            <span ${task.completed ? 'class="completed"' : ''}>${task.text}</span>
            <button class="remove-btn">Remove</button>
            <br/>
        `;
        if (task.completed) {
            completedTaskList.appendChild(taskItem);
        } else {
            pendingTaskList.appendChild(taskItem);
        }
        taskItem.querySelector('input[type="checkbox"]').addEventListener('change', () => {
            task.completed = !task.completed;
            renderTasks();
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });
        taskItem.querySelector('.remove-btn').addEventListener('click', () => {
            tasks.splice(index, 1);
            renderTasks();
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });
    });
}
