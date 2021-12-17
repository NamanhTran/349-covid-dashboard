import React, {useRef, useEffect, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import WorldInfoPanel from './WorldInfoPanel';
import Graphs from './graphs';
import { Switch } from '@mui/material/';

mapboxgl.accessToken = 'pk.eyJ1IjoibmFtYW5odHJhbiIsImEiOiJja3dzYTl5djQxNHQ2Mm5zMng5emxwcGxoIn0.gw1FMVhGFZA4FWTcbV8dUQ';

const App = () => {
    const mapContainerRef = useRef(null);
    const [curCountry, setCurCountry] = useState(null);
    const [isPerPop, setIsPerPop] = useState(false);

    const onButtonClick = (e) => {
      console.log('pressed');
      if (isPerPop === false) {
        setIsPerPop(true);
      } else {
        setIsPerPop(false);
      }
    }
  
    useEffect(() => {
      let hoveredCountryId = null;
  
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: `mapbox://styles/namanhtran/ckx5mk5fc78c315umanjw9yh0?${mapboxgl.accessToken}`,
        center: [-97, 45],
        zoom: 3.00,
        minZoom: 1
      });
  
      map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
  
      map.on('load', () => {
        map.addSource('countries', {
          type: 'geojson',
          data: './countries.json'
        });
  
        map.addLayer({
            'id': 'country-border',
            'type': 'line',
            'source': 'countries',
            'layout': {},
            'paint': {
              'line-color': '#627BC1',
              'line-width': 2
          }
        });
  
        map.addLayer({
          id: 'country-fills',
          type: 'fill',
          source: 'countries',
          layout: {},
          paint:  {
            'fill-color': '#627BC1',
            'fill-opacity': [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              .7,
              0.4
            ]
          }
        });
      });
  
      map.on('mousemove', 'country-fills', (e) => {
        if (e.features.length > 0) {
          if (hoveredCountryId !== null) {
            map.setFeatureState(
              { source: 'countries', id: hoveredCountryId },
              { hover: false }
            );
          }

          hoveredCountryId = e.features[0].id;
          setCurCountry(e.features[0].properties.sovereignt);
          console.log(e.features[0].properties.sovereignt);
          map.setFeatureState(
            { source: 'countries', id: hoveredCountryId },
            { hover: true }
          );
        }
      });
  
      map.on('mouseleave', 'country-fills', () => {
        if (hoveredCountryId !== null) {
            map.setFeatureState(
                { source: 'countries', id: hoveredCountryId },
                { hover: false }
            );
        }
  
        hoveredCountryId = null;
        setCurCountry(null);
      });
  
      return () => map.remove();
    }, []);
  
    return <div>
            <div className="map-container" ref={mapContainerRef} />
            <div className="dataButton">
              <Switch defaultChecked color="default" onClick={onButtonClick} />
              {isPerPop ? "Data per one million" : "Total Data"}
            </div>
            <WorldInfoPanel country={curCountry} isPerPop={isPerPop}/>
            <Graphs />
          </div>
  }
  
  export default App;