async function keygenerator (){
  // Get data from fecth
  let res = await fetch('http://localhost:3000/api/products');
  let productsArray = await res.json();
  //console.log(productsArray)
  let product = productsArray.map((product) =>{
    return product
  })
  //console.log(product)


  // Make a loop to get each localStorage data
  for ( i = 0; i < localStorage.length; i++) {
    let getLocalStoragedCart = JSON.parse(localStorage.getItem(localStorage.key(i))); // get just one key so not good
    console.log(localStorage.key(i),getLocalStoragedCart)
    //test for get respective product info on console
    console.log(getLocalStoragedCart._id)
    console.log(getLocalStoragedCart.name)
    console.log(getLocalStoragedCart.price)

    // Then try to get a display for all items add to the local Storage but just get on so need to fixe it
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
          <p>Qté :</p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${getLocalStoragedCart.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
    
    `
  }  
}
keygenerator();

