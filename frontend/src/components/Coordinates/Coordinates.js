import { useApp } from "../../context/AppContext";

import styles from "./Coordinates.module.css";

const Coordinates = () => {
  const { locationDetails, handleShowRoute, loading } = useApp();

  return (
    <section className={styles.coordinates}>
      <div className={styles.coordinatesTop}>
        <h1 className={styles.coordinatesTitle}>ALL CO-ORDINATES:</h1>
        <div className={styles.coordinatesTable}>
          {locationDetails.map((item, index) => (
            <div className={styles.coordinatesTableItem} key={index}>
              <p>{item.name}</p>
              <div className={styles.coordinatesTableRight}>
                <strong>{item.lat}</strong>
                <strong>{item.lon}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        disabled={locationDetails.length < 2 || loading}
        className={styles.coordinatesBtn}
        onClick={handleShowRoute}
      >
        {loading ? "Loading..." : "Show Route"}
      </button>
    </section>
  );
};

export default Coordinates;
