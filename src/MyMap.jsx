import { Map, Marker } from "pigeon-maps";
import { maptiler } from "pigeon-maps/providers";
import { CSSTransition } from "react-transition-group";
import { useState, useEffect } from "react";
import { apiKeyYandexPlaces, apiKeyMapTiler } from "./securePlace";
import PopUp from "./components/PopUp";
// import css

export default function MyMap() {
  const [center, setCenter] = useState([41.7042, 44.789464]);
  const [zoom, setZoom] = useState(17);
  const [data, setData] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false);
  const [displayed, setDisplayed] = useState(null);

  const maptilerProvider = maptiler(apiKeyMapTiler, "streets");

  useEffect(() => {
    getYandexPlaces(`food`, `en_US`)
    .then( places => {
      setData(places);
      console.log(places.features);
    })}, [center])

  return (
    <Map
      provider={maptilerProvider}
      height={"80vh"}
      twoFingerDrag={true}
      defaultCenter={center}
      defaultZoom={zoom}
      onBoundsChanged={({ center, zoom }) => {
        setCenter(center);
        setZoom(zoom);
      }}
    >
      <CSSTransition
      in={showPopUp}
      timeout={200}
      classNames="popUp"
      mountOnEnter
      unmountOnExit
      >
        <PopUp 
        title={displayed ? displayed.name : ''}
        type="Cafe/Restaurant"
        text={displayed ? displayed.address : ''}
        />
      </CSSTransition>
      {data &&
        data.features.map((place) => (
          <Marker
            key={place.properties.CompanyMetaData.id}
            width={50}
            anchor={[...place.geometry.coordinates].reverse()}
            onMouseOver={(e) => {
              setDisplayed(place.properties.CompanyMetaData);
              setShowPopUp(true);
            }}
            onMouseOut={() => setShowPopUp(false)}
            // onClick={}
          />
        ))}
    </Map>
  );

  // we're going to get Places by this function
  async function getYandexPlaces(searchText, responseLanguage) {
    let url = createRequestURL(searchText, responseLanguage);
    try {
      let response = await fetch(url);
      let data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  function createRequestURL(searchText, responseLanguage) {
    let requestCenter = [...center];
    let url = new URL(`https://search-maps.yandex.ru/v1/`);
    url.searchParams.set("apikey", apiKeyYandexPlaces);
    url.searchParams.set("text", searchText);
    url.searchParams.set("lang", responseLanguage);
    url.searchParams.set("type", "biz");
    url.searchParams.set("ll", requestCenter.reverse().toString());
    url.searchParams.set("spn", `0.005,0.005`);
    url.searchParams.set("rspn", `1`);
    url.searchParams.set("results", `25`);
    console.log(url);
    return url;
  }
}
