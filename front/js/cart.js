import { getValidForm } from './form.js';

/*
 * This file manages :
 *    - displaying products added to the cart
 *    - modifying and deleting products
 *    - sending the order to the API if the contact form is valid
 */

/*
 * Retrieves the product to display from the API.
 * @params {string} productId - The id of the product to display
 * @returns {Promise} Promise object represents the product to display
 */
async function getProduct(productId) {
  const data = fetch(`http://localhost:3000/api/products/${productId}`)
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
 * Get cart information from LocalStorage.
 * @rturns {Object[]} cart - The list of items in the cart
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
 * Model for displaying a cart item in the DOM
 * @params {Object[]} item - The item you want to display
 */
async function displayItem(item) {
  const product = await getProduct(item.id);

  let article = document.createElement('article');
  document.querySelector('#cart__items').appendChild(article);
  article.className = 'cart__item';
  article.setAttribute('data-id', item.id);
  article.setAttribute('data-color', item.color);

  let imgDiv = document.createElement('div');
  article.appendChild(imgDiv);
  imgDiv.className = 'cart__item__img';

  let image = document.createElement('img');
  imgDiv.appendChild(image);
  image.src = product.imageUrl;
  image.alt = product.altTxt;

  let contentDiv = document.createElement('div');
  article.appendChild(contentDiv);
  contentDiv.className = 'cart__item__content';

  let descDiv = document.createElement('div');
  contentDiv.appendChild(descDiv);
  descDiv.className = 'cart__item__content__description';

  let title = document.createElement('h2');
  descDiv.appendChild(title);
  title.textContent = product.name;

  let color = document.createElement('p');
  descDiv.appendChild(color);
  color.textContent = item.color;

  let price = document.createElement('p');
  descDiv.appendChild(price);
  price.textContent = product.price + ' €';

  let settingsDiv = document.createElement('div');
  contentDiv.appendChild(settingsDiv);
  settingsDiv.className = 'cart__item__content__settings';

  let quantityDiv = document.createElement('div');
  settingsDiv.appendChild(quantityDiv);
  quantityDiv.className = 'cart__item__content__settings__quantity';

  let quantityTag = document.createElement('p');
  quantityDiv.appendChild(quantityTag);
  quantityTag.textContent = 'Qté : ';

  let quantity = document.createElement('input');
  quantityDiv.appendChild(quantity);
  quantity.value = item.quantity;
  quantity.className = 'itemQuantity';
  quantity.setAttribute('type', 'number');
  quantity.setAttribute('min', '1');
  quantity.setAttribute('max', '100');
  quantity.setAttribute('name', 'itemQuantity');

  let deleteDiv = document.createElement('div');
  settingsDiv.appendChild(deleteDiv);
  deleteDiv.className = 'cart__item__content__settings__delete';

  let deleteBtn = document.createElement('p');
  deleteDiv.appendChild(deleteBtn);
  deleteBtn.className = 'deleteItem';
  deleteBtn.textContent = 'Supprimer';
}

/*
 * Displays all  cart items in the DOM.
 * @params {Object[]} cart - The list of items you want to display
 */
async function displayCart(cart) {
  for (let i = 0; i < cart.length; i++) {
    displayItem(cart[i]);
  }
}

/*
 * Calculates the quantity of items in the cart.
 * @params {Object[]} cart - The list of items in the cart
 */
async function getTotalQuantity(cart) {
  let totalQuantity = 0;
  for (let i = 0; i < cart.length; i++) {
    const product = await getProduct(cart[i].id);
    totalQuantity += cart[i].quantity;
  }
  document.getElementById('totalQuantity').textContent = totalQuantity;
}

/*
 * Calculates the total price of the cart.
 * @params {Object[]} item - The list of items in the cart
 */
async function getTotalPrice(cart) {
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    const product = await getProduct(cart[i].id);
    totalPrice += cart[i].quantity * product.price;
  }
  document.getElementById('totalPrice').textContent = totalPrice;
}

/*
 * Change the quantity of an item in the cart
 * @params {Object[]} cart - The list of items in the cart
 */
function changeQuantity(cart) {
  let inputs = document.querySelectorAll('.itemQuantity');
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('change', (e) => {
      let newQuantity = inputs[i].valueAsNumber;

      let itemId = e.target.closest('.cart__item').dataset.id;
      let itemColor = e.target.closest('.cart__item').dataset.color;

      let prevItem = cart.find((p) => p.id == itemId && p.color == itemColor);
      console.log(prevItem);
      prevItem.quantity = newQuantity;
      localStorage.setItem('cart', JSON.stringify(cart));
      location.reload();
    });
  }
}

/*
 * Remove an item in the cart
 * @params {Object[]} cart - The list of items in the cart
 */
function deleteItem(cart) {
  let deleteBtn = document.querySelectorAll('.deleteItem');
  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener('click', (e) => {
      let itemId = e.target.closest('.cart__item').dataset.id;
      let itemColor = e.target.closest('.cart__item').dataset.color;

      cart = cart.filter((p) => p.id !== itemId || p.color !== itemColor);
      localStorage.setItem('cart', JSON.stringify(cart));
      location.reload();
    });
  }
}

/*
 * Sends a POST request to the API containing the ordered product IDs and customer form data
 * @params {Object[]} cart - The list of items in the cart
 */
function order(cart) {
  const orderButton = document.getElementById('order');
  orderButton.addEventListener('click', (e) => {
    e.preventDefault();

    const contact = getValidForm();

    if (contact != undefined) {
      let products = [];
      products = cart.map((p) => p.id);

      const order = { contact, products };

      fetch('http://localhost:3000/api/products/order', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      })
        .then((res) => res.json())
        .then((data) => {
          window.location.href = `/front/html/confirmation.html?commande=${data.orderId}`;
        })
        .catch(function (err) {
          console.log(err);
        });

      localStorage.clear();
    }
  });
}

async function main() {
  const cart = getCart();

  displayCart(cart);

  await getTotalQuantity(cart);
  await getTotalPrice(cart);

  changeQuantity(cart);
  deleteItem(cart);

  order(cart);
}

main();
