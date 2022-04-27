/*
 * This file manages the display of the order ID on the Confirmation page.
 */

/*
 * Get order id from url.
 * @returns {str} Id of the order to display
 */
function getOrderId() {
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);
  if (searchParams.has('commande')) {
    const id = searchParams.get('commande');
    return id;
  } else {
    window.location.href = './index.html';
  }
}

/*
 * Display order id in the confirmation message.
 */
function displayOrderId() {
  const orderId = document.getElementById('orderId');
  orderId.textContent = getOrderId();
}

displayOrderId();
