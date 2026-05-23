const addBtn = document.getElementById("addBtn");
const taskModal = document.getElementById("taskModal");
const cancelBtn = document.getElementById("cancelBtn");
const taskForm = document.getElementById("taskForm");
const taskContainer = document.getElementById("taskContainer");
const taskName = document.getElementById("taskName");
const taskDate = document.getElementById("taskDate");
const taskCategory = document.getElementById("taskCategory");
const taskPriority = document.getElementById("taskPriority");
const searchInput = document.getElementById("searchInput");
const filterCategory = document.getElementById("filterCategory");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editingTask = null;

addBtn.addEventListener("click", () => {
    taskModal.classList.remove("hidden");
});

cancelBtn.addEventListener("click", closeModal);

searchInput.addEventListener("input", renderTasks);
filterCategory.addEventListener("change", renderTasks);

function closeModal() {
    taskModal.classList.add("hidden");
    taskForm.reset();
    editingTask = null;
}

taskForm.addEventListener("submit", (e) => {

    e.preventDefault();

    if (
        !taskName.value.trim() ||
        !taskDate.value ||
        !taskCategory.value ||
        !taskPriority.value
    ) {
        alert("Please fill all fields");
        return;
    }

    const newTask = {
        name: taskName.value,
        date: taskDate.value,
        category: taskCategory.value,
        priority: taskPriority.value,
        completed: false
    };

    if (editingTask === null) {
        tasks.push(newTask);
    } else {
        tasks[editingTask] = {
            ...tasks[editingTask],
            ...newTask
        };
    }

    saveTasks();
    renderTasks();
    closeModal();
});



function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskContainer.innerHTML = "";

    const filteredTasks = tasks.filter((task) => {

        const matchesSearch = task.name
            .toLowerCase()
            .includes(searchInput.value.toLowerCase());

        const matchesCategory =
            filterCategory.value === "All" ||
            task.category === filterCategory.value;

        return matchesSearch && matchesCategory;
    });

    if (!filteredTasks.length) {
        taskContainer.innerHTML = `
            <div class="text-center text-gray-500 text-2xl">
                No Tasks Found
            </div>
        `;

        updateStats();
        return;
    }

    filteredTasks.forEach((task, index) => {

        const taskCard = document.createElement("div");
        const now = new Date();
        const dueDate = new Date(task.date);

        taskCard.className = `
            task-card
            ${task.priority}
            ${task.completed ? "completed" : ""}
            ${dueDate < now && !task.completed ? "overdue" : ""}
        `;

        taskCard.innerHTML = `
            <div>
                <h2 class="text-2xl font-bold">${task.name}</h2>

                <p class="text-gray-500 mt-1">
                    ${new Date(task.date).toLocaleString()}
                </p>

                <div class="flex gap-2 mt-2">
                    <span class="badge ${task.category}">
                        ${task.category}
                    </span>

                    <span class="badge bg-black text-white">
                        ${task.priority}
                    </span>
                </div>
            </div>

            <div class="flex flex-wrap gap-2">

                <button class="action-btn complete-btn">
                    ${task.completed ? "Undo" : "Done"}
                </button>

                <button class="action-btn edit-btn">
                    Edit
                </button>

                <button class="action-btn delete-btn">
                    Delete
                </button>

            </div>
        `;

        const completeBtn = taskCard.querySelector(".complete-btn");
        const editBtn = taskCard.querySelector(".edit-btn");
        const deleteBtn = taskCard.querySelector(".delete-btn");

        completeBtn.addEventListener("click", () => {

            tasks[index].completed = !tasks[index].completed;

            saveTasks();
            renderTasks();
        });

        editBtn.addEventListener("click", () => {

            taskModal.classList.remove("hidden");

            taskName.value = task.name;
            taskDate.value = task.date;
            taskCategory.value = task.category;
            taskPriority.value = task.priority;

            editingTask = index;
        });

        deleteBtn.addEventListener("click", () => {

            if (!confirm("Delete this task?")) return;

            tasks.splice(index, 1);

            saveTasks();
            renderTasks();
        });

        taskContainer.append(taskCard);
    });

    updateStats();
}

function updateStats() {

    const completedCount = tasks.filter(
        task => task.completed
    ).length;

    totalTasks.textContent = tasks.length;
    completedTasks.textContent = completedCount;
    pendingTasks.textContent = tasks.length - completedCount;
}

renderTasks();