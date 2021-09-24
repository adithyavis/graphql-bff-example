# graphql-bff-example

An example of how to use graphql as a bff

![Demo GIF](https://media.giphy.com/media/dWNkrdJ9TITjnQfQsA/source.gif?cid=790b7611217a857d8320a2983c51c4e63676a2e9a6bddb61&rid=source.gif&ct=g)

## Motivation

I wanted to build a sample graphql application to demonstrate the usage of the graphql technology as a backend-for-frontend(bff). BFF help in reducing overfetching at the client layer.

BFFs are built separately for different client device types. There can be different BFFs for desktop devices, mobile devices etc. This way, different clients can query for data specifically optimized to their device type.

I have built a generic BFF that can be dynamically queried. I have used the @skip directive to generate dynamic graphql queries on the frontend. I have also optimized the graphql resolvers to not wastefully call any external API endpoint, if the client query doesn't need any data from them. This way, I have reduced overfetching at the BFF layer too.

![Architecture](https://raw.githubusercontent.com/adithyavis/graphql-bff-example/main/architecture.png)

## Project setup

#### Client setup

- Install the necessary dependencies for the client

```bash
#  cd path/to/graphql-bff-example/client
$ yarn install
```

- Create the .env file and fill in the required values

```bash
$ cp -i ..sample_env .env
```

- Start the local server

```bash
$ yarn start
```

#### Server setup

- Install the necessary dependencies for the server

```bash
#  cd path/to/graphql-bff-example/server
$ yarn install
```

- Register with https://newsapi.org/ and https://rapidapi.com/. Generate API keys to access the API endpoints hosted by these services.

- Create the .env file and fill in the required values

```bash
$ cp -i ..sample_env .env
```

- Start the local server

```bash
$ yarn start
```
