main();

async function main() {
  const articles = await getArticles();
  for (article of articles) {
    displayArticle(article);
  }
}

async function getArticles() {
  return fetch('http://localhost:3000/api/products')
    .then((httpBodyResponse) => {
      return httpBodyResponse.json();
    })
    .then((articles) => {
      return articles;
    })
    .catch((e) => {
      console.log(e);
    });
}

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
