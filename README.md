# Frontend Challenge

## Your Task

We've provided you with a simple Express server that provides an API for querying company data and serves up static content from the `public` directory.

We would like you to build a simple UI for searching these companies by name and selecting a company to show more details. The search results must show at least the company name, and the more detailed view should display all of the data you get back from the server for the selected company.

We expect candidates to spend about 2 hours on this.

A few specific requirements:

* While the user is typing in their search string don't actually send the query to the API until it's been 1 second since their last keystroke, so as to avoid sending a bajillion requests. 
* Don't use any basic utility libraries (e.g. jQuery, Lodash, Underscore, Ramda).
* Don't use any front-end frameworks (e.g. React, Angular, Ember).
* Search results should be pageable (or infinite scroll-able)

If you have some spare time at the end here are a few stretch goals:

* Make your design responsive, so it works well across various device sizes
* Focus on polishing the UI to look slick
* Allow filtering results by labor type

## Our Goal

We want to get a feel for how you approach the basic problems of front-end applications and what your UX instincts are like. Some bonus points if it is pretty, but don't worry, we're not hiring you to be a full-time designer.

Things we're looking for:

* Clear, readable code
* A UI that is easy to use and doesn't look terrible
* A solid understanding of front-end JS fundamentals

Things we're not looking for:

* Blazing fast performance
* Total cross-browser functionality (i.e. it is okay if it only works in modern browsers)

## Getting started

You can install dependencies and start up the server with a quick `npm install && npm start`. Once it is running you can hit the `public/index.html` page at [http://localhost:3000](http://localhost:3000), which should show a "Hello, world" message.

The companies API lives at [http://localhost:3000/api/companies](http://localhost:3000/api/companies). It takes in the following parameters:

| Query param | Effect |
| ----------- | ------ |
| q           | Limits the results to companies with names that match `q` |
| start       | Returns result starting at the `start`th result |
| limit       | Restricts the result set to include no more than `limit` results |
| laborTypes  | A comma delimited list of labor types to filter by (all must match) |

And returns results similar to this:

```js
{
  "total": 500,
  "results": [
    {
      "avatarUrl": "https:\/\/bc-prod.imgix.net\/avatars\/5430e7a55cdc2e0300dd72ef.png?auto=format&fit=fill&bg=fff",
      "laborType": [
        "Union"
      ],
      "name": "BASS Electric",
      "phone": "(261) 917-1637",
      "website": "http:\/\/bufodu.ps\/pakzer"
    },
    {
      "avatarUrl": "https:\/\/bc-prod.imgix.net\/avatars\/5430e7a55cdc2e0300dd7310.jpeg?auto=format&fit=fill&bg=fff",
      "laborType": [
        "Non-Union",
        "Union"
      ],
      "name": "Rex Moore Group, Inc.",
      "phone": "(949) 700-2752",
      "website": "http:\/\/wa.ch\/wisli"
    }
  ]
}
```

## Submission

Simply create a GitHub repo and email us the link!

### Zip folder

Just zip up your solution (minus the node_modules directory) and email it to whoever you were in contact with for your initial interview with the subject line "Frontend Coding Challenge".

### GitHub Repo

1. Clone this repo locally, e.g. `git clone git@github.com:buildingconnected/fe-challenge.git`
1. Do awesome programming work, committing your changes as you go
1. Whenever you're ready to submit, go create a [new GitHub repo](https://help.github.com/articles/create-a-repo/#create-a-new-repository-on-github) named whatever you like
1. Inside your local clone of this `fe-challenge` repo run `git remote add submission git@github.com:<your_account>/<whatever_you_named_your_repo>`
1. Push your changes to your new GH repo, e.g. `git push submission master`
1. Send us a link to your GH repo
