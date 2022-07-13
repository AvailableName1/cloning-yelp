import { Outlet, Link } from "react-router-dom";
import "./App.css";
import React, {useState, useEffect} from "react";
import MyMap from "./MyMap";

function App() {
  const [center, setCenter] = useState([41.7042, 44.789464]);
  const [data, setData] = useState(null);
  const [requestText, setRequestText] = useState('food');

  const yandexAPI = process.env.REACT_APP_API_YANDEX;

  useEffect(() => {
    getYandexPlaces(requestText, `en_US`)
    .then( places => {
      setData(places);
      console.log(places.features);
    })}, [center, requestText])


  return (
    <div className="container" style={{ minHeight: "100vh" }}>
      <nav
        className="navbar navbar-light justify-content-center"
        style={{ backgroundColor: "#BCE7FD" }}
      >
        <div className="d-flex justify-content-center align-items-center">
          <Link className="navbar-brand" to="/">
            <h1>Home</h1>
          </Link>
          <div className="navbar-nav flex-row gap-3">
            <Link className="nav-link" to="/caffee">
              <h1>Cafe</h1>
            </Link>
            <Link className="nav-link" to="/restaurant">
              <h1>Restaurant</h1>
            </Link>
          </div>
        </div>
      </nav>
      <main>
        <MyMap center={center} centerChanger={setCenter} data={data}/>
      </main>
      <Outlet context={[data, setRequestText]}/>
    </div>
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
    url.searchParams.set("apikey", yandexAPI);
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

export default App;
