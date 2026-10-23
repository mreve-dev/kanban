import { deleteCard, updateCard, updateCounters } from "./fonction";


const statuses = ["todo", "doing", "done"];

export const renderCard = (card) => {
  console.log(card);

  const todoColumn = document.querySelector(".column--todo");
  const doingColumn = document.querySelector(".column--doing");
  const doneColumn = document.querySelector(".column--done");

  const articleCard = document.createElement("article");
  const divCardActions = document.createElement("div");
  const divCardMoves = document.createElement("div");

  const titleParagraph = document.createElement("p");
  const btnLeft = document.createElement("button");
  const btnRight = document.createElement("button");
  const btnDelete = document.createElement("button");

  titleParagraph.textContent = card.title;
  btnLeft.innerHTML = `<i class="fa-solid fa-arrow-left-long" aria-hidden="true"></i>`;
  btnRight.innerHTML = `<i class="fa-solid fa-arrow-right-long" aria-hidden="true"></i>`;
  btnDelete.innerHTML = `<i class="fa-solid fa-trash-can" aria-hidden="true"></i>`;

  articleCard.classList.add("card");
  titleParagraph.classList.add("card__title");
  divCardActions.classList.add("card__actions");
  divCardMoves.classList.add("card__moves");
  btnLeft.classList.add("btn-move");

  const updateButtons = () => {
    btnLeft.disabled = card.status === "todo";
    btnRight.disabled = card.status === "done";
  };
  updateButtons();

  const moveTo = async (newStatus) => {
    const updateStatus = await updateCard({id: card.id, title: card.title, status: newStatus})
    const targetColumn = document.querySelector(`.column--${newStatus}`)
    if (updateStatus) {
      card.status = newStatus;
      updateButtons();
      targetColumn.append(articleCard) 
      updateCounters()
    }
  };

  btnRight.classList.add("btn-move");
  btnDelete.classList.add("btn-delete");

  articleCard.setAttribute("draggable", true);
  articleCard.dataset.id = card.id;
  articleCard.dataset.status = card.status;
  btnLeft.setAttribute("type", "button");
  btnRight.setAttribute("type", "button");
  btnDelete.setAttribute("type", "button");
  btnLeft.setAttribute("aria-label", "Déplacer vers la colonne précédente");
  btnRight.setAttribute("aria-label", "Déplacer vers la colonne suivante");
  btnDelete.setAttribute("aria-label", "Supprimer la carte");

  divCardMoves.append(btnLeft, btnRight);
  divCardActions.append(divCardMoves, btnDelete);
  articleCard.append(titleParagraph, divCardActions);

  // supprime une card
  btnDelete.addEventListener("click", async () => {
    const ok = await deleteCard({ id: card.id });

    if (ok) {
      articleCard.remove();
      updateCounters()
    }
  });

  btnRight.addEventListener("click", async () => {
    if (card.status === "todo") {
      const updateStatus = await updateCard({ id: card.id, status: "doing" });
      if (updateStatus) {
        card.status = updateStatus.status;
        updateButtons();
        
        doingColumn.append(articleCard);
        updateCounters()
      }
    } else if (card.status === "doing") {
      const updateStatus = await updateCard({ id: card.id, status: "done" });
      if (updateStatus) {
        card.status = updateStatus.status;
        updateButtons();
        
        doneColumn.append(articleCard);
        updateCounters()
      }
    } else {
      return console.log("c'est nul, ça marche pas");
    }
  });

  btnLeft.addEventListener("click", async () => {
    if (card.status === "doing") {
      const updateStatus = await updateCard({ id: card.id, status: "todo" });

      if (updateStatus) {
        card.status = updateStatus.status;
        updateButtons();
        todoColumn.append(articleCard);
        updateCounters()
      }
    }

    if (card.status === "done") {
      const updateStatus = await updateCard({ id: card.id, status: "doing" });
      if (updateStatus) {
        card.status = updateStatus.status;
        updateButtons();
        doingColumn.append(articleCard);
        updateCounters()
      }
    }
  });


  articleCard.addEventListener("dragstart", (event) => {
    articleCard.classList.add("is-dragging")

    // ranger l'id pendant le transport de la card: id sous l'etiquette text/plain à relire au dépôt
    event.dataTransfer.setData("text/plain", card.id)
  })
  
  articleCard.addEventListener("dragend", (event) => {
    articleCard.classList.remove("is-dragging")
  })

  return articleCard;
};
