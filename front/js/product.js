const displayProduct = async () => {
    //Récupérer l'id du produit depuis l'URL via UrlSearchParams
    const urlParams = window.location.search;
    const urlSearchParams = new URLSearchParams(urlParams);
    const productId = urlSearchParams.get("id");

    //Récupérer les données de l'api.
    const response = await fetch(
        "http://localhost:3000/api/products/" + productId
    );
    const productData = await response.json();

    //Affichage de l'image du produit
    const item__img = document.querySelector(".item__img");
    const image = document.createElement("img");
    image.src = productData.imageUrl;
    image.alt = productData.altTxt;
    item__img.appendChild(image);

    //Affichage du titre du produit
    const title = document.getElementById("title");
    title.innerText = productData.name;

    //Affichage du prix du produit
    const price = document.getElementById("price");
    price.innerText = productData.price;

    //Affichage de la description du produit
    const description = document.getElementById("description");
    description.innerText = productData.description;

    //Affichage des options de couleurs
    productData.colors.forEach((color) => {
        //console.log(color);
        const colors = document.getElementById("colors");
        const option = document.createElement("option");
        option.value = color;
        option.innerHTML = color;
        colors.appendChild(option);
    });

    addToCart();
};

displayProduct();

//Fonction d'ajout au panier.
const addToCart = () => {
    const addButton = document.getElementById("addToCart");

    addButton.addEventListener("click", (e) => {
        let errors = 0;
        const colors = document.getElementById("colors");
        const quantity = document.getElementById("quantity");

        //e.preventDefault();
        // On envoie dans le localStorage si champs non vide

        if (colors.value === "") {
            const msgErrorContent = document.getElementById("color-msg-error");
            if (msgErrorContent === null) {
                const colorMsgError = document.createElement("p");
                colorMsgError.setAttribute("id", "color-msg-error");
                colorMsgError.style.textAlign = "center";
                colorMsgError.innerText = "* couleur obligatoire";
                const selectParent = document.querySelector(
                    ".item__content__settings__color"
                );
                selectParent.appendChild(colorMsgError);
            }
            errors++;
        } else {
            const msgErrorContent = document.getElementById("color-msg-error");
            if (msgErrorContent) {
                msgErrorContent.remove();
            }
        }

        //console.log(typeof quantity.value);
        // même chose que colors on check la quantité avec parseInt
        let parsedQuantity = parseInt(quantity.value);

        if (parsedQuantity >= 1 && parsedQuantity <= 100) {
            const msgErrorContent =
                document.getElementById("quantity-msg-error");
            if (msgErrorContent) {
                msgErrorContent.remove();
            }
        } else {
            const msgErrorContent =
                document.getElementById("quantity-msg-error");
            if (msgErrorContent === null) {
                const quantityMsgError = document.createElement("p");
                quantityMsgError.setAttribute("id", "quantity-msg-error");
                quantityMsgError.style.textAlign = "center";
                quantityMsgError.innerText =
                    "* Veuillez indiquer une quantité comprise entre 1 et 100.";
                const selectParent = document.querySelector(
                    ".item__content__settings__quantity"
                );
                selectParent.appendChild(quantityMsgError);
            }
            errors++;
        }

        //console.log(errors);
        if (errors === 0) {
            // Nouvelle variable pour l'id du produit
            const urlParams = window.location.search;
            const urlSearchParams = new URLSearchParams(urlParams);
            const productId = urlSearchParams.get("id");

            let storage = JSON.parse(localStorage.getItem("cart"));
            if (!storage) {
                storage = [];
            }

            if (
                storage.some(
                    (product) =>
                        product._id === productId &&
                        product.color === colors.value
                )
            ) {
                storage = storage.map((product) => {
                    if (
                        product._id === productId &&
                        product.color === colors.value
                    ) {
                        product.quantity += parsedQuantity;
                    }
                    return product;
                });
            } else {
                // Création d'un object
                const product = {
                    _id: productId,
                    color: colors.value,
                    quantity: parsedQuantity,
                };
                storage.push(product);
            }

            const addTocartSection = document.querySelector(
                ".item__content__addButton"
            );
            localStorage.setItem("cart", JSON.stringify(storage));
            const addCartMsg = document.createElement("p");
            addCartMsg.setAttribute("id", "addedCart");
            addCartMsg.style.textAlign = "center";
            addCartMsg.innerText = "Votre produit a bien été ajouté au panier";
            addTocartSection.style.flexDirection = "column";
            const cartMsg = document.getElementById("addedCart");
            //Si msgCount = 0 alors affiche le message et change msgCount = 0 à msgCount = 1
            if (cartMsg === null) {
                addTocartSection.appendChild(addCartMsg);
                console.log(addCartMsg);
            } else {
                // sinon rien
            }
            console.log(addCartMsg);
        }
    });
};
