import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";

import Button from "react-bootstrap/Button";
import CountryDropdown from "./components/CountryDropdown";
import FieldsFilters from "./components/FieldsFilters";

function App() {
  const [country, setCountry] = useState(null);
  const [isCapitalRequired, setIsCapitalRequired] = useState(false);
  const [isCitiesRequired, setIsCitiesRequired] = useState(false);
  const [isNewsRequired, setIsNewsRequired] = useState(false);
  const [isCovidRequired, setIsCovidRequired] = useState(false);

  const [getCountries, { loading, data }] = useLazyQuery(GET_COUNTRY_QUERY);

  const handleClickGetCountry = () => {
    getCountries({
      variables: {
        countryIso2Code: country.iso2Code,
        skipCapital: !isCapitalRequired,
        skipCities: !isCitiesRequired,
        skipNews: !isNewsRequired,
        skipCovid: !isCovidRequired
      }
    });
  };

  return (
    <div className="App">
      <div className="d-flex justify-content-center">
        <div className="d-flex flex-column align-items-center">
          <CountryDropdown country={country} setCountry={setCountry} />
          <FieldsFilters
            isCitiesRequired={isCitiesRequired}
            isNewsRequired={isNewsRequired}
            isCovidRequired={isCovidRequired}
            isCapitalRequired={isCapitalRequired}
            setIsCitiesRequired={setIsCitiesRequired}
            setIsNewsRequired={setIsNewsRequired}
            setIsCovidRequired={setIsCovidRequired}
            setIsCapitalRequired={setIsCapitalRequired}
          />
          <hr className="w-100"></hr>
          <Button
            disabled={loading}
            variant="success"
            className="w-75 m-2"
            onClick={handleClickGetCountry}
          >
            Get country details
          </Button>
        </div>
      </div>
    </div>
  );
}

const GET_COUNTRY_QUERY = gql`
  query GET_COUNTRY_QUERY(
    $countryIso2Code: String!
    $skipCapital: Boolean!
    $skipCities: Boolean!
    $skipNews: Boolean!
    $skipCovid: Boolean!
  ) {
    getCountry(iso2Code: $countryIso2Code) {
      name
      id
      iso2Code
      longitude
      latitude
      capital @skip(if: $skipCapital)
      cities @skip(if: $skipCities)
      news @skip(if: $skipNews) {
        title
        url
        content
        author
      }
      covid @skip(if: $skipCovid) {
        country
        provinces {
          province
          deaths
          active
        }
      }
    }
  }
`;

export default App;
