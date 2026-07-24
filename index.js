// local storage
let itemsArry = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : []
itemsArry = itemsArry.map(entry => typeof entry === "string" ? { text: entry, done: false } : entry)
console.log(itemsArry)
// enter button functional
document.querySelector("#enter").addEventListener("click", () => {
    const item = document.querySelector("#item")
    createItem(item)
})

// where the add tasks are been asign to
function displayItems(){
    let items = ""
    for(let i = 0 ; i < itemsArry.length; i++){
        const task = itemsArry[i]
        const completedClass = task.done ? "completed" : ""
        const checkClass = task.done ? "checked" : ""
        items += `  <div class="item">
                        <div class="input-controller">
                            <textarea disabled class="${completedClass}">${task.text}</textarea>
                            <div class="edit-controller">
                                <i class="fa-solid fa-check checkBtn ${checkClass}"></i>
                                <i class="fa-solid fa-trash deleteBtn"></i>
                                <i class="fa-solid fa-pen-to-square editBtn"></i>
                            </div>
                        </div>
                        <div class="update-controller">
                            <button class="saveBtn">Save</button>
                            <button class="cancelBtn">Cancel</button>
                        </div>
                    </div>`
    }
    document.querySelector(".to-do-list").innerHTML = items
    activateDeleteListeners()
    activateEditListeners()
    activateSaveListeners()
    activateCancelListeners()
    activateCheckListeners()
}

// activation of deleteBTN
function  activateDeleteListeners(){
    let deleteBtn = document.querySelectorAll(".deleteBtn")
    deleteBtn.forEach((db, i) => {
        db.addEventListener("click", () => { deleteItem(i) })
    })
}

// edit btn
function activateEditListeners(){
    const editBtn = document.querySelectorAll(".editBtn")
    const updateController = document.querySelectorAll(".update-controller")
    const inputs = document.querySelectorAll(".input-controller textarea")
    editBtn.forEach((eb, i) => {
        eb.addEventListener("click", () => {
             updateController[i].style.display = "block"
             inputs[i].disabled = false
        })
    })
}

// save BTN
function activateSaveListeners(){
    const saveBtn = document.querySelectorAll(".saveBtn")
    const inputs = document.querySelectorAll(".input-controller textarea")
    saveBtn.forEach((sb, i) => {
        sb.addEventListener("click", () => {
            updateItem(inputs[i].value, i)
        })
    })
}

function updateItem(text, i){
    itemsArry[i].text = text
    localStorage.setItem("items", JSON.stringify(itemsArry))
    location.reload()
}

function toggleItemCompletion(i){
    itemsArry[i].done = !itemsArry[i].done
    localStorage.setItem("items", JSON.stringify(itemsArry))
    location.reload()
}

// cancel BTN
function activateCancelListeners(){
    const cancelBtn = document.querySelectorAll(".cancelBtn")
    const updateController = document.querySelectorAll(".update-controller")
    const inputs = document.querySelectorAll(".input-controller textarea")
     cancelBtn.forEach((cb, i) => {
        cb.addEventListener("click", () => {
            updateController[i].style.display = "none"
            inputs[i].disabled = true
        })
     })
}

// deletion of items from the array (LS)
function deleteItem(i){
    itemsArry.splice(i, 1)
    localStorage.setItem("items", JSON.stringify(itemsArry))
    location.reload()
}

// push to (LS);
function createItem(item){
    if (!item.value.trim()) return
    itemsArry.push({ text: item.value, done: false })
    localStorage.setItem("items", JSON.stringify(itemsArry))
    location.reload()
}
function activateCheckListeners(){
    const checkBtn = document.querySelectorAll(".checkBtn")
    checkBtn.forEach((cb, i) => {
        cb.addEventListener("click", () => { toggleItemCompletion(i) })
    })
}

// setting the date
function displayDate(){
    let date = new Date()
    date = date.toString().split(" ")
    document.querySelector("#date").innerHTML = date[1] + " " + date[2] + " " + date[3]
}

window.onload = function(){
    displayDate()
    displayItems()
}
