# raithrovers-api
Simple API project which gets news articles from various Scottish news/publications about Raith Rovers


- https://raithroversapi.herokuapp.com/
- https://rapidapi.com/alanhood77/api/raith-rovers-news/

## Install

npm install

npm run start

# REST API

The REST API is described below.

## Get all news articles about Raith Rovers

### Request

`GET /news`

    curl http://localhost:8000/news/ | json_pp

### Response

```json
    [
      {
        "source" : "TheDailyRecord",
        "url" : "https://www.dailyrecord.co.uk/sport/football/ethan-ross-ends-post-aberdeen-25215748",
        "title" : "Ethan Ross ends post Aberdeen speculation as Raith Rovers admit 'no brainer' to sign in demand star"
      },
      {
        "source" : "FifeFreePress",
        "title" : " Raith Rovers hit early and late in the first half to secure points and go second ",
        "url" : "https://www.fifetoday.co.uk/sport/football/raith-rovers-hit-early-and-late-in-the-first-half-to-secure-points-and-go-second-3422120"
      },
    ]
```

## Get all news articles about Raith Rovers from a specific source

### Request Example

`GET /news/BBC`

    curl http://localhost:8000/news/BBC | json_pp

### Response

```json
    [
      {
        "url" : "https://www.bbc.co.uk/sport/football/58851568",
        "title" : "Morton, Raith & Inverness into quarters",
        "source" : "BBC"
      },
      {
        "url" : "https://www.bbc.co.uk/sport/football/58688209",
        "title" : "Poplatnik scores late double for Raith",
        "source" : "BBC"
      },
    ]
```
