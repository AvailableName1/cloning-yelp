import { Map, Marker } from "pigeon-maps";
import { maptiler } from "pigeon-maps/providers";
import { CSSTransition } from "react-transition-group";
import { useState } from "react";
import PopUp from "./components/PopUp";
// import css

export default function MyMap({ centerChanger, ...props }) {
  const [zoom, setZoom] = useState(17);
  const [showPopUp, setShowPopUp] = useState(false);
  const [displayed, setDisplayed] = useState(null);

  const mapTilerAPI = process.env.REACT_APP_API_MAPTILER;
  const maptilerProvider = maptiler(mapTilerAPI, "streets");

  return (
    <Map
      provider={maptilerProvider}
      height={"80vh"}
      twoFingerDrag={true}
      defaultCenter={props.center}
      defaultZoom={zoom}
      onBoundsChanged={({ center, zoom }) => {
        centerChanger(center);
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
      {props.data &&
        props.data.features.map((place) => (
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

  
}
