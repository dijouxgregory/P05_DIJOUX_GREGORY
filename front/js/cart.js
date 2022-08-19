function createLineCart(itemData, element) {
    const articlesSection = document.getElementById("cart__items");
    const articles = document.createElement("article");
    articles.classList.add("cart__item");
    articles.setAttribute("data-id", element._id);
    articles.setAttribute("data-color", element.color);
    articlesSection.appendChild(articles);

    //Création de la div contenant l'image
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("cart__item__img");
    articles.appendChild(imageContainer);

    //Création de l'image
    const image = document.createElement("img");
    image.src = itemData.imageUrl;
    image.alt = itemData.altTxt;
    imageContainer.appendChild(image);

    //Création de la div cart__item__content
    const cartItemContent = document.createElement("div");
    cartItemContent.classList.add("cart__item__content");
    articles.appendChild(cartItemContent);

    //Création de la div cart__item__content__description
    const cartItemContentDescription = document.createElement("div");
    cartItemContentDescription.classList.add(
        "cart__item__content__description"
    );
    cartItemContent.appendChild(cartItemContentDescription);

    //insertion du titre du produit
    const articleTitle = document.createElement("h2");
    articleTitle.innerText = itemData.name;
    cartItemContentDescription.appendChild(articleTitle);

    //insertion de la couleur choisie
    const selectedColor = document.createElement("p");
    selectedColor.innerText = element.color;
    cartItemContentDescription.appendChild(selectedColor);

    //insertion du prix

    let productPrice = document.createElement("p");
    productPrice.innerText = element.quantity * itemData.price + "€";
    cartItemContentDescription.appendChild(productPrice);
    //console.log(typeof element.quantity);

    //Création de la div cart__item__content__settings
    const cartItemContentSettings = document.createElement("div");
    cartItemContent.classList.add("cart__item__content__settings");
    cartItemContent.appendChild(cartItemContentSettings);

    //insertion de la quantité
    const cartItemContentSettingsQuantity = document.createElement("p");
    cartItemContentSettingsQuantity.innerText = "Qté : ";
    cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);

    //Création de l'input quantity
    const inputItemQuantity = document.createElement("input");
    inputItemQuantity.setAttribute("type", "number");
    inputItemQuantity.classList.add("itemQuantity");
    inputItemQuantity.setAttribute("name", "itemQuantity");
    inputItemQuantity.setAttribute("min", "1");
    inputItemQuantity.setAttribute("max", "100");
    inputItemQuantity.setAttribute("value", +element.quantity);
    cartItemContentSettingsQuantity.appendChild(inputItemQuantity);

    quantityChanges(itemData, productPrice);

    //Création de la div cart__item__content__settings__delete
    const cartItemContentSettingsDelete = document.createElement("div");
    cartItemContentSettingsDelete.classList.add(
        "cart__item__content__settings__delete"
    );
    cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

    //Création du boutton de suppression de l'article
    const deleteItem = document.createElement("p");
    deleteItem.classList.add("deleteItem");
    deleteItem.innerText = "supprimer";
    cartItemContentSettingsDelete.appendChild(deleteItem);

    deleteButton(element);
}

//Fonction de récupération depuis le localStorage.
const cartDisplay = async () => {
    // On récupère le panier dans le localStorage
    const cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart);

    //
    cart.forEach(async (cartItem) => {
        const response = await fetch(
            "http://localhost:3000/api/products/" + cartItem._id
        );
        const data = await response.json();

        createLineCart(data, cartItem);
    });
};

cartDisplay();

//Fonction de changement de prix lors de l'incrémentation ou diminution de la quantité.
const quantityChanges = (itemData, productPrice) => {
    const itemQuantitySelector = document.querySelector(".itemQuantity");
    console.log(itemQuantitySelector);
    itemQuantitySelector.addEventListener("change", () => {
        const itemQuantity = parseInt(itemQuantitySelector.value);
        //console.log(itemQuantity);
        productPrice.innerText = itemQuantity * itemData.price + "€";
    });
};

//Fonction de suppression.
const deleteButton = (element) => {
    //selection du button de suppression.
    const button = document.querySelector(".deleteItem");

    //id du produit
    const productId = element._id;
    const productColor = element.color;
    console.log(productId);
    console.log(productColor);

    button.addEventListener("click", (e) => {
        //e.preventDefault();
        if (element._id !== null) {
            localStorage.removeItem("cart", `${element}`);
            console.log("check");
        }
    });
};
