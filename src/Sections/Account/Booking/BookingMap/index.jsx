'use client'

import { getCoords, createSvgMarkerCurPosition, createSvgMarker } from './helpers'
import styles from './styles.module.scss'

import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'
import { useRef, useEffect } from 'react'

const BookingMap = ({currentGym, Placemarks, updateData}) => {
  const mapRef = useRef(null)

  const handleZoom = (type) => {
    // type = in or out
    const zoomChange = type === 'in' ? 1 : -1;
    const map = mapRef.current;
    if (map) {
      const currentZoom = map.getZoom();
      map.setZoom(currentZoom + zoomChange);
    }
  };

  const handleGeolocation = () => {
    const map = mapRef.current;
    if (map && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const objData = {
          id: 'curPosition',
          coords: `${latitude}, ${longitude}`,
        };
        map.panTo([latitude, longitude], { flying: true });
        updateData(objData);
      });
    }
  };

  const toGym = () => {
    const map = mapRef.current;
    map?.panTo(getCoords(currentGym?.coords), { flying: false, duration: 800, safe: false, timingFunction: 'ease-in-out'});
  }

  useEffect(() => {
    toGym()
  }, [currentGym]);
  
  return (
    <div className={styles.map}>
      <YMaps>
        <Map 
          defaultState={{
            center: getCoords(currentGym?.coords),
            zoom: 15,
          }}
          width="100%" 
          height="100%"
          options={{
            suppressMapOpenBlock: true,
            behaviors: ['drag', 'dblClickZoom'],
          }}
          instanceRef={(map) => {
            map?.behaviors.disable('scrollZoom');
            mapRef.current = map;
          }}
        >
          {Placemarks?.map(({ id, coords }) => (
            <Placemark
              key={id}
              geometry={getCoords(coords)}
              options={
                id === 'curPosition'
                  ? createSvgMarkerCurPosition()
                  : createSvgMarker()
              }
            />
          ))}
        </Map>
      </YMaps>
      
        <div className={styles.map__nav_zooms}>
          <button type='button' className={styles.map__zoom} aria-label="Ближе +" onClick={() => handleZoom('in')}>+</button>
          <button type='button' className={styles.map__zoom} aria-label="Дальше -" onClick={() => handleZoom('out')}>-</button>
        </div>
        <button onClick={handleGeolocation} className={styles.map__geo} aria-label="Геопозиция">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 67 67" fill="none">
            <circle cx="33.3776" cy="33.2838" r="33.2838" fill="#212428" />
            <path
              d="M40.0932 21.0124L20.0623 31.4281C18.4296 32.277 18.7132 34.6943 20.498 35.1423L27.4016 36.8753C28.9017 37.2518 30.1431 38.3014 30.7638 39.718L33.1783 45.2279C33.9335 46.9513 36.4341 46.7731 36.9373 44.9601L42.943 23.3217C43.4105 21.6373 41.6442 20.2059 40.0932 21.0124Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
  )
}

export default BookingMap;