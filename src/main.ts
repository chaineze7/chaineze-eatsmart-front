import './style.css'



interface Commande {
    id: number;
    nom: string;
    description: string;
    prix: number;

}


const commandes: Commande[] = [
    {
        id: 1,
        nom: "Anchois 23cm",
        description: "sauce tomate premium, origan, huile d'olive extra vierge, anchois, olive",
        prix: 7.9

    },

    {
        id: 2,
        nom: "Emmental 23cm",
        description: "sauce tomate premium, origan, huile d'olive extra vierge, emmental, basilic, olive",
        prix: 7.9
    },

    {
        id: 3,
        nom: "Margherita 23cm",
        description: "sauce tomate premium, origan, huile d'olive extra vierge, mozzarella",
        prix: 7.9
    }
]


// ``

console.log(commandes); // pour afficher en console les données. 


// On précise <HTMLDivElement> pour que TS connaisse les propriétés de la DIV

const appDiv = document.querySelector<HTMLDivElement>('#app')

// "if" est une sécutité indispensable ici
if (appDiv) {
    appDiv.innerHTML= `
    
    ${commandes.map(c => {

        return `
        <div class="card">
            <h3>${c.nom}</h2>
            <p>${c.description}</p>
            <p><strong> Prix : ${c.prix} €</strong></p>
            
        </div>`

        // Utilisation du join pour "coller" tous les éléments du tableau sans aucun séparateur 
    }).join('')
    } 

       
    `;
}

