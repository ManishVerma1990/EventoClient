import "./App.css";

import NavBar from "./layout/navBar";
import Body from "./layout/body";
import SessionLoader from "./components/sessionLoader";

function App() {
  return (
    <>
      <SessionLoader />
      <NavBar />
      <Body />
    </>
  );
}

export default App;
