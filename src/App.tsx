import React from "react";
import "./App.css";
import "./globalStyles.module.css";
import AppRoutes from "./routes/routes";

function App() {
  return (
    <div className="App">
      <AppRoutes isAllowed={true} />
    </div>
  );
}

export default App;
