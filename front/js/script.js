async function getProducts() {
    const response = await fetch("http://localhost:3000/api/products");
    const dataRes = await response.json();
    console.log(dataRes);

    //Réalisation d'une boucle
    dataRes.forEach((product) => {
        //Ajouter lien de la carte produit
        const itemsSection = document.getElementById("items");
        const itemCardlink = document.createElement("a");
        itemCardlink.href = "./product.html?id=" + product._id;
        itemsSection.appendChild(itemCardlink);

        //Ajout de la balise <article> dans le lien
        const article = document.createElement("article");
        itemCardlink.appendChild(article);

        //Ajout de l'image de la carte produit
        const image = document.createElement("img");
        image.src = product.imageUrl;
        image.alt = product.altTxt;
        article.appendChild(image);

        //Ajout titre produit via balise h3
        const articleTitle = document.createElement("h3");
        articleTitle.classList.add("productName");
        articleTitle.innerText = product.name;
        article.appendChild(articleTitle);

        //Ajout texte description produit
        const productDescription = document.createElement("p");
        productDescription.classList.add("productDescription");
        productDescription.innerText = product.description;
        article.appendChild(productDescription);
    });
}

getProducts();
