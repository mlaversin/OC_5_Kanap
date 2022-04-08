main();

/*
 * Displays all articles on the homepage.
 */
async function main() {
  const articles = await getArticles();
  for (article of articles) {
    displayArticle(article);
  }
}

/*
 * Retrieves the list of articles from the API.
 */
async function getArticles() {
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
 * Displays an article in the DOM.
 */
function displayArticle() {
  document.getElementById('items').innerHTML += `
    <a href="./product.html?id=${article._id}">
      <article>
        <img src="${article.imageUrl}" alt="${article.altTxt}">
        <h3 class="productName">${article.name}</h3>
        <p class="productDescription">${article.description}</p>
      </article>
    </a>`;
}
