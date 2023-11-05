import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://wearechampsscrim-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const mainElDB = ref(database, "Main")
const mainEl = document.getElementById("main-input-el")
const btnEl = document.getElementById("btn-el")
const listEl = document.getElementById("list-el")



// const fromElDB = ref(database, "From")
// const toElDB = ref(database, "To")
// let fromEl = document.getElementById('from-el')
// let toEl = document.getElementById('to-el')


btnEl.addEventListener('click', function(){
    let inputValue = mainEl
    push(mainElDB, inputValue)
    mainElIClear()
})

onValue(mainElDB, function(snapshot) {

    if (snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())
    
    shoppingListClear()
    
    for (let i = 0; i < itemsArray.length; i++) {
        let currentItem = itemsArray[i]

        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]
        
        appendItemToMainDB(currentItem)
        
    }}else{
        let p = document.createElement("p")
        p.textContent = "No Items Here...... Yet"
        document.body.appendChild(p)
    }
})

function listElClear() {
    listEl.innerHTML = ""
}

function mainElIClear() {
    mainEl.value = ''
    
}
function appendToMainDB(item) {
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    listEl.append(newEl)
}

