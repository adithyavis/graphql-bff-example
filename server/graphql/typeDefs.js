const { gql } = require("apollo-server");

module.exports = gql`
  type Country {
    name: String!
    cities: [String]
    capital: String
    news: [News]
    covid: Covid
    movies: [Movie]
  }
  type News {
    title: String!
    url: String!
    content: String!
    author: String
    description: String
    publishedAt: String
  }
  type Covid {
    provinces: [CovidByProvince]!
    country: String!
    date: String!
  }
  type CovidByProvince {
    province: String!
    confirmed: Int
    recovered: Int
    deaths: Int
    active: Int
  }
  type Movie {
    age: Int
    backdropPath: String
    cast: [String]
    genres: [Int]
    imdbID: String!
    imdbRating: Int
    imdbVoteCount: Int
    originalTitle: String
    overview: String
    posterPath: String
    runtime: Int
    tagline: String
    title: String!
    tmdbID: String
    video: String
    year: Int
  }
  type Query {
    getCountriesList: [Country]
    getCountry(iso2Code: String!): Country
  }
`;
