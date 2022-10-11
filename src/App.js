import React, { useState } from "react";
import "./App.css";
import CreateScreen from "./ui-components/screens/CreateScreen/CreateScreen";
import MetricsScreen from "./ui-components/screens/MetricsScreen/MetricsScreen";

function App() {
  const [screen, setScreen] = useState("create");

  function screen1ChangeHandler(objItem) {
    setScreen(objItem.value);
  }

  function navigateScreenHandler(type, objItem) {
    switch (type) {
      case "CATEGORY_CHANGE":
        // nav to create from scratch screen
        setScreen(objItem.value);
        break;
      case "SKIP":
        // nav to create from scratch screen
        break;
      case "GENERATE":
        // Using the following data - generate records
        // objItem.selectedCategory - string representing the category
        // objItem.selectedMetrics - array of strings representing the selected questions
        // objItem.selectedRelatedMetrics  - array of strings representing the selected related questions
        break;
      default:
        break;
    }
  }

  return (
    <div className="App">
      <div className="categories-screen">
        {screen === "create" && (
          <CreateScreen onChange={screen1ChangeHandler} />
        )}
        {screen === "template" && (
          <MetricsScreen
            selectedScreen={screen}
            onChange={navigateScreenHandler}
          />
        )}
      </div>
    </div>
  );
}

export default App;
