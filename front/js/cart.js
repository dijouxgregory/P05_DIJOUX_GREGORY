async function localStorageDataDisplay (){
  // Get data from fecth
  let res = await fetch('http://localhost:3000/api/products');
  let productsArray = await res.json();
  //console.log(productsArray)
  
  //Stock Storage object on array to be available to make ForEach or Map() function
  const elements = [];
  //const keys =[];
  for ( let i = 0; i < localStorage.length; i++) {
    let getLocalStoragedCart = JSON.parse(localStorage.getItem(localStorage.key(i))); // get just one key so not good
    console.log(localStorage.key(i),Object.keys(getLocalStoragedCart))//product ids + objects
    //Push array the values
    elements.push(Object(getLocalStoragedCart))
    //keys.push(localStorage.key(i));
  }
  console.log(elements);
  //console.log(keys);

  // Let now display every Localstorage items on HTML
  document.getElementById("cart__items")
  .innerHTML = elements.map((item) => `
  <article class="cart__item" data-id="${item._id}" data-color="${item.color}">
  <div class="cart__item__img">
    <img src="${item.img}" alt="${item.alt}">
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>${item.name}</h2>
      <p>${item.color}</p>
      <p>${item.price}</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p>Qté :</p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
      </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
      </div>
    </div>
  </div>
</article>
        `        
        )
    .join("");
}
localStorageDataDisplay();


//Deleted Function


//Card final price function


//Ordering function


//After order clean localStorage


