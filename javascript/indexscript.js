var addbtn = document.getElementById("plus__button")
var inputform = document.getElementById("input__form")
var closebtn = document.getElementById("close__button")
var inputbox1=document.getElementById("task-input")
var inputbox2=document.getElementById("due-date")
var inputbox3=document.getElementById("select")

addbtn.addEventListener("click",()=>{
    inputform.classList.remove("hidden")
})

closebtn.addEventListener("click",()=>{
    event.preventDefault()
    var form = document.getElementById("form__tag")
    if (inputbox1.value==="" || inputbox2.value===""|| inputbox3.value===""){
            alert("Please fill out the form properly before submitting.")
    }
    else{
        var noTask = document.getElementById("no__task")
        noTask.style.display = "none"
        var div1 = document.createElement("div")
        var div2 = document.createElement("div")
        var div3 = document.createElement("div") 
        var p1 = document.createElement("p")
        var p2 = document.createElement("p")
        var h1 = document.createElement("h1")
        
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
})
