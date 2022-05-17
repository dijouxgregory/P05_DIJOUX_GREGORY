

// Get the previous localStorage cart array
let getLocalStoragedCart = JSON.parse(localStorage.getItem("array")); // get just one key so not good
console.log("array",getLocalStoragedCart)

//Get a cart display
async function myCart (){
    // Get data from fecth
    let res = await fetch('http://localhost:3000/api/products');
    let productsArray = await res.json();
    //console.log(productsArray)
    if (getLocalStoragedCart == null){
        document.getElementById("cart__items")
        .innerHTML = `<h2>Votre panier est vide</h2> `
    }else{
        

       

        document.getElementById("cart__items")
        .innerHTML = `<article class="cart__item" data-id="${getLocalStoragedCart._id}" data-color="${getLocalStoragedCart.color}">
        <div class="cart__item__img">
          <img src="${getLocalStoragedCart.img}" alt="${getLocalStoragedCart.alt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${getLocalStoragedCart.name}</h2>
            <p>${getLocalStoragedCart.color}</p>
            <p>${getLocalStoragedCart.price}</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : ${getLocalStoragedCart.quantity}</p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>
        
        `
    }
    
    



    // Let display cart 
    /*document.getElementById('cart__item') 
    .innerHTML = productsArray.map((product) =>{
        console.log(product._id)
        `
       <article class="cart__item" data-id="${product._id}" data-color="${product.color}" >
            <div class="cart__item__img">
                <img src="../images/product01.jpg" alt="Photographie d'un canapé">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>Nom du produit</h2>
                    <p>Vert</p>
                    <p>42,00 €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>   
       </article> 
    `
    })*/




}
myCart()

