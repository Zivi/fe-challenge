var timerStarted = false;
var searchResults = document.querySelector('.search-results');
var pageableEl = document.querySelector('.results-pageable');

// Events for the search box
document.querySelector('.search-box').addEventListener('keyup', function(event) {
  if (!timerStarted) {
    timerStarted = true;
    window.setTimeout(timerEnd, 1000);
  }
})

function timerEnd() {
  timerStarted = false;
  callApi(document.querySelector('.search-box').value, 0);
}

function callApi(searchTerm, startPosition) {
  fetch(`/api/companies/?q=${searchTerm}&start=${startPosition}`).then(function(result) {
    return result.json();
  }).then(function(response) {
    searchResults.innerHTML = '';
    pageableEl.innerHTML = '';
    if (response.results.length === 0) {
      createZeroResultsView(searchTerm);
    } else {
      createResultsListView(response);
      if (response.total > response.results.length) {
          createPageableView(response, startPosition, searchTerm);
      }
    }
  })
}

function createZeroResultsView(searchTerm) {
  var zeroResults = document.createElement('div');
  zeroResults.className = 'zero-results';
  zeroResults.innerText = `No results were found for ${searchTerm}`
  searchResults.appendChild(zeroResults)
}

function createResultsListView(response) {
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
}

// Events on select of search result list item
document.querySelector('.search-results').addEventListener('click', function(event) {
  event.target.childNodes[1].classList.remove('hide');
})

function createPageableView(response, startPosition, searchTerm) {
  var numPages = Math.ceil(response.total / 10);
  var pageNumber = Math.floor(startPosition / 10) + 1;


  var previousButton = document.createElement('button');
  previousButton.innerText = 'Previous';
  if (startPosition > 0) {
    previousButton.className = 'results-nav results-previous';
    previousButton.dataset.start = +startPosition - 10;
    previousButton.dataset.searchTerm = searchTerm;
  } else {
    // Show disabled previousButton when on the first page
    previousButton.className = 'results-nav results-nav-disabled';
  }
  pageableEl.appendChild(previousButton);

  var positionInfo = document.createElement('span');
  positionInfo.className = 'results-position';
  positionInfo.innerText = `Page ${pageNumber} of ${numPages}`;
  pageableEl.appendChild(positionInfo);

  var nextButton = document.createElement('button');
  nextButton.innerText = 'Next';
  if (response.total - startPosition > 10) {
    nextButton.className = 'results-nav results-next';
    nextButton.dataset.start = +startPosition + 10;
    nextButton.dataset.searchTerm = searchTerm;
  } else {
    // Show disabled nextButton when on the last page
    nextButton.className = 'results-nav results-nav-disabled';
  }
  pageableEl.appendChild(nextButton);
}

document.querySelector('.results-pageable').addEventListener('click', function(event) {
  if (event.target.dataset.start) {
    callApi(event.target.dataset.searchTerm, event.target.dataset.start);
  }
})


// todos: view more results button
// labor type filters
// responsive view


// collapse listing on click close
