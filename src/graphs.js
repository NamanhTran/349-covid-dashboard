import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { covidCountryStats, usAllStateStats, stateVaccinations } from './covid_api';
import './Map.css';

const SecondPage = () => {  
  const [worldData, setWorldData] = useState('Waiting for async api call to finish');
  //const [countryData, setCountryData] = useState('Waiting for async api call to finish');
  //const [stateData, setUsStateData] = useState('Waiting for async api call to finish');
  const [usAllStatesData, setUsAllStateData] = useState('Waiting for async api call to finish');
  //const [stateTimeSeriesData, setStateTimeSeries] = useState('Waiting for async api call to finish');
  const [stateVaccinationsData, setStateVaccinations] = useState('Waiting for async api call to finish');
  const [formatState, formatStateData] = useState('Waiting for async api call to finish');
  const [formatCountry, formatCountryData] = useState('Waiting for async api call to finish');
  const [formatStateVaccinations, formatStateVaccinationsData] = useState('Waiting for async api call to finish');


  useEffect(() => {
    function graphStateData () {
      const data = [];
      for(let i = 0; i < usAllStatesData.length; i++) {
        let state = {};
        state['state'] = usAllStatesData[i]['state'];
        state['cases'] = usAllStatesData[i]['cases'];
        state['deaths'] = usAllStatesData[i]['deaths'];
        state['recovered'] = usAllStatesData[i]['recovered'];
        data.push(state);
      }
      return data;
    }

    function graphWorldData () {
      const data = [];
      for(let i = 0; i < worldData.length; i++) {
        let country = {};
        country['date'] = worldData[i]['updated'];
        country['country'] = worldData[i]['country'];
        country['cases'] = worldData[i]['cases'];
        country['deaths'] = worldData[i]['deaths'];
        country['recovered'] = worldData[i]['recovered'];
        data.push(country);
      }
      return data;
    }

    function graphStateVaccinations () {
      const data = [];
      for(let i = 0; i < stateVaccinationsData.length; i++) {
        let state = {};
        let totalDoses = 0;
        for(let day in stateVaccinationsData[i]['timeline']){
          let vaccination = stateVaccinationsData[i]['timeline'][day];
          totalDoses = totalDoses + vaccination;
        }
        state['state'] = stateVaccinationsData[i]['state'];
        state['totalDoses'] = totalDoses;
        data.push(state);
      }
      return data;
    }

    formatCountryData(graphWorldData());
    formatStateData(graphStateData());
    formatStateVaccinationsData(graphStateVaccinations());
  }, [usAllStatesData, worldData, stateVaccinationsData])

  useEffect(() => {
    const getWorldData = async() => {
      const covidWorldData = await covidCountryStats();
      setWorldData(covidWorldData);
    }
    // const getCountryData = async() => {
    //   const covidCountryData = await covidCountryStats();
    //   setCountryData(covidCountryData);
    // }
    // const getStateData = async(state) => {
    //   const covidUsStateData = await usStateStats(state);
    //   setUsStateData(covidUsStateData);
    // }
    const getUsAllStatesData = async() => {
      const covidUsAllStatesData = await usAllStateStats();
      setUsAllStateData(covidUsAllStatesData);
    }
    // const getStateTimeSeries = async(state) => {
    //   const stateTimeSeriesData = await stateTimeSeries(state);
    //   setStateTimeSeries(stateTimeSeriesData);
    // }
    const getStateVaccinations = async() => {
      const stateVaccinationsData = await stateVaccinations();
      setStateVaccinations(stateVaccinationsData);
    }
   
    var now = new Date();
    var delay = 60 * 60 * 1000; // 1 hour in msec
    var start = delay - (now.getMinutes() * 60 + now.getSeconds()) * 1000 + now.getMilliseconds();
    setTimeout(function getDataEveryHour() {
      getWorldData();
      getUsAllStatesData();
      getStateVaccinations();
      setTimeout(getDataEveryHour, delay);
   }, start);
    getWorldData();
    getUsAllStatesData();
    getStateVaccinations();
  }, [])

  //console.log('debug:', stateVaccinationsData);
  //console.log('format:', formatState, formatCountry, formatStateVaccinations);

  return (
    <div className="graphContainer">
      <ResponsiveContainer width="100%" height={330}>
        <BarChart
          width={500}
          height={300}
          data={formatState}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="state" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="cases" fill="#0000FF" />
          <Bar dataKey="deaths" fill="#FF0000" />
          <Bar dataKey="recovered" fill="#006400" />
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={330}>
        <BarChart
          width={500}
          height={300}
          data={formatCountry}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="country" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="cases" fill="#0000FF" />
          <Bar dataKey="deaths" fill="#FF0000" />
          <Bar dataKey="recovered" fill="#006400" />
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={330}>
        <BarChart
          width={500}
          height={300}
          data={formatStateVaccinations}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="state" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalDoses" fill="#006400" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SecondPage;
