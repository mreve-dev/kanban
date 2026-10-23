
// récupère toutes les cards
export async function getAllCards() {
    try {
        const resultat = await fetch(`${import.meta.env.VITE_URL_BACK}/api/cards`, {
            method : "GET"
        });

        if (!resultat.ok) {
            throw new Error("Erreur lors de la récupération des cards");
        }

        const data = await resultat.json();
        const res = data;

        return res

    } catch (e) {
        console.error(e);
    }
}

//getAllCards()


// ajoute une nouvelle card
export async function postCard(card) {
    console.log(import.meta.env.VITE_URL_BACK);
    try {
        const resultat = await fetch(`${import.meta.env.VITE_URL_BACK}/api/cards`, {
            method : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(card)
        });
     

        if (!resultat.ok) {
            throw new Error("Erreur lors de l'ajout de la card'");
        }

        const data = await resultat.json();
        const res = data;

        return res

    } catch (e) {
        console.error(e);
    }
}

//CreateCard({
//    title : "test front"
//})

export async function updateCard(card) {

    const url = `${import.meta.env.VITE_URL_BACK}/api/cards/${card.id}`

    try {
        const resultat = await fetch(url, {
            method : "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(card)
        });

        if (!resultat.ok) {
            throw new Error("Erreur lors de la modification de la card'");
        }

        const data = await resultat.json();
        const res = data;

        return res

    } catch (e) {
        console.error(e);
    }
}

//UpdateCard({
//    id : 1,
//    status : "doing"
//})

export async function deleteCard(card) {

    const url = `${import.meta.env.VITE_URL_BACK}/api/cards/${card.id}`

    try {
        const resultat = await fetch(url, {
            method : "DELETE",
        });

        if (!resultat.ok) {
            throw new Error("Erreur lors de la supression de la card'");
        }

        return true

    } catch (e) {
        console.error(e);
        return false
    }
} 

//deleteCard({
//    id : 1,
//})


const statuses = ['todo', 'doing', 'done']

export function updateCounters() {
    statuses.forEach((status) => {
        const nb = document.querySelectorAll(`.column--${status} .card`).length
        
        document.querySelector(`.${status}__count`).textContent = nb

        document.querySelector(`nav .${status}-text span`).textContent = nb
    })
}