# The Pub

The Pub is an online platform where people can talk anonymously, uses are metched based on a list of emotions.

# Goal

This project serves as a means for me to practice some specific things, namely:

- containerization (docker)
- monitoring
- logging
- CI/CD
- unit testing
- web sockets
- using NoSQL databases ( MongoDB to be specific)

To go about doing this, I figured building an app with a story would keep things interesting. Also, the name is a reference to popular BBC television series, Peaky Blinders.

# Architecture

## Flow

The web app uses a layered architecture consisting of a front-end that communicates with an API. The API handles authentication using JWTs, data persistence and real-time communication between users using socket IO.

## Front-end

Built in Reactjs. Using:

- tailwind CSS (utility first CSS framework).
- chakra UI (CSS component framework).
- sentry for logging

## Backend

Built with express, consists of:

- a rest API
- a socket IO server to handle real-time connections
- a mongodb database managed with mongoose

### Deployment

Deployed on a digital ocean VPS, using:

- circle CI for CI/CD
