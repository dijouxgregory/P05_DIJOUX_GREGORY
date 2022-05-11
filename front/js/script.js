//Get Product array from API at first
const getProducts = async function (){
    try{
        let res = await fetch('http://localhost:3000/api/products')
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
    
// Homepage productsSection

async function productsItemsTable () {
     let res = await fetch('http://localhost:3000/api/products');
     let productsArray = await res.json();
     document.getElementById('items')
     //will search for each product of products
     .innerHTML = productsArray.map((product) => `
        <a href="./product.html?${product._id}">
        <article>
        <img src="${product.imageUrl}" alt="${product.altTxt}"/>
        <h3 class="productName">${product.name}<?h3>
        <p>${product.description}</p>
        </article>
        </a>  
        `        
        )
    .join("");

     

   
         
      
      
     
}
productsItemsTable()




