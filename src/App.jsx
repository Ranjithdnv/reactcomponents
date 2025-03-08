import { useState, useEffect } from "react";
import "./App.css";
import ButtonLighting from "./components/button/buttonlighting";
import Card1 from "./components/card/card1";
import Card2 from "./components/card/card2";
import Button3 from "./components/button/button3";
import Button4 from "./components/button/button4";
import Button5 from "./components/button/button5";
import Button6 from "./components/button/button6";
import Button7 from "./components/button/button7";
import Button8 from "./components/button/button8";
import Button9 from "./components/button/button9";
import Button10 from "./components/button/button10";
import Button11 from "./components/button/button11";
import Button12 from "./components/button/button12";
import Form1 from "./components/form/form1";
import Form2 from "./components/form/form2";
import Form3 from "./components/form/form3";
import Form4 from "./components/form/form4";
import Form5 from "./components/form/form5";
import Form6 from "./components/form/form6";
import Form7 from "./components/form/form7";
//import Form8 from "./components/form/form8";
import Form9 from "./components/form/form9";
import InputBox from "./components/inputs/inputs1";
import InputBox2 from "./components/inputs/inputs2";
import Card3 from "./components/card/card3";
import Card4 from "./components/card/card4";
import Card5 from "./components/card/card5";
import Card6 from "./components/card/card6";
import Card7 from "./components/card/card7";
import Card8 from "./components/card/card8";
import Card9 from "./components/card/card9";
import Card10 from "./components/card/card10";
import Card11 from "./components/card/card11";
import Text1 from "./components/text/text1";
import Toothpick1 from "./components/tootpick/tooth1";
import Toothpick2 from "./components/tootpick/tooth2";
import Toothpick3 from "./components/tootpick/tooth3";
import Toothpick4 from "./components/tootpick/tooth4";
import Tooltip5 from "./components/tootpick/tooltip5";
import Card12 from "./components/card/card12";
import Card13 from "./components/card/card13";
import Card14 from "./components/card/card14";
import Card15 from "./components/card/card15";
import Table from "./pages/table/table";
import Apptable from "./pages/table/table";

import UserForm from "./pages/formvalidations/form";
import Grid from "./pages/gridwrap/grid";
import TextToSpeech from "./pages/voice/voice";

import BasicDrawer from "./pages/modaletc/drawer/drawer";
import Parentform from "./pages/parent/parentform/parentform";
import CustomModalWrapper from "./pages/modaletc/modal/modal";
import SampleTable from "./pages/tableantd/table";
import Content from "./dashpages/content";
import Profile from "./dashpages/profile";
import Home from "./dashpages/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layout/dashboard";
import NoInternet from "./dashpages/nointernet";
import ScrollToTop from "./dashpages/scroll";
import { ThemeProvider } from "./util/themecontext";
import ProfileDetails from "./dashpages/profile/profileprof";
import ProfileSettings from "./dashpages/profile/profileset";
import CounterComponent from "./pages/hooktest";
import DataDisplayComponent from "./pages/hooktest";
import Comp from "./pages/shancomponets/comp";
import ParentForm2 from "./components/rancomponents/parentfoemfull";
import RequireAuth from "./util/require";
import Header from "./pages/header";
import Footer from "./pages/footer";

import { CarouselCrossfadeExample } from "./components/caroselfadeaway/caroselfade";
import ScrollableTooltip from "./components/tootpick/tooltipscroll/tooltipscroll";
import FlexGrid from "./pages/gridwrap/grid";
import Glass from "./components/card/card16glass/glass";
import Datecros from "./components/rancomponents/datewithcross/datecros";
import Parentdateclear from "./components/rancomponents/datewithcross/parentdateclear";
import AntTableComponent from "./components/antcom/ant";
import Checkant from "./pages/checkingantselectetc/checkant";
import PdfParent from "./pages/pdf/pdfparent";
import LoggerComponent from "./util/trace/trace";
import CombinedForm from "./components/antcom/formant/formant";
import DynamicTable from "./components/antcom/anttable/anttaable";
import FormAntParent from "./components/antcom/formant/formantparent";
import AntTableParent2 from "./components/antcom/anttable/parent2ant";

function App() {
  const [internetConnection, setInternetConnection] = useState(false);
  useEffect(() => {
    console.log(internetConnection);
    window.addEventListener("offline", function () {
      setInternetConnection(true);
    });
    window.addEventListener("online", function () {
      setInternetConnection(false);
    });
  }, []);

  const itemList = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
  ];
  console.log(internetConnection);
  return (
    <>
      {/* <Toothpick4></Toothpick4>
      <Tooltip5></Tooltip5> */}
      {/* <PdfParent></PdfParent>
      <Checkant></Checkant> */}
      <FormAntParent></FormAntParent>
      {/* <SampleTable></SampleTable> */}
      {/* <DynamicTable></DynamicTable> */}

      <AntTableParent2></AntTableParent2>
      <Glass></Glass>
      <Parentdateclear></Parentdateclear>

      {/* <Datecros></Datecros> */}
      <div className="flex flex-col justify-center  items-center gap-10 ">
        {/* <Apptable></Apptable> */}
        {/* <TextToSpeech></TextToSpeech> */}
        {/* <UserForm></UserForm> */}
        {/* <CustomModal></CustomModal> */}
        <Grid></Grid>
        <BasicDrawer></BasicDrawer>
        <CustomModalWrapper
          variant="confirm"
          title="Custom Title"
          content="Hello World!"
          name="ranjih"
        ></CustomModalWrapper>{" "}
        <CustomModalWrapper
          variant="basic"
          title="Custom Title"
          content="Hello World!"
          name="ranjih"
        ></CustomModalWrapper>
        <CustomModalWrapper variant="loading"></CustomModalWrapper>
        {/* <Parentform></Parentform> */}
        <ParentForm2></ParentForm2>
        {/*
        <DataDisplayComponent></DataDisplayComponent> */}
        <ThemeProvider>
          <NoInternet connectionStatus={internetConnection} />
          <Router>
            <ScrollToTop />
            <Routes>
              {/* Protected Routes (Require Authentication) */}
              <Route
                element={
                  <RequireAuth>
                    {" "}
                    <DashboardLayout />
                  </RequireAuth>
                }
              >
                <Route
                  index
                  element={
                    <>
                      <Home />
                    </>
                  }
                />
                <Route path="profile" element={<Profile />}>
                  <Route path="details" element={<ProfileDetails />} />
                  <Route path="settings" element={<ProfileSettings />} />
                </Route>
                <Route path="settings" element={<Content />} />
                <Route path="shanco" element={<Comp />} />
                <Route path="form" element={<ParentForm2 />} />
              </Route>
              <Route
                path="/ant"
                element={
                  <>
                    <AntTableComponent />
                  </>
                }
              />

              {/* Public Routes */}

              <Route
                path="/trace"
                element={
                  <>
                    {" "}
                    <LoggerComponent />
                  </>
                }
              />
              <Route
                path="/login"
                element={
                  <>
                    <CarouselCrossfadeExample />
                  </>
                }
              />
            </Routes>
          </Router>
        </ThemeProvider>
        <ScrollableTooltip items={itemList}>
          <span className="w-fit flex">bg-green-400</span>
        </ScrollableTooltip>
      </div>
    </>
  );
}

export default App;
