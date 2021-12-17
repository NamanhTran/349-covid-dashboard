import React, {useRef, useEffect, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import InfoPanel from './USInfoPanel';
import Graphs from './graphs';
import { Switch } from '@mui/material/';

mapboxgl.accessToken = 'pk.eyJ1IjoibmFtYW5odHJhbiIsImEiOiJja3dzYTl5djQxNHQ2Mm5zMng5emxwcGxoIn0.gw1FMVhGFZA4FWTcbV8dUQ';

const USMap = () => {
  const mapContainerRef = useRef(null);
  const [curState, setCurState] = useState(null);
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
    let hoveredStateId = null;

    const mapBounds = [
      [-179, -5],
      [-57, 75]
    ]

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: `mapbox://styles/namanhtran/ckx24tdvs11eo14oiwgfvsv3a?${mapboxgl.accessToken}`,
      center: [-97, 45],
      zoom: 3.00,
      minZoom: 1,
      maxBounds: mapBounds
    });

    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    map.on('load', () => {
      map.addSource('states', {
        type: 'geojson',
        data: 'https://docs.mapbox.com/mapbox-gl-js/assets/us_states.geojson'
      });

      map.addLayer({
          'id': 'state-border',
          'type': 'line',
          'source': 'states',
          'layout': {},
          'paint': {
            'line-color': '#627BC1',
            'line-width': 2
        }
      });

      map.addLayer({
        id: 'state-fills',
        type: 'fill',
        source: 'states',
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

    map.on('mousemove', 'state-fills', (e) => {
      if (e.features.length > 0) {
        if (hoveredStateId !== null) {
          map.setFeatureState(
            { source: 'states', id: hoveredStateId },
            { hover: false }
          );
        }

        hoveredStateId = e.features[0].id;
        setCurState(e.features[0].properties.STATE_NAME);
        map.setFeatureState(
          { source: 'states', id: hoveredStateId },
          { hover: true }
        );
      }
    });

    map.on('mouseleave', 'state-fills', () => {
      if (hoveredStateId !== null) {
        map.setFeatureState(
          { source: 'states', id: hoveredStateId },
          { hover: false }
        );
      }

      hoveredStateId = null;
      setCurState(null);
    });

    return () => map.remove();
  }, []);

  return (<div>
          <div className="map-container" ref={mapContainerRef} />
          <div className="dataButton">
            <Switch defaultChecked color="default" onClick={onButtonClick} />
            {isPerPop ? "Data per one million" : "Total Data"}
          </div>
          <InfoPanel usState={curState} isPerPop={isPerPop} />
          <Graphs />
        </div>);
};

export default USMap;
