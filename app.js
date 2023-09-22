

// https://newsapi.org/v2/everything?q=tesla&from=2023-08-19&sortBy=publishedAt&apiKey=299ebefe77ec4797a822fe6044bfb642 api url
// 299ebefe77ec4797a822fe6044bfb642 my api key

const API_KEY = "299ebefe77ec4797a822fe6044bfb642";
const url =
  "https://newsapi.org/v2/everything?q=";


//  search using nav links
function searchNews(search) {
  fetchNews(search);
}
//  reload function
function reload() {
  window.location.reload();
}

//  search using input

const searchText = document.getElementById("search-text");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", () => {
  const text = searchText.value;
  fetchNews(text);
});

searchText.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    text = searchText.value;
    fetchNews(text);
  }
});

window.addEventListener("load", () => {
  fetchNews("India");
});

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  console.log(data);
  bindData(data.articles);
}

function bindData(articles) {
  const cardsContainer = document.getElementById("card-container");
  const newsCardTemplate = document.getElementById("template-news-card");

  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  const date = new Date(article.publishedAt).toLocaleString();

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsSource.innerHTML = article.source.name + " " + date;
  newsDesc.innerHTML = article.description;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}
