import './style.css'



interface Article {
    id: number;
    nom: string;
    description: string;
    prix: number;

}


async function fetchArticle(): Promise<Article[]> {

     const res = await fetch('http://localhost/eatsmart-chaineze/articles');
     return await res.json();
}

async function init() {
    console.log("Chargement des données...");

    const articles = await fetchArticle();

    console.log(articles);

}

init();











