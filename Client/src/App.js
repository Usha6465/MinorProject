import "./App.css";
import LayoutPage from "./Components/Main Page/LayoutPage";
import Navbar from "./Components/Navbar/Navbar";
import HorizontalLinearStepper from "./CreateYourGroup/HorizontalLinearStepper";
import Home from "./Pages/HomePage";
import AllRoutes from "./Routes/AllRoutes";
import "./App.css";
import SavedEvents from "./Pages/SavedEvents";
import Group from "./Pages/Group";

function App() {
  return (
    <div className="App">
      <AllRoutes />
      {/* <Group /> */}
    </div>
  );
}

export default App;
