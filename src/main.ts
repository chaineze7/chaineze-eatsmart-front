import './style.css'



interface Commande {
    id: number;
    nom: string;
    description: string;
    prix: number;

}

const maCommande: Commande[] = [
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


console.log(maCommande); // pour afficher en console les données. 





