import React, { useEffect, useState } from 'react';
import {countryStats} from './covid_api';

const WorldInfoPanel = ({country, isPerPop}) => {
    const [countryData, setCountryData] = useState(null);

    useEffect(() => {
        if (country == null) {
            setCountryData(null);
            return;
        }

        const getCountryInfo = async (country) => {
            const info = await countryStats(country);
            
            setCountryData(info);
        }

        getCountryInfo(country);
        return;

    }, [country]);

    return (
        <div className='state-info'>
            <div><strong>Country: {countryData != null ? countryData.country : ''} </strong> <span id='state'></span></div>
            <div><strong>Cases: {countryData != null ? (isPerPop === false ? countryData.cases + " total" : countryData.casesPerOneMillion + " per one million"): ''}</strong> <span id='cases'></span></div>
            <div><strong>Deaths: {countryData != null ? (isPerPop === false ? countryData.deaths + " total" : countryData.deathsPerOneMillion + " per one million"): ''}</strong> <span id='deaths'></span></div>
        </div>
    );
}

export default WorldInfoPanel;