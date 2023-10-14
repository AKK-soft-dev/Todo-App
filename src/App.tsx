import "./App.css";
import View from "./routes";
import MainContent from "./components/MainContent/MainContent";
import Navbar from "./components/Navbar/Navbar";
import useSideMenuToggler from "./utils/custom-hooks/useSideMenuToggler";
import VW from "vw-detector";

const upLg = VW.breakpoints.up("lg");

function App() {
  const { openSideMenu, toggleSideMenu } = useSideMenuToggler(upLg);
  return (
    <>
      <Navbar openSideMenu={openSideMenu} toggleSideMenu={toggleSideMenu} />
      <MainContent expand={openSideMenu}>
        <View></View>
      </MainContent>
    </>
  );
}

export default App;
