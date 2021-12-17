import axios from 'axios';

const covid_api = axios.create({
    baseURL: "https://corona.lmao.ninja/v3/",
});

/* Get world-wide's COVID statistics
Returns an object containing these attributes
{
  "updated": 0,
  "cases": 0,
  "todayCases": 0,
  "deaths": 0,
  "recovered": 0,
  "todayRecovered": 0,
  "active": 0,
  "critical": 0,
  "casesPerOneMillion": 0,
  "deathsPerOneMillion": 0,
  "tests": 0,
  "testsPerOneMillion": 0,
  "population": 0,
  "oneCasePerPeople": 0,
  "oneDeathPerPeople": 0,
  "oneTestPerPeople": 0,
  "activePerOneMillion": 0,
  "recoveredPerOneMillion": 0,
  "criticalPerOneMillion": 0,
  "affectedCountries": 0
}
*/
const covidWorldStats = async () => {
    const { data } = await covid_api.get('covid-19/all');
    return data;
}

/* Get all country's COVID statistics
Returns an object containing these attributes
[
  {
    "updated": 0,
    "country": "string",
    "countryInfo": {
      "_id": 0,
      "iso2": "string",
      "iso3": "string",
      "lat": 0,
      "long": 0,
      "flag": "string"
    },
    "cases": 0,
    "todayCases": 0,
    "deaths": 0,
    "todayDeaths": 0,
    "recovered": 0,
    "todayRecovered": 0,
    "active": 0,
    "critical": 0,
    "casesPerOneMillion": 0,
    "deathsPerOneMillion": 0,
    "tests": 0,
    "testsPerOneMillion": 0,
    "population": 0,
    "continent": 0,
    "oneCasePerPeople": 0,
    "oneDeathPerPeople": 0,
    "oneTestPerPeople": 0,
    "activePerOneMillion": 0,
    "recoveredPerOneMillion": 0,
    "criticalPerOneMillion": 0
  }
]
*/
const covidCountryStats = async () => {
    const { data } = await covid_api.get('covid-19/countries');
    return data;
}

/* Get US State's COVID statistics
Returns an object containing these attributes
[
  {
    "state": "string",
    "updated": 0,
    "cases": 0,
    "todayCases": 0,
    "deaths": 0,
    "todayDeaths": 0,
    "active": 0,
    "casesPerOneMillion": 0,
    "deathsPerOneMillion": 0,
    "tests": 0,
    "testsPerOneMillion": 0,
    "population": 0
  }
]
*/
const usAllStateStats = async () => {
    const { data } = await covid_api.get('https://disease.sh/v3/covid-19/states/');

    return data;
};

const usStateStats = async (state) => {
  const { data } = await covid_api.get(`https://disease.sh/v3/covid-19/states/${state}`);

  return data;
};

const countryStats = async (country) => {
  const { data } = await covid_api.get(`https://disease.sh/v3/covid-19/countries/${country}`);

  return data;
};

const stateVaccinations = async () => {
  const { data } = await covid_api.get(`https://disease.sh/v3/covid-19/vaccine/coverage/states`);
  return data;
};

const stateTimeSeries = async (state) => {
  const { data } = await covid_api.get(`https://disease.sh/v3/covid-19/nyt/states/${state}`);
  return data;
};

export {
  covidWorldStats,
  covidCountryStats,
  usAllStateStats,
  usStateStats,
  countryStats,
  stateVaccinations,
  stateTimeSeries
}