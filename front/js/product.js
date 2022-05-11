
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
console.log(urlProduct)

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
         console.log(color)
         document.getElementById('colors')
         .insertAdjacentHTML ('beforeend', `<option value="${color}">${color}</option>`)     
     })
            
     //``
        
}
getSingleProduct()
