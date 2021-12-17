import React from 'react';

const Sources = () => {
    return (
    <div style={{marginLeft: '5%'}}>
        <h1>Sources:</h1>
        <br />
        <h2><a href="https://disease.sh/v3/">All APIs calls are from disease.sh</a></h2>
        <br />
        <h2>United States COVID Data:</h2>
        <h3>
            <a href="https://www.worldometers.info/coronavirus/?utm_campaign=homeAdvegas1?">COVID-19 data sourced from Worldometers, updated every 10 minutes</a>
        </h3>
        <h3><a href="https://github.com/nytimes/covid-19-data">COVID-19 data sourced from the New York Times, updated every 24 hours</a></h3>
        <br />
        <h2>COVID-19 Vaccine Data:</h2>
        <h3><a href="https://www.raps.org/news-and-articles/news-articles/2020/3/covid-19-vaccine-tracker">COVID-19 vaccine trial data from raps.org, updated every 24 hours</a></h3>
    </div>);
};

export default Sources;