import React, { useState } from "react";
import CountryDetail from "./CountryDetails";

const Country = ({ name, capital, population, languages, flag }) => {
  const [showCountry, setShowCountry] = useState(true);

  return (
    <div>
      <p>
        {name}
        <button onClick={() => setShowCountry(!showCountry)}>
          {showCountry ? "show" : "hide"}
        </button>
      </p>
      {showCountry === false ? (
        <div>
          <CountryDetail
            name={name}
            capital={capital}
            population={population}
            languages={languages}
            flag={flag}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Country;
