/*
 * This file manages the display of all the products on the home page
 */

/*
 * Retrieves the list of products from the API.
 * @returns {Promise} Promise object represents list of all produts
 */
async function getProducts() {
  const data = await fetch('http://localhost:3000/api/products')
    .then((res) => {
      if (res.ok) {
        return res.json().then((data) => data);
      } else {
        console.log('HTTP error with the url ' + res.url);
      }
    })
    .catch((e) => console.log(e));
  return data;
}

/*
 * Displays a single product in the DOM.
 * @params {Object[]} product - The product you want to display
 */
function displayProduct(product) {
  document.getElementById('items').innerHTML += `
    <a href="./product.html?id=${product._id}">
      <article>
      <img src="${product.imageUrl}" alt="${product.altTxt}">
      <h3 class="productName">${product.name}</h3>
      <p class="productDescription">${product.description}</p>
      </article>
      </a>`;
}

/*
 * Displays all products on the homepage.
 */
async function main() {
  const products = await getProducts();
  for (let i = 0; i < products.length; i++) {
    displayProduct(products[i]);
  }
}

main();
