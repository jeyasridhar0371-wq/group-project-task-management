
// localStorage.removeItem("tasks")

let addbtn = document.getElementById("plus__button")
let inputform = document.getElementById("input__form")
let closebtn = document.getElementById("close__button")

let tasklist = JSON.parse(localStorage.getItem("tasks")) || []
// console.log(tasklist)

// JavaScript code for refreshing the page and showing the task form when the add button is clicked
let refresh_page = () => {
    location.reload()
}

// JavaScript code for showing the task form when the add button is clicked
addbtn.addEventListener("click", () => {
    inputform.classList.remove("hidden")
});
// JavaScript code for closing the task form when the cancel button is clicked
let cancel_addbtn = document.getElementById("cancel-add__button")
cancel_addbtn.addEventListener("click", () => {
    event.preventDefault()
    inputform.classList.add("hidden")
});

// JavaScript code for displaying task on the page 
let display_card = () => {
    if (tasklist.length > 0) {
    let noTask = document.getElementById("no__task")
    noTask.style.display = "none"
    tasklist.forEach(element => {
        let div1 = document.createElement("div")
        let div2 = document.createElement("div")
        let div3 = document.createElement("div")
        let p1 = document.createElement("p")
        let p2 = document.createElement("p")
        let h1 = document.createElement("h1")

        div1.classList.add("inprogress__task")
        div2.classList.add("inprogress__category")
        div3.classList.add("inprogress__content")
        p1.classList.add("inprogress__category__p")
        p2.classList.add("inprogress__datetime")
        h1.classList.add("inprogress__content__h1")
        h1.textContent = element.task
        p2.textContent = element.date
        p1.textContent = element.category
        div2.appendChild(p1)
        div3.innerHTML = `<input type="checkbox">`
        div3.appendChild(h1)
        div1.appendChild(div2)
        div1.appendChild(div3)
        div1.appendChild(p2)
        div1.innerHTML += `<button class="inprogress__task__button">Edit</button>`
        document.getElementById("inprogress__container").appendChild(div1)
    });
}
else {
    let noTask = document.getElementById("no__task")
    noTask.style.display = "block"
}
}
display_card()

// Local storage code for add task
closebtn.addEventListener("click", () => {
    event.preventDefault()
    let inputbox1 = document.getElementById("task-input")
    let inputbox2 = document.getElementById("due-date")
    let inputbox3 = document.getElementById("select")
    if (inputbox1.value === "" || inputbox2.value === "" || inputbox3.value === "") {
        alert("Please fill out the form properly before submitting.")
    }
    else {
        
        // object literal to store the task details
        let object = {
            task: "",
            date: "",
            category: "",
            checked: false
        }
        let inputbox1 = document.getElementById("task-input")
        let inputbox2 = document.getElementById("due-date")
        let inputbox3 = document.getElementById("select")
        // console.log(inputbox1.value)
        object.task = inputbox1.value
        object.date = inputbox2.value.toString()
        object.category = inputbox3.value
        tasklist.push({ ...object }) // using spread operator to create a new object and push it to the tasklist array
        localStorage.setItem("tasks", JSON.stringify(tasklist))
        // localStorage.removeItem("tasks")
        inputform.classList.add("hidden")
        let form = document.getElementById("form__tag")
        form.reset()
        display_card()
        refresh_page()
    }


});

// JavaScript code for displaying the task details form when the edit button is clicked
let task_container = document.getElementById("inprogress__container")
task_container.addEventListener("click", (event) => {
    if (event.target.textContent === "Edit") {
        let edit_form = document.getElementById("edit__form")
        edit_form.classList.remove("hidden")
        // console.log(event.target.parentElement.children[0].textContent)
        // console.log(event.target.parentElement.children[1].textContent)
        // console.log(event.target.parentElement.children[2].textContent)
        // console.log(tasklist)
        tasklist.forEach((element, index) => {
            if (element.task === event.target.parentElement.children[1].textContent && element.date === event.target.parentElement.children[2].textContent && element.category === event.target.parentElement.children[0].textContent) {
                // console.log(element)

                // Populate the edit form with the selected task's details
                document.getElementById("edit-task").value = element.task
                document.getElementById("edit-due-date").value = element.date
                document.getElementById("edit-category").value = element.category

                let savebtn = document.getElementById("save-edit__button")

                // JavaScript code for saving the edited task details to local storage and refreshing the page
                savebtn.addEventListener("click", () => {
                    event.preventDefault()
                    let edit_task = document.getElementById("edit-task").value
                    let edit_due_date = document.getElementById("edit-due-date").value
                    let edit_category = document.getElementById("edit-category").value
                    // console.log(edit_task)
                    // console.log(edit_due_date)
                    // console.log(edit_category)
                    tasklist[index].task = edit_task
                    tasklist[index].date = edit_due_date
                    tasklist[index].category = edit_category
                    localStorage.setItem("tasks", JSON.stringify(tasklist))
                    let edit_form = document.getElementById("edit__form")
                    edit_form.classList.add("hidden")
                    refresh_page()
                });
            }
        });
    }
});

// JavaScript code for closing the task details form when the cancel button is clicked
let cancelbtn = document.getElementById("cancel__button")
cancelbtn.addEventListener("click", () => {
    event.preventDefault()
    let edit_form = document.getElementById("edit__form")
    edit_form.classList.add("hidden")
})

