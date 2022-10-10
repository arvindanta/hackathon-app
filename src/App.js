import { FwButton } from "@freshworks/crayons/react";
import "./App.css";
function App() {
  return (
    <div className="App">
      <FwButton onClick={() => alert("button clicked")}>Button</FwButton>
    </div>
  );
}

export default App;
