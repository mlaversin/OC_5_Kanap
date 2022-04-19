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
  }
}


function displayOrderId() {
    const orderId = document.getElementById('orderId');
    orderId.textContent = getOrderId();
}

displayOrderId();