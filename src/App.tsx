import "./App.css";
import View from "./routes";
import MainContent from "./components/MainContent/MainContent";
import Navbar from "./components/Navbar/Navbar";
import useSideMenuToggler from "./utils/custom-hooks/useSideMenuToggler";
import VW from "vw-detector";
import Footer from "./components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import ConfirmModal from "./components/reusable/ConfirmModal/ConfirmModal";

const upLg = VW.breakpoints.up("lg");

function App() {
  const { openSideMenu, toggleSideMenu } = useSideMenuToggler(upLg);
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <ToastContainer />
        <Navbar openSideMenu={openSideMenu} toggleSideMenu={toggleSideMenu} />
        <MainContent expand={openSideMenu}>
          <View></View>
        </MainContent>
        <Footer />
      </div>
    </>
  );
}

export default App;
