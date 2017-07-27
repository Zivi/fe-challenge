var timerStarted = false;
var searchResults = document.querySelector('.search-results');
var laborFilter = document.querySelector('.labor-filter');
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
  var laborTypes = findCheckedLaborTypes();
  callApi(document.querySelector('.search-box').value, 0, laborTypes);
}

function callApi(searchTerm, startPosition, laborTypes) {
  var request = `/api/companies/?q=${searchTerm}&start=${startPosition}`;
  if (laborTypes) {
    request = `/api/companies/?q=${searchTerm}&start=${startPosition}&laborTypes=${laborTypes}`;
  }
  fetch(request).then(function(result) {
    return result.json();
  }).then(function(response) {
    searchResults.innerHTML = '';
    pageableEl.innerHTML = '';
    if (response.results.length === 0) {
      createZeroResultsView(searchTerm);
    } else {
      createResultsListView(response);
      laborFilter.classList.remove('hide');
      laborFilter.dataset.searchTerm = searchTerm;
      laborFilter.dataset.startPosition = startPosition;
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
    var resultLi = createEl('li');
    var newDiv = createEl('div');
    var webUrl = createEl('a');
    var imgDiv = createEl('div');
    var infoDiv = createEl('div');
    var avatarImg = createEl('img');
    var telLink = createEl('a');
    var laborUl = createEl('ul');

    // Create the companies name list
    resultLi.className = 'search-result';
    resultLi.innerText = company.name;
    searchResults.appendChild(resultLi);

    // Create container with the company information that's shown on company name list click
    newDiv.className = 'company-info hide';
    resultLi.appendChild(newDiv);

    // Split the company info section into two side by side sections
    imgDiv.className = 'image-container';
    infoDiv.className = 'info-container';

    avatarImg.src = company.avatarUrl;
    avatarImg.className = 'company-image';
    imgDiv.appendChild(avatarImg);

    laborUl.className = 'labor-types';
    infoDiv.innerText = 'Labor Type(s):';
    for (let j = 0; j < company.laborType.length; j += 1) {
      var newLaborLi = document.createElement('li');
      newLaborLi.className = 'labor-type';
      newLaborLi.innerText = (company.laborType[j]);
      laborUl.appendChild(newLaborLi);
    }
    infoDiv.appendChild(laborUl);

    webUrl.href = company.website;
    webUrl.innerText = company.website;
    infoDiv.appendChild(webUrl);

    // Remove (, ), - and space from telephone number so number can be called on link tap
    telLink.href = `tel:+1${company.phone.replace(/[()\s-]/g, '')}`;
    telLink.innerText = company.phone;
    telLink.className = 'company-tel';
    infoDiv.appendChild(telLink);

    newDiv.appendChild(imgDiv);
    newDiv.appendChild(infoDiv);
  }
}

function createEl(type) {
  return document.createElement(type);
}

// Labor filter click event handler
laborFilter.addEventListener('click', function(event) {
  var dataAttr = event.currentTarget.dataset;
  var laborTypes = findCheckedLaborTypes();
  callApi(dataAttr.searchTerm, dataAttr.startPosition, laborTypes);
})

// Events on select of search result list item
searchResults.addEventListener('click', function(event) {
  event.target.childNodes[1].classList.remove('hide');
})

function findCheckedLaborTypes() {
  return Array.from(document.querySelectorAll('[name=labor-type]'))
    .filter(function(el){return el.checked})
    .map(function(el){return el.value}).join(',');
}

function createPageableView(response, startPosition, searchTerm) {
  startPosition = +startPosition;
  var numPages = Math.ceil(response.total / 10);
  var pageNumber = Math.floor(startPosition / 10) + 1;

  var previousButton = document.createElement('button');
  previousButton.innerText = 'Previous';
  if (startPosition > 0) {
    previousButton.className = 'results-nav results-previous';
    previousButton.dataset.start = startPosition - 10;
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
    nextButton.dataset.start = startPosition + 10;
    nextButton.dataset.searchTerm = searchTerm;
  } else {
    // Show disabled nextButton when on the last page
    nextButton.className = 'results-nav results-nav-disabled';
  }
  pageableEl.appendChild(nextButton);
}

document.querySelector('.results-pageable').addEventListener('click', function(event) {
  var laborTypes = findCheckedLaborTypes();
  var eventData = event.target.dataset;
  if (eventData.start) {
    callApi(eventData.searchTerm, eventData.start, laborTypes);
  }
});
