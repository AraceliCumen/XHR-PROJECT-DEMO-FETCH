window.onload = function() {
  const form = document.getElementById('search-form');
  const searchField = document.getElementById('search-keyword');
  const responseContainer = document.getElementById('response-container');
  let searchedForText;
  let cl = console.log;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    responseContainer.innerHTML = '';
    searchedForText = searchField.value;
    getNews();
  });

  function getNews() {
    const articleRequest = new XMLHttpRequest();
    articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=65082f4668484e9484931f976feb3d4c`);
    articleRequest.onload = addNews;
    articleRequest.onerror = handleError;
    articleRequest.send();
  }

  function handleError() {
    cl('se ha presentado un error');
  }

  function addNews() {
    const data = JSON.parse(this.responseText);
    const response = data.response.docs;
    response.forEach(function(element) {
      cl(element);
      const snippet = element.snippet;
      let li = document.createElement('li');
      li.className = 'article';
      li.innerText = snippet;
      responseContainer.appendChild(li);
    });
  }
};