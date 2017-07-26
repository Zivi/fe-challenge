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
      var resultLi = document.createElement('li');
      var newDiv = document.createElement('div');
      var webUrl = document.createElement('a');
      var imgDiv = document.createElement('div');
      var infoDiv = document.createElement('div');
      var avatarImg = document.createElement('img');
      var telLink = document.createElement('a');
      var laborUl = document.createElement('ul');

      resultLi.className = 'search-result';
      resultLi.innerText = company.name;

      newDiv.className = 'company-info hide';

      webUrl.href = company.website;
      webUrl.innerText = company.website;

      imgDiv.className = 'image-container';
      infoDiv.className = 'info-container';

      avatarImg.src = company.avatarUrl;
      avatarImg.className = 'company-image';

      // Remove (, ), - and space from telephone number so number can be called on link tap
      telLink.href = `tel:+1${company.phone.replace(/[()\s-]/g, '')}`;
      telLink.innerText = company.phone;
      telLink.className = 'company-tel';

      laborUl.className = 'labor-types';
      laborUl.innerText = 'Labor Type(s):';

      for (let j = 0; j < company.laborType.length; j += 1) {
        var newLaborLi = document.createElement('li');
        newLaborLi.className = 'labor-type';
        newLaborLi.innerText = (company.laborType[j]);
        laborUl.appendChild(newLaborLi);
      }

      imgDiv.appendChild(avatarImg);
      imgDiv.appendChild(webUrl);
      infoDiv.appendChild(telLink);
      infoDiv.appendChild(laborUl);
      newDiv.appendChild(imgDiv);
      newDiv.appendChild(infoDiv);
      resultLi.appendChild(newDiv);

      searchResults.appendChild(resultLi);
    }
  })
}

// Events on select of search result list item
document.querySelector('.search-results').addEventListener('click', function(event) {
  event.target.childNodes[1].classList.remove('hide');
})


// todos: view more results button
// labor type filters
// responsive view

// zero search results
// collapse listing on click close
