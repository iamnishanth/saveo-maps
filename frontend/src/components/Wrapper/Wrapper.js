import Coordinates from "../Coordinates/Coordinates";
import Map from "../Map/Map";
import styles from "./Wrapper.module.css";

const Wrapper = () => {
  return (
    <div className={styles.wrapper}>
      <Coordinates />
      <Map />
    </div>
  );
};

export default Wrapper;
