import { Map, Marker} from "pigeon-maps"
import { maptiler } from 'pigeon-maps/providers'
import { useState, useEffect } from "react"
import { apiKeyYandexPlaces, apiKeyMapTiler } from "./securePlace"
// import css


export default function MyMap() {
  const [center, setCenter] = useState([41.704200, 44.789464]);
  const [zoom, setZoom] = useState(16);
  const [data, setData] = useState(null)

  const maptilerProvider = maptiler(apiKeyMapTiler, 'streets');

  useEffect(() => {
    getYandexPlaces(`coffee and restaurants`, `en_US`)
    .then( places => {
      setData(places);
      places.features.map(place => {
        console.log(place.geometry.coordinates);
      });
    })
    return () => {};
  }, [])
  
  return (
    <Map
    provider={maptilerProvider}
    height={'80vh'}
    defaultCenter={center}
    defaultZoom={zoom}
    onBoundsChanged={({ center, zoom }) => { 
      setCenter(center) 
      setZoom(zoom) 
    }}
    >
      {data && data.features.map(place => <Marker width={50} anchor={place.geometry.coordinates} />)}
    </Map>
  )

  // we're going to get Places by this function
  async function getYandexPlaces(searchText, responseLanguage) {
    let url = createRequestURL(searchText, responseLanguage);
    try {
      let response = await fetch(url);
      let data = await response.json();
      return data;
    } catch(e) {
      console.log(e);
    }
  }

  function createRequestURL(searchText, responseLanguage) {
    let url = new URL(`https://search-maps.yandex.ru/v1/`);
    url.searchParams.set('apikey', apiKeyYandexPlaces);
    url.searchParams.set('text', searchText);
    url.searchParams.set('lang', responseLanguage);
    url.searchParams.set('ll', center.toString());
    url.searchParams.set('spn', `0.05,0.05`);
    return url
  }
}