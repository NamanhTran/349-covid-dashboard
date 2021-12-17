import React, { useEffect, useState } from 'react';
import {usStateStats} from './covid_api';

const InfoPanel = ({usState, isPerPop}) => {
    const [stateData, setStateData] = useState(null);

    useEffect(() => {
        if (usState == null) {
            setStateData(null);
            return;
        }

        const getStateInfo = async (usState) => { 
            const info = await usStateStats(usState);
            
            setStateData(info);
        }

        getStateInfo(usState);
        return;

    }, [usState]);

    return (
        <div className='state-info'>
            <div><strong>State: {stateData != null ? stateData.state : ''} </strong> <span id='state'></span></div>
            <div><strong>Cases: {stateData != null ? (isPerPop === false ? stateData.cases + " total" : stateData.casesPerOneMillion + " per one million"): ''}</strong> <span id='cases'></span></div>
            <div><strong>Deaths: {stateData != null ? (isPerPop === false ? stateData.deaths + " total" : stateData.deathsPerOneMillion + " per one million"): ''}</strong> <span id='deaths'></span></div>
        </div>
    );
}

export default InfoPanel;