const axios = require("axios");
const graphqlFields = require("graphql-fields");

const getCountry = async ({ iso2Code }) => {
  const response = await axios.get(
    `https://api.worldbank.org/v2/country/${iso2Code}?format=json&per_page=300`
  );
  const country = response.data[1][0];
  return country;
};

const getCities = async ({ name }) => {
  const response = await axios
    .post("https://countriesnow.space/api/v0.1/countries/cities", {
      country: name
    })
    .then(response => response.data);
  return response.data;
};

const getCapital = async ({ name }) => {
  const response = await axios
    .post("https://countriesnow.space/api/v0.1/countries/capital", {
      country: name
    })
    .then(response => response.data);
  return response.data.capital;
};

const getNews = async ({ name }) => {
  const response = await axios
    .get(
      `https://newsapi.org/v2/everything?q=${name}&apiKey=${process.env.NEWS_API_KEY}`
    )
    .then(response => response.data);
  return response.articles;
};

const getCovid = async ({ iso2Code }) => {
  const response = await axios
    .get(
      `https://covid-19-data.p.rapidapi.com/report/country/code?code=${iso2Code}&date=2020-05-01`,
      {
        headers: {
          "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
          "x-rapidapi-key": process.env.RAPID_API_KEY
        }
      }
    )
    .then(response => response.data);
  return response[0];
};

const getMovies = async ({ iso2Code }) => {
  const response = await axios
    .get(
      `https://streaming-availability.p.rapidapi.com/search/basic?country=${iso2Code}&type=movie&service=netflix`,
      {
        headers: {
          "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
          "x-rapidapi-key": process.env.RAPID_API_KEY
        }
      }
    )
    .then(response => response.data);
  return response.results;
};

module.exports = {
  Query: {
    async getCountriesList() {
      try {
        const response = await axios.get(
          "https://api.worldbank.org/v2/country?format=json&per_page=300"
        );
        const countriesList = response.data[1];
        return countriesList;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getCountry(_, { iso2Code }, __, info) {
      try {
        const topLevelFields = graphqlFields(info);

        // Get country
        const country = await getCountry({ iso2Code });

        if (topLevelFields.cities) {
          const cities = await getCities({ name: country.name });
          country.cities = cities;
        }

        if (topLevelFields.capital) {
          const capital = await getCapital({ name: country.name });
          country.capital = capital;
        }

        if (topLevelFields.news) {
          const news = await getNews({ name: country.name });
          country.news = news;
        }

        if (topLevelFields.covid) {
          const covid = await getCovid({ iso2Code });
          country.covid = covid;
        }

        if (topLevelFields.movies) {
          const movies = await getMovies({ iso2Code });
          country.movies = movies;
        }

        return country;
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};
