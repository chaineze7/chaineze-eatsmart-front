// Afin de pouvoir avoir acces a mon api j'ai mis une en-tete sur le fichier index.php du dosier eatsmart-chaineze

import './style.css'



interface Article {
    id: number;
    nom: string;
    description: string;
    prix: number;

}

// tableau panier 
let panier: Article[] = []

// Fonction qui récupère les articles depuis l'api ou y'a la BDD

async function fetchArticle(): Promise<Article[]> {
    
     const res = await fetch('http://localhost/eatsmart-chaineze/articles');
     return await res.json();
}

// interface permettant d'afficher dans la console JSON représentant une commande
interface CommandeDTO {
    id_commande: number | null;
    date_commande: string;
    prix_total: number;
    etat: string;
}


// Fonction pour afficher les articles ajouter dans le panier 
function afficherPanier() {
    const cartDiv = document.getElementById("cart-items");
    const totalPrix = document.getElementById("total-prix");

    if (!cartDiv || !totalPrix) return ;

    // Si le panier est vide 
    if (panier.length === 0) {
        cartDiv.innerHTML = `<p>Votre panier est vide</p>`;
        totalPrix.textContent = "0.00";
        return;
    }

    // On vide le panier avant l'ajout des articles
    cartDiv.innerHTML = "";
    let total = 0;

    // Regarde tous les articles 
    panier.forEach(article => {
        cartDiv.innerHTML += `
            <div class="cart-item">
                <span>${article.nom}</span>
                <span>${Number(article.prix)} €</span>
            </div>
        `;
        // calcul total
        total = total + Number(article.prix);
    });

    // Affichage du total 
    totalPrix.textContent = total.toFixed(2);

     
}
 
// Fonction principale avec le code qui sera afficher 
async function init() {
    
    const articles = await fetchArticle();

    // On précise <HTMLDivElement> pour que TS connaisse les propriétés de la DIV
    const appDiv = document.querySelector<HTMLDivElement>('#app')

    // "if" est une sécutité indispensable ici
    if (appDiv) {
        appDiv.innerHTML= `
    
        <header>
            <h1>EatSmart - Carte du restaurant</h1>
        </header>
    
        <div class="content-wrapper">

            <main class="menu-container">
                ${articles.map(c => `

                    
                    <div class="card">
                        <h3>${c.nom}</h3>
                        <p>${c.description}</p>
                        <p><strong> Prix : ${Number(c.prix).toFixed(2)} €</strong></p>
                        
                        <button class="btn-order">Ajouter </button>
                        
                    </div>

                
                `).join('')} 
            </main>

            <aside class="cart-container">
                <h2>Votre Panier</h2>
                <div id="cart-items">
                    <p>Votre panier est vide</p>
                </div>
                <hr>
                <div class="cart-total">
                    <strong>Total : <span id="total-prix">0.00</span>€</strong>
                </div>

                <button id="btn-valider">Valider la commande</button>
            </aside>
        </div>
        `;
        
        // Récupère tous les boutons
        const boutons = document.querySelectorAll<HTMLButtonElement>('.btn-order');

        // ajout d'un event à chaque bouton
        boutons.forEach((btn, index) => {

            btn.addEventListener('click', () => {

                // récupère le bon article 
                const article = articles[index];

                // affiche le nom du plat 
                console.log(`Bouton n°${index} cliqué ! `,"Article = ", article.nom);

                // ajout du panier 
                panier.push(article);

                // affiche le panier dans la console
                console.log("Panier actuel :", panier);

                afficherPanier();

            });
        });

        const btnValider = document.querySelector<HTMLButtonElement>('#btn-valider');

        if (btnValider) {


            btnValider.addEventListener('click', async () => {

                console.log("Bouton valider commande cliqué");

                // calcul du total
                const total = panier.reduce((sum, articles) => sum + Number(articles.prix), 0);


                // Format date MySQL
                const maintenant = new Date();
                const dateMySQL = maintenant.toISOString().slice(0, 19).replace('T', ' ');

                // Creation du playload
                const nouvelleCommande: CommandeDTO = {
                    id_commande: null,
                    date_commande: dateMySQL,
                    prix_total: total,
                    etat: "en cours"
                };

                
                console.log(nouvelleCommande);


                // Envoi POST
                const response = await fetch('http://localhost/eatsmart-chaineze/commandes', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(nouvelleCommande)
                });

                const result = await response.json();

                const id_commande = result[0].id_commande;

                console.log("Commande enregistrée avec succès, ID:", id_commande);
            });



        }
    
        

       
    }  
}

    

// Affichage 
init();












