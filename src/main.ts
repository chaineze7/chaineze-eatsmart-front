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

 
// Fonction principale avec le code qui sera afficher 
async function init() {
    console.log("Chargement des données...");

    const articles = await fetchArticle();

    // Affichage dans la console 
    console.log(articles);


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
                        <p><strong> Prix : ${c.prix} €</strong></p>
                        
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

            });
        });
    
        

       
    }  
}

    

// Affichage 
init();












