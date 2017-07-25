var timerStarted = false;

// Events for the search box
document.querySelector('.search-box').addEventListener('keypress', function(event) {
    if (!timerStarted) {
      timerStarted = true;
      window.setTimeout(timerEnd, 1000);
    }
})

function timerEnd() {
  timerStarted = false;
  callApi(document.querySelector('.search-box').value);
}

function callApi(searchTerm) {
  fetch(`/api/companies/?q=${searchTerm}`).then(function(result) {
    return result.json();
  }).then(function(response) {
    let markup = '';
    var searchResults = document.querySelector('.search-results');
    searchResults.innerHTML = '';
    for (let i = 0; i < response.results.length; i += 1) {
      var company = response.results[i];
      var newLi = document.createElement('li');
      newLi.className = 'search-result';
      newLi.dataset.website = company.website;
      newLi.dataset.avatar = company.avatarUrl;
      newLi.dataset.tel = company.phone;
      newLi.dataset.labortype = company.laborType;
      newLi.innerText = company.name;
      searchResults.appendChild(newLi);
    }
  })
}

// Events on select of search result list item
document.querySelector('.search-results').addEventListener('click', function(event) {


})



// on click of company, show more info as a modal
// logo should be in image tag
// li for laborTypes
// company name
// <a> link for company website
// <a> link for phone: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Creating_a_phone_link

// todos: view more results button
// labor type filters
// responsive view

// zero search results
