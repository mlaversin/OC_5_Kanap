/*
 * This file manages the display of all the products on the homepage
 */

/*
 * Retrieves the list of products from the API.
 * @returns {Promise} Promise object represents list of all produts
 */
async function getProducts() {
  const data = fetch('http://localhost:3000/api/products')
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


  let anchor = document.createElement('a');
  document.getElementById('items').appendChild(anchor);
  anchor.href = `./product.html?id=${product._id}`;

  let article = document.createElement('article');
  anchor.appendChild(article);

  let image = document.createElement('img');
  article.appendChild(image);
  image.src = product.imageUrl;
  image.alt = product.altTxt;

  let name = document.createElement('h3');
  article.appendChild(name);
  name.classList.add('productName');
  name.textContent = product.name;

  let description = document.createElement('p');
  article.appendChild(description);
  description.classList.add('productDescription');
  description.textContent = product.description;
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
