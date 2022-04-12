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
      }
    })
    .catch((e) => console.log(e));
  return data;
}

/*
 * Displays product details.
 */
async function displayProduct() {
  const productId = getProductId();
  const product = await getProduct(productId);

  document.title = `${product.name} | Kanap`;
  document.getElementById('item__img').innerHTML = `
    <img src="${product.imageUrl}" alt="${product.altTxt}">`;
  document.getElementById('title').innerText = product.name;
  document.getElementById('price').innerText = product.price;
  document.getElementById('description').innerText = product.description;

  for (color in product.colors) {
    document.getElementById(
      'colors'
    ).innerHTML += `<option value="${product.colors[color]}">${product.colors[color]}</option>`;
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
 * Add the product to the cart
 */
function addToCart() {
  const productId = getProductId();
  const productColor = document.getElementById('colors').value;
  const productQuantity = document.getElementById('quantity').value;

  let newItem = {
    id: productId,
    color: productColor,
    quantity: productQuantity,
  };

  let cart = getCart();
  let prevItem = cart.find((p) => p.id == productId && p.color == productColor);
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
    if ((a.id = b.id)) {
      if (a.color < b.color) return -1;
      if (a.color > b.color) return 1;
    }
    return 0;
  });
  saveCart(cart);
}

displayProduct();

const addToCartButton = document.getElementById('addToCart');
addToCartButton.addEventListener('click', addToCart);
