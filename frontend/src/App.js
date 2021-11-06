import AppProvider from "./context/AppContext";

import Dashboard from "./components/Dashboard/Dashboard";

import "./App.css";

const App = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="App">
      <AppProvider>
        <Dashboard />
        <button className="home-btn" onClick={handleReload}>
          HOME
        </button>
      </AppProvider>
    </div>
  );
};

export default App;
