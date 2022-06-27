async function displayProduct() {
    //Récupérer l'id du produit depuis l'URL via UrlSearchParams
    const getIdFromUrl = window.location.search;
    console.log(getIdFromUrl);
    const urlSearchParams = new URLSearchParams(getIdFromUrl);
    id = urlSearchParams.get("id");

    //Récupérer les données de l'api.
    const response = await fetch("http://localhost:3000/api/products/" + id);
    const productData = await response.json();
    console.log(productData);

    //Affichage de l'image du produit
    const item__img = document.querySelector(".item__img");
    const image = document.createElement("img");
    image.src = productData.imageUrl;
    image.alt = productData.altTxt;
    item__img.appendChild(image);

    //Affichage du titre du produit
    const title = document.getElementById("title");
    title.innerHTML = productData.name;

    //Affichage du prix du produit
    const price = document.getElementById("price");
    price.innerHTML = productData.price;

    //Affichage de la description du produit
    const description = document.getElementById("description");
    description.innerHTML = productData.description;

    //Affichage des options de couleurs
    productData.colors.forEach((color) => {
        //console.log(color);
        const colors = document.getElementById("colors");
        const option = document.createElement("option");
        option.value = color;
        option.innerHTML = color;
        colors.appendChild(option);
    });

    //Fonction d'ajout au panier.
    function addToCart() {
        const addButton = document.getElementById("addToCart");
        const quantity = document.getElementById("quantity");
        const storage = [];

        addButton.addEventListener("click", (e) => {
            e.preventDefault();
            if (colors.value !== "" && quantity !== 0 /*&& quantity <= 100*/) {
                const object = {};
                object["_id"] = productData._id;
                object["color"] = colors.value;
                object["quantity"] = quantity.value;

                storage.push(object);

                localStorage.setItem("cart", JSON.stringify(storage));
                console.log(storage);

                /*Redirection vers panier.
                window.location = "cart.html";
                */
            } else {
                window.location = "./product.html?id=" + productData._id;
            }
            //console.log(dataToStore);
        });
    }
    addToCart();
}
displayProduct();
