const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("counter");
const message = document.getElementById("message");
const filterButtons = document.querySelectorAll(".filter-button");

let tasks = [];
let currentFilter = "all";
let nextId = 1;

function addTask() {
    const text = taskInput.value.trim();
    if (text === "") {
        message.textContent = "Введите текст задачи.";
        return;
    }
    const task = {
        id: nextId,
        text: text,
        completed: false
    };
    tasks.push(task);
    nextId++;
    taskInput.value = "";
    message.textContent = "";
    render();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    render();
}

function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return {
                ...task,
                completed: !task.completed
            };
        }
        return task;
    });
    render();
}

function getFilteredTasks() {
    if (currentFilter === "active") {
        return tasks.filter(task => !task.completed);
    }
    if (currentFilter === "completed") {
        return tasks.filter(task => task.completed);
    }
    return tasks;
}

function updateCounter() {
    const completedCount = tasks.filter(task => task.completed).length;
    const activeCount = tasks.filter(task => !task.completed).length;
    counter.textContent =
        `Осталось: ${activeCount}, Выполнено: ${completedCount}`;
}

function render() {
    taskList.innerHTML = "";
    const filteredTasks = getFilteredTasks();
    filteredTasks.forEach(task => {
        const listItem = document.createElement("li");
        listItem.classList.add("task");
        if (task.completed) {
            listItem.classList.add("completed");
        }
        const taskText = document.createElement("span");
        taskText.classList.add("task-text");
        taskText.textContent = task.text;
        const completeButton = document.createElement("button");
        completeButton.classList.add("complete-button");
        if (task.completed) {
            completeButton.textContent = "Вернуть";
        } else {
            completeButton.textContent = "Выполнено";
        }
        completeButton.addEventListener("click", () => {
            toggleTask(task.id);
        });
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.textContent = "Удалить";
        deleteButton.addEventListener("click", () => {
            deleteTask(task.id);
        });
        listItem.appendChild(taskText);
        listItem.appendChild(completeButton);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    });

    updateCounter();
}

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        addTask();
    }
});

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter;
        filterButtons.forEach(filterButton => {
            filterButton.classList.remove("active");
        });
        button.classList.add("active");
        render();
    });
});

render();