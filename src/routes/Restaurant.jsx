import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export default function Restaurant() {
  const [data, setRequestText] = useOutletContext();

  useEffect(() => {
    setRequestText("restaurant");
    return () => {};
  }, []);

  return (
    <section>
      <h1>Restaurant</h1>
      <div className="infoCards">
        {data.features.map((place) => {
          return (
            <div className="card" key={place.properties.CompanyMetaData.id}>
              <div className="card-body">
                <h6 className="card-title">
                  {place.properties.CompanyMetaData.name}
                </h6>
                <p className="card-text">
                  {place.properties.CompanyMetaData.address}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
