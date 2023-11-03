import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://wearechampsscrim-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const fromElDB = ref(database, "From")
const toElDB = ref(database, "To")
const mainElDB = ref(database, "Main")

let fromEl = document.getElementById('from-el')
let toEl = document.getElementById('to-el')
let mainEl = document.getElementById('main-input-el').value
let btnEl = document.getElementById('btn-el')
let endorseEl = document.getElementById('endorse-el')


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
        endorseDiv.innerHTML += `<p>No Items Here...... Yet</p>`
    }
})

function endorseElClear() {
    endorseEl.innerHTML = ""
}

function mainElIClear() {
    mainEl = ' '
    
}
function appendToMainDB(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("dblclick", function() {
        let exactLocationOfListItem = ref(database, `Main/${itemID}`)

        remove(exactLocationOfListItem)
    })

    endorseEl.append(newEl)
}

