"use client";

import { useRef, useState, useEffect } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

import { createSvgMarker, mapStyle, mapOptions, getCoords } from "../helpers";
import styles from "./MapArea.module.scss";

const MapArea = ({ Placemarks, currentPlacemark }) => {
  const mapRef = useRef(null);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setInnerWidth((prevWidth) => {
      return window.innerWidth;
    });
  };
  const handleZoomIn = () => {
    const map = mapRef.current;
    if (map) {
      const currentZoom = map.getZoom();
      map.setZoom(currentZoom + 1);
    }
  };

  const handleZoomOut = () => {
    const map = mapRef.current;
    if (map) {
      const currentZoom = map.getZoom();
      map.setZoom(currentZoom - 1);
    }
  };

  const handleGeolocation = () => {
    const map = mapRef.current;
    if (map && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        map.panTo([latitude, longitude], { flying: true });
      });
    }
  };

  useEffect(() => {
    const map = mapRef.current;
    map?.panTo(getCoords(currentPlacemark?.coords), { flying: true });
  }, [currentPlacemark]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles["map-area"]}>
      <YMaps>
        <Map
          style={mapStyle}
          options={mapOptions}
          defaultState={{
            center: getCoords(currentPlacemark?.coords),
            zoom: 15,
          }}
          instanceRef={(map) => {
            map?.behaviors.disable("scrollZoom");
            mapRef.current = map;
          }}
        >
          {Placemarks?.map(({ id, coords }) => (
            <Placemark
              key={id}
              geometry={getCoords(coords)}
              options={createSvgMarker(window.innerWidth)}
            />
          ))}
        </Map>

        <div className={styles["map-area__btns-zoom"]}>
          <button
            onClick={handleZoomIn}
            className={styles["map-area__btn-zoom"]}
          >
            +
          </button>
          <button
            onClick={handleZoomOut}
            className={styles["map-area__btn-zoom"]}
          >
            -
          </button>
        </div>
        <button
          onClick={handleGeolocation}
          className={styles["map-area__btn-geo"]}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="67"
            height="67"
            viewBox="0 0 67 67"
            fill="none"
          >
            <circle cx="33.3776" cy="33.2838" r="33.2838" fill="#212428" />
            <path
              d="M40.0932 21.0124L20.0623 31.4281C18.4296 32.277 18.7132 34.6943 20.498 35.1423L27.4016 36.8753C28.9017 37.2518 30.1431 38.3014 30.7638 39.718L33.1783 45.2279C33.9335 46.9513 36.4341 46.7731 36.9373 44.9601L42.943 23.3217C43.4105 21.6373 41.6442 20.2059 40.0932 21.0124Z"
              fill="white"
            />
          </svg>
        </button>
      </YMaps>
    </div>
  );
};

export default MapArea;
