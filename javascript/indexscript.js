

const addBtn = document.getElementById("addBtn");
const taskModal = document.getElementById("taskModal");
const cancelBtn = document.getElementById("cancelBtn");
const taskForm = document.getElementById("taskForm");

const taskContainer = document.getElementById("taskContainer");

const taskName = document.getElementById("taskName");
const taskDate = document.getElementById("taskDate");
const taskCategory = document.getElementById("taskCategory");

const searchInput = document.getElementById("searchInput");
const filterCategory = document.getElementById("filterCategory");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let editIndex = null;

addBtn.addEventListener("click", () => {
    taskModal.classList.remove("hidden");
});

cancelBtn.addEventListener("click", () => {
    closeModal();
});

function closeModal() {
    taskModal.classList.add("hidden");
    taskForm.reset();
    editIndex = null;
}

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (
        taskName.value.trim() === "" ||
        taskDate.value === "" ||
        taskCategory.value === ""
    ) {
        alert("Please fill all fields");
        return;
    }

    const taskObj = {
        name: taskName.value,
        date: taskDate.value,
        category: taskCategory.value,
        completed: false
    };

    if (editIndex === null) {
        tasks.push(taskObj);
    } else {
        tasks[editIndex] = {
            ...tasks[editIndex],
            name: taskName.value,
            date: taskDate.value,
            category: taskCategory.value
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

    let filteredTasks = tasks.filter((task) => {

        let matchesSearch = task.name
            .toLowerCase()
            .includes(searchInput.value.toLowerCase());

        let matchesCategory =
            filterCategory.value === "All" ||
            task.category === filterCategory.value;

        return matchesSearch && matchesCategory;
    });

    if (filteredTasks.length === 0) {
        taskContainer.innerHTML = `
            <div class="text-center text-gray-500 text-2xl">
                No Tasks Found
            </div>
        `;
    }

    filteredTasks.forEach((task, index) => {

        const taskCard = document.createElement("div");

        taskCard.className = `
            task-card
            ${task.completed ? "completed" : ""}
        `;

        taskCard.innerHTML = `
            <div>
                <h2 class="text-2xl font-bold">${task.name}</h2>

                <p class="text-gray-500 mt-1">
                    ${new Date(task.date).toLocaleString()}
                </p>

                <span class="badge ${task.category}">
                    ${task.category}
                </span>
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

        const completeBtn =
            taskCard.querySelector(".complete-btn");

        completeBtn.addEventListener("click", () => {
            tasks[index].completed =
                !tasks[index].completed;

            saveTasks();
            renderTasks();
        });

        const editBtn =
            taskCard.querySelector(".edit-btn");

        editBtn.addEventListener("click", () => {

            taskModal.classList.remove("hidden");

            taskName.value = task.name;
            taskDate.value = task.date;
            taskCategory.value = task.category;

            editIndex = index;
        });

        const deleteBtn =
            taskCard.querySelector(".delete-btn");

        deleteBtn.addEventListener("click", () => {

            const confirmDelete =
                confirm("Delete this task?");

            if (confirmDelete) {
                tasks.splice(index, 1);

                saveTasks();
                renderTasks();
            }
        });

        taskContainer.append(taskCard);
    });

    updateStats();
}

function updateStats() {

    totalTasks.textContent = tasks.length;

    let completed = tasks.filter(
        task => task.completed
    ).length;

    completedTasks.textContent = completed;

    pendingTasks.textContent =
        tasks.length - completed;
}

searchInput.addEventListener("input", renderTasks);

filterCategory.addEventListener("change", renderTasks);

renderTasks();