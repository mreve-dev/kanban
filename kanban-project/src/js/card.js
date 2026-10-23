import { deleteCard } from "./fonction";

export const renderCard = (card) => {
    console.log(card);
    
  const articleCard = document.createElement("article");
  const divCardActions = document.createElement("div");
  const divCardMoves = document.createElement("div");

  const titleParagraph = document.createElement("p");
  const btnMove1 = document.createElement("button");
  const btnMove2 = document.createElement("button");
  const btnDelete = document.createElement("button");

  titleParagraph.textContent = card.title;
  btnMove1.innerHTML = `<i class="fa-solid fa-arrow-left-long" aria-hidden="true"></i>`;
  btnMove2.innerHTML = `<i class="fa-solid fa-arrow-right-long" aria-hidden="true"></i>`;
  btnDelete.innerHTML = `<i class="fa-solid fa-trash-can" aria-hidden="true"></i>`;

  articleCard.classList.add("card");
  titleParagraph.classList.add("card__title");
  divCardActions.classList.add("card__actions");
  divCardMoves.classList.add("card__moves");
  btnMove1.classList.add("btn-move");
  btnMove2.classList.add("btn-move");
  btnDelete.classList.add("btn-delete");

  articleCard.setAttribute("draggable", true);
  articleCard.dataset.id = card.id
  btnMove1.setAttribute("type", "button");
  btnMove2.setAttribute("type", "button");
  btnDelete.setAttribute("type", "button");
  btnMove1.setAttribute("aria-label", "Déplacer vers la colonne précédente");
  btnMove2.setAttribute("aria-label", "Déplacer vers la colonne suivante");
  btnDelete.setAttribute("aria-label", "Supprimer la carte");

  divCardMoves.append(btnMove1, btnMove2);
  divCardActions.append(divCardMoves, btnDelete);
  articleCard.append(titleParagraph, divCardActions);

  // supprime une card
  btnDelete.addEventListener("click", async () => {

    const ok = await deleteCard({ id: card.id });

    if (ok) {
      articleCard.remove();
    }
  });

  return articleCard;
};
