
// Run fetch() on console to verify API interaction
const getProducts = async function (){
    try{
        let res = await fetch('http://localhost:3000/api/products/415b7cacb65d43b2b5c1ff70f3393ad1')
        if (res.ok){
            let data = await res.json()
            console.log (data) 
        }else {
            console.error('Server return :', res.status)
        }
    } catch (e) {
        console.log(e)
    }
} 

getProducts()

// Get product id to insert on url and get dynamique redirection
const urlProduct = window.location.search.split('?').join("");
//console.log(urlProduct)



// Single-product page layout base code
async function getSingleProduct () {
     let res = await fetch(`http://localhost:3000/api/products/${urlProduct}`);
     let productInfo = await res.json();
     console.log(productInfo)
     //Get product name on title balises
     document.querySelector('title')
     .innerText = `${productInfo.name}?${productInfo._id}`
     //Get product image
     document.querySelector('.item__img')
     .innerHTML = `<img src="${productInfo.imageUrl }" alt="${productInfo.altTxt}"/>`
     //Get product name
     document.getElementById('title')
     .innerText = `${productInfo.name}`
     //Get product price
     document.getElementById('price')
     .innerText = `${productInfo.price}`
     //Get product description
     document.getElementById('description')
     .innerText = `${productInfo.description}`
     //Get all product variation 
     productInfo.colors.map((color) =>{
         //console.log(color)
         document.getElementById('colors')
         .insertAdjacentHTML ('beforeend', `<option value="${color}">${color}</option>`)     
     })
     addToCart(productInfo)
            
     //``
        
}
getSingleProduct()


let colorSelected =  document.getElementById('colors')
    .addEventListener('change', () => {
        console.log (colors.value)
        //return colors.value
    });
    let inputedNumber = document.getElementById('quantity')
    .addEventListener ('change', () => {  
        console.log (quantity.value) 
        //return quantity.value
    });




    

// add to card function
 async function addToCart () {
    let res = await fetch(`http://localhost:3000/api/products/${urlProduct}`);
    let productInfo = await res.json();
    //console.log(productInfo)
    //export for save the selection
    document.getElementById('addToCart')
    .addEventListener ("click", () =>{
        //e.preventDefault()
            //Get the selected color
    document.getElementById('colors')
    .addEventListener('change', () => {
        //console.log (colors.value)
        
    });
    document.getElementById('quantity')
    .addEventListener ('change', () => {  
        //console.log (quantity.value) 
        
    });
    //Stock on localStorage the cart on array
    /*let itemSelected =[
        productInfo._id, 
        productInfo.name,
        productInfo.price,
        productInfo.description,
        colors.value,
        quantity.value
        ]*/
        let itemSelected ={};
        itemSelected['img']= productInfo.imageUrl; 
        itemSelected['alt']= productInfo.altTxt;
        itemSelected['_id']= productInfo._id;  
        itemSelected['name']= productInfo.name;
        itemSelected['price']= productInfo.price;
        itemSelected['description']= productInfo.description;
        itemSelected['color']= colors.value;
        itemSelected['quantity']= quantity.value;  
     //console.log(itemSelected)
     //Generate a dynamic localStorage key
     let key =productInfo._id;
     if (key != productInfo._id){

     }
     localStorage.setItem(`key="${productInfo._id}"`,JSON.stringify(itemSelected))
       

    })

 }
 




