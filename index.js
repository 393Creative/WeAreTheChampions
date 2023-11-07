import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL: "https://wearechampsscrim-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)

const mainElDB = ref(database, "mainEl")
const fromElDB = ref(database, "fromEl")
const toElDB = ref(database, "toEl")

const mainEl = document.getElementById("main-input-el")
const btnEl = document.getElementById("btn-el")
const listEl = document.getElementById("list-el")
const fromEl = document.getElementById("from-el")
const toEl = document.getElementById("to-el")

btnEl.addEventListener("click", function () {
  let mainInputValue = mainEl.value
  let toInputValue = toEl.value
  let fromInputValue = fromEl.value
  if (mainInputValue){
  push(mainElDB, mainInputValue)
  push(toElDB, toInputValue)
  push(fromElDB, fromInputValue)
  formClear()}else{
    formClear()}
})

  onValue(mainElDB, function (snapshot) {
    if (snapshot.exists()) {
      const mainData = snapshot.val()
      const mainArray = Object.entries(mainData)

      onValue(fromElDB, function (snapshot) {
        const toData = snapshot.val()
        const toArray = Object.entries(toData)

        onValue(toElDB, function (snapshot) {
          const fromData = snapshot.val()
          const fromArray = Object.entries(fromData)

          listEl.innerHTML = ""

          for (let i = 0; i < mainArray.length; i++) {
            let currentFromArray = toArray[i][1]
            let currentMainArray = mainArray[i][1]
            let currentToArray = fromArray[i][1]

            appendToMainDB(currentFromArray, currentMainArray, currentToArray)
          }
        })
      })
    }
  })

function formClear() {
  mainEl.value = ""
  fromEl.value = ""
  toEl.value = ""
}

function appendToMainDB(from, main, to) {
    const newLiEl = document.createElement("li")
    const newH3 = document.createElement("h3")
    const newH5 = document.createElement("h4")
  
    newH3.innerHTML += `- ${to}`
    newLiEl.appendChild(newH3)
  
    newLiEl.innerHTML += main
  
    newH5.innerHTML += `Sincerely, ${from}`
    newLiEl.appendChild(newH5)
  
    listEl.insertBefore(newLiEl, mainEl.firstChild)
}

