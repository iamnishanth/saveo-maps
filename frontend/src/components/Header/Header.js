import { useApp } from "../../context/AppContext";

import styles from "./Header.module.css";

const Header = () => {
  const {
    locationName,
    setLocationName,
    locationLat,
    setLocationLat,
    locationLon,
    setLocationLon,
    handleLocationAdd,
  } = useApp();

  const isButtonDisabled = !(
    locationName.trim().length > 0 &&
    locationLat.trim().length > 0 &&
    locationLon.trim().length > 0
  );

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <div className={styles.headerLeftItem}>
          <label className={styles.headerLabel} htmlFor="locationName">
            Location Name
          </label>
          <input
            id="locationName"
            className={styles.headerInput}
            type="text"
            placeholder="Location"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className={styles.headerLeftItem}>
          <label className={styles.headerLabel} htmlFor="locationLat">
            Enter Latitude
          </label>
          <input
            id="locationLat"
            className={`${styles.headerInput} ${styles.headerInputSm}`}
            type="text"
            placeholder="Lat"
            value={locationLat}
            onChange={(e) => setLocationLat(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className={styles.headerLeftItem}>
          <label className={styles.headerLabel} htmlFor="locationLon">
            Enter Longitude
          </label>
          <input
            id="locationLon"
            className={`${styles.headerInput} ${styles.headerInputSm}`}
            type="text"
            placeholder="Lon"
            value={locationLon}
            onChange={(e) => setLocationLon(e.target.value)}
            autoComplete="off"
          />
        </div>
      </div>
      <div className={styles.headerRight}>
        <button
          disabled={isButtonDisabled}
          className={styles.headerBtn}
          onClick={handleLocationAdd}
        >
          {isButtonDisabled ? "SUBMIT" : "ADD"}
        </button>
      </div>
    </header>
  );
};

export default Header;
