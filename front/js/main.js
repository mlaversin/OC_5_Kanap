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
  const url = 'http://localhost:3000/api/products';
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((articles) => {
      return articles;
    })
    .catch((e) => {
      console.log(e);
    });
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
