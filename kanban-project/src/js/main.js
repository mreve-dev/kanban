import { renderCard } from "./card.js";
import { getAllCards, postCard, updateCounters } from "./fonction.js";

const inputTitle = document.querySelector("#new-card");
const formInput = document.querySelector(".add-form");
const todoColumn = document.querySelector(".column--todo");
const doingColumn = document.querySelector(".column--doing");
const doneColumn = document.querySelector(".column--done");
const tabs = document.querySelectorAll("nav button");
const columns = document.querySelectorAll(".column");

// récupère toutes les cards
const loadCard = async () => {
  const cards = await getAllCards();
  cards.forEach((card) => {
    if (card.status === "todo") {
      todoColumn.append(renderCard(card));
    } else if (card.status === "doing") {
      doingColumn.append(renderCard(card));
    } else {
      doneColumn.append(renderCard(card));
    }
  });
  updateCounters();
};

loadCard();

// créer une nouvelle card
formInput.addEventListener("submit", async (event) => {
  event.preventDefault();

  const titleInputValue = inputTitle.value.trim();

  if (!titleInputValue) return;

  const newCard = await postCard({ title: titleInputValue });

  console.log(newCard);

  if (!newCard.id) return;
  console.log("tout vas bien");

  todoColumn.append(renderCard(newCard));
  inputTitle.value = "";
  updateCounters();
});

// afficher la bonne colonne au click
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    todoColumn.classList.remove("is-active");
    doingColumn.classList.remove("is-active");
    doneColumn.classList.remove("is-active");

    const targetColumn = document.querySelector(
      `.column--${tab.dataset.status}`,
    );

    targetColumn.classList.add("is-active");

    // tous les boutons perdent le fond blanc
    tabs.forEach((t) => t.setAttribute("aria-pressed", "false"));

    // le bouton cliqué prend le fond blanc
    tab.setAttribute("aria-pressed", "true");
  });
});

columns.forEach((column) => {
  // Autoriser le dépôt
  column.addEventListener("dragover", (event) => {
    event.preventDefault();
    column.classList.add("is-over");
  });

  column.addEventListener("dragleave", (event) => {
    if (!column.contains(event.relatedTarget)) {
      column.classList.remove("is-over");
    }
  });

  // Au moment où on lâche la carte sur cette colonne
  column.addEventListener("drop", (event) => {
    event.preventDefault();
    column.classList.remove("is-over")

    // Relire l'id rangé au dragstart
    const id = event.dataTransfer.getData("text/plain");

    // Retrouver la carte dans la page
    const cardElement = document.querySelector(`.card[data-id="${id}"]`);

    // Déplacer la carte vers le statut de cette colonne
    cardElement.moveTo(column.dataset.status);
  });
});
