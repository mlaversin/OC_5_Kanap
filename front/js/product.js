/*
 * This file handles two things on the Product page :
 *    - display of product details on the product page
 *    - adding the product to cart
 */

/*
 * Get product id from url.
 * @returns {str} Id of the product to display
 */
function getProductId() {
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);
  if (searchParams.has('id')) {
    const id = searchParams.get('id');
    return id;
  }
}

/*
 * Retrieves the product to display from the API.
 * @params {string} productId - The id of the product to display
 * @returns {Promise} Promise object represents the product to display
 */
async function getProduct(productId) {
  const data = await fetch(`http://localhost:3000/api/products/${productId}`)
    .then((res) => {
      if (res.ok) {
        return res.json().then((data) => data);
      } else {
        console.log('HTTP error with the url ' + res.url);
        document.getElementById('item').textContent =
          'Désolé, nous rencontrons actuellement un problème. Merci de revenir plus tard.';
      }
    })
    .catch((e) => {
      console.log(e);
      document.getElementById('item').textContent =
        'Désolé, nous rencontrons actuellement un problème. Merci de revenir plus tard.';
    });

  return data;
}

/*
 * Displays product details.
 */
async function displayProduct() {
  const productId = getProductId();
  const product = await getProduct(productId);

  document.title = `${product.name} | Kanap`;

  let image = document.createElement('img');
  document.querySelector('.item__img').appendChild(image);
  image.src = product.imageUrl;
  image.alt = product.altTxt;

  let name = document.getElementById('title');
  name.textContent = product.name;

  let price = document.getElementById('price');
  price.textContent = product.price;

  let description = document.getElementById('description');
  description.textContent = product.description;

  for (let color of product.colors) {
    let productColor = document.createElement('option');
    document.querySelector('#colors').appendChild(productColor);
    productColor.value = color;
    productColor.textContent = color;
  }
}

/*
 * Get cart information from LocalStorage
 */
function getCart() {
  let cart = localStorage.getItem('cart');
  if (cart == null) {
    return [];
  } else {
    return JSON.parse(cart);
  }
}

/*
 * Saves cart information to LocalStorage
 */
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

/*
 * Displays a confirmation message when a product is added to the cart.
 */
function confirmation() {
  const confirmationMessage = document.getElementById('confirmation');
  confirmationMessage.classList.add('visible');
}

/*
 * Add the product to the cart
 */
function addToCart() {
  const productId = getProductId();
  let productColor = document.getElementById('colors').value;
  let productQuantity = parseInt(document.getElementById('quantity').value);

  if (productQuantity > 0 && productQuantity < 101 && productColor) {
    let newItem = {
      id: productId,
      color: productColor,
      quantity: Math.abs(productQuantity),
    };

    let cart = getCart();
    let prevItem = cart.find(
      (p) => p.id == productId && p.color == productColor
    );
    if (prevItem != undefined) {
      newQuantity = parseInt(prevItem.quantity) + parseInt(newItem.quantity);
      prevItem.quantity = newQuantity;
    } else {
      cart.push(newItem);
    }
    // Sorting of products for a better display on the cart page
    cart.sort((a, b) => {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    });
    saveCart(cart);
    confirmation();
  }
}



function main() {
  displayProduct();

  const addToCartButton = document.getElementById('addToCart');
  addToCartButton.addEventListener('click', addToCart);
}

main();
