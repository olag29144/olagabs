// local storage
const itemsArry = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : []
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
        items += `  <div class="item">
                        <div class="input-controller">
                            <textarea disabled>${itemsArry[i]}</textarea>
                            <div class="edit-controller">
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
    itemsArry[i] = text
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
    itemsArry.push(item.value)
    localStorage.setItem("items", JSON.stringify(itemsArry))
    location.reload()
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
