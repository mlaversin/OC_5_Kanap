displayProduct();

/*
 * Displays product details.
 */
async function displayProduct() {
  const productId = getProductId();
  const product = await getProduct(productId);

  console.log(product);

  document.title = `${product.name} | Kanap`;
  document.getElementById('item__img').innerHTML = `
    <img src="${product.imageUrl}" alt="${product.altTxt}">`;
  document.getElementById('title').innerText = product.name;
  document.getElementById('price').innerText = product.price;
  document.getElementById('description').innerText = product.description;
  
  for(color in product.colors) {
      document.getElementById(
        'colors'
      ).innerHTML += `<option value="${product.colors[color]}">${product.colors[color]}</option>`;
  }
  
}

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
