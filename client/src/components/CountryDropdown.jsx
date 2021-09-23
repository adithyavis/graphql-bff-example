import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Dropdown from "react-bootstrap/Dropdown";

export default function CountryDropdown({ country, setCountry }) {
  const [countriesList, setCountriesList] = useState([]);
  const { loading, data } = useQuery(GET_COUNTRIES_LIST_QUERY);

  useEffect(() => {
    if (!loading) {
      setCountry(data.getCountriesList[0]);
      setCountriesList(data.getCountriesList);
    }
  }, [loading]);

  return (
    <div className="d-flex justify-content-center align-items-center p-2 w-100">
      <div className="px-2">Country: </div>
      <Dropdown className="w-100">
        <Dropdown.Toggle className="w-100">
          {loading ? (
            <div className="spinner-border text-white" role="status"></div>
          ) : (
            <>{country && country.name}</>
          )}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {countriesList &&
            countriesList.map(country => (
              <Dropdown.Item
                key={country.id}
                onClick={() => setCountry(country)}
              >
                {country.name}
              </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

const GET_COUNTRIES_LIST_QUERY = gql`
  {
    getCountriesList {
      name
      id
      iso2Code
    }
  }
`;
