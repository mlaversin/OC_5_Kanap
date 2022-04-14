/*
 * This file handles two things in the Shopping Cart page :
 *    - displaying products added to the cart
 *    - modifying and deleting products
 */

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

  document.getElementById('cart__items').innerHTML += `
    <article class="cart__item" data-id="${item.id}" data-color="${item.id}">
    <div class="cart__item__img">
      <img src="${product.imageUrl}" alt="${product.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${product.name}</h2>
        <p>${item.color}</p>
        <p>${product.price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;
}

/*
 * Displays the products in the cart.
 */
async function displayCart() {
  const cartItems = await getCart();
  for (let i = 0; i < cartItems.length; i++) {
    displayItem(cartItems[i]);
  }
}

displayCart();
