import { renderCard } from "./card.js";
import { getAllCards, postCard, updateCounters } from "./fonction.js";


const inputTitle = document.querySelector('#new-card')
const formInput = document.querySelector('.add-form')
const todoColumn = document.querySelector(".column--todo")
const doingColumn = document.querySelector(".column--doing")
const doneColumn = document.querySelector(".column--done")
const tabs = document.querySelectorAll("nav button")

// récupère toutes les cards
const loadCard = async () => {
    const cards = await getAllCards()
    cards.forEach((card) => {

        if(card.status === "todo"){
            todoColumn.append(renderCard(card))
        } else if (card.status === "doing"){
            doingColumn.append(renderCard(card))
        } else {
            doneColumn.append(renderCard(card))
        }
    })
    updateCounters()
}

loadCard()


// créer une nouvelle card
formInput.addEventListener('submit', async(event) => {
    event.preventDefault()

    const titleInputValue = inputTitle.value.trim()

    if(!titleInputValue) return
    
    const newCard = await postCard({title : titleInputValue})

    console.log(newCard);
    
    if(!newCard.id) return
    console.log("tout vas bien");
    
    todoColumn.append(renderCard(newCard))
    inputTitle.value = ""
    updateCounters()
})


// afficher la bonne colonne au click
tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        todoColumn.classList.remove('is-active')
        doingColumn.classList.remove('is-active')
        doneColumn.classList.remove('is-active')

        const targetColumn = document.querySelector(`.column--${tab.dataset.status}`)

        targetColumn.classList.add('is-active')

        // tous les boutons perdent le fond blanc
        tabs.forEach((t) => t.setAttribute("aria-pressed", "false"))

        // le bouton cliqué prend le fond blanc
        tab.setAttribute("aria-pressed", "true")
    })
})










