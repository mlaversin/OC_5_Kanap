/*
 * This file manages :
 *    - displaying products added to the cart
 *    - modifying and deleting products
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
 * Displays a single item in the DOM.
 * @params {Object[]} item - The item you want to display
 */
async function displayItem(item) {
  const product = await getProduct(item.id);

  let article = document.createElement('article');
  document.querySelector('#cart__items').appendChild(article);
  article.className = 'cart__item';
  article.setAttribute('data-id', item.id);

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
 * Displays all items in the DOM.
 * @params {Object[]} items - The list of items you want to display
 */
async function displayCart(items) {
  for (let i = 0; i < items.length; i++) {
    displayItem(items[i]);
  }
}

/*
 * Calculates the total price of the cart.
 * @params {Object[]} item - The list of items in the cart
 */
async function getTotalPrice(items) {
  let totalPrice = 0;
  for (let i = 0; i < items.length; i++) {
    const product = await getProduct(items[i].id);
    totalPrice += items[i].quantity * product.price;
  }
  return totalPrice;
}

async function main() {
  const cartItems = getCart();
  const totalQuantity = cartItems.length;
  const totalPrice = await getTotalPrice(cartItems);

  document.getElementById('totalQuantity').innerText = totalQuantity;
  document.getElementById('totalPrice').innerText = totalPrice;

  displayCart(cartItems);
}

main();
