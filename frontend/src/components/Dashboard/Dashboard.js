import Header from "../Header/Header";
import Wrapper from "../Wrapper/Wrapper";

import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <main className={styles.dashboard}>
      <Header />
      <Wrapper />
    </main>
  );
};

export default Dashboard;
