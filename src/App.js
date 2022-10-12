import React, { useState } from "react";
import "./App.css";
import CreateFromTemplateScreen from "./ui-components/screens/CreateFromTemplateScreen/CreateFromTemplateScreen";
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
        setScreen(objItem?.data?.value);
        break;
      case "SKIP":
        // nav to create from scratch screen
        break;
      case "GENERATE":
        // Using the following data - generate records
        // objItem.selectedMetrics - structure as below
        // {
        //   "category1":{direct:["ticket_1", "ticket_2"], related:["relTicket_1"]},
        //   "category2":{direct:["contact_2"], related:[]},
        // }
        break;

      case "USE_TEMPLATE":
        console.log("use template ", objItem);
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
        {screen === "scratch" && (
          <MetricsScreen
            selectedScreen={screen}
            onChange={navigateScreenHandler}
          />
        )}
        {screen === "template" && (
          <CreateFromTemplateScreen
            selectedScreen={screen}
            onChange={navigateScreenHandler}
          />
        )}
      </div>
    </div>
  );
}

export default App;
