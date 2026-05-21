


let addbtn = document.getElementById("plus__button")
let inputform = document.getElementById("input__form")
let closebtn = document.getElementById("close__button")

var tasklist = JSON.parse(localStorage.getItem("tasks")) || []
// console.log(tasklist)
// var tasklist = []

// console.log(typeof(tasklist))
closebtn.addEventListener("click", () => {
    
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
    tasklist.push({ ...object })
    localStorage.setItem("tasks", JSON.stringify(tasklist))
    // localStorage.removeItem("tasks")
    
});

// JavaScript code for add task 

addbtn.addEventListener("click", () => {
    inputform.classList.remove("hidden")
});

closebtn.addEventListener("click", () => {
    event.preventDefault()
    let form = document.getElementById("form__tag")
    let inputbox1 = document.getElementById("task-input")
    let inputbox2 = document.getElementById("due-date")
    let inputbox3 = document.getElementById("select")
    if (inputbox1.value === "" || inputbox2.value === "" || inputbox3.value === "") {
        alert("Please fill out the form properly before submitting.")
    }
    else {
        let noTask = document.getElementById("no__task")
        noTask.style.display = "none"
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
        h1.textContent = inputbox1.value
        p2.textContent = inputbox2.value
        p1.textContent = inputbox3.value
        div2.appendChild(p1)
        div3.innerHTML = `<input type="checkbox">`
        div3.appendChild(h1)
        div1.appendChild(div2)
        div1.appendChild(div3)
        div1.appendChild(p2)
        div1.innerHTML += `<button class="inprogress__task__button">Edit</button>`
        document.getElementById("inprogress__container").appendChild(div1)

        inputform.classList.add("hidden")

    }
    form.reset()
});

