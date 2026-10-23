import { renderCard } from "./card.js";
import { getAllCards, postCard, deleteCard, updateCard } from "./fonction.js";


const inputTitle = document.querySelector('#new-card')
const formInput = document.querySelector('.add-form')
const todoColumn = document.querySelector(".column--todo")


// récupère toutes les cards
const loadCard = async () => {
    const cards = await getAllCards()
    cards.forEach((card) => {
        todoColumn.append(renderCard(card))
    })
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
})












