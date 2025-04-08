import { useState, useEffect, useRef } from "react";
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
import Tailwindparent from "./tailwindcss/tailwing parent/parent";
import CompetitionForm from "./sass/sass";
import FormAntParentV2 from "./components/antcom/formant/formantp2";
import AnimatedParent from "./util/transition/anime";
import Loginsplax from "./sparkz/spark";
import DashedSteps from "./sparkz/progress";
import AnimatedDashedProgress from "./sparkz/progress";
import InvertedBorderRadiusBar from "./sparkz/invertedborder";
import AnimatedWave from "./sparkz/wave";
import ImageGrid from "./sparkz/gridspark";
import Sidebar from "./sparkz/sidebar";
import VisaOffers from "./sparkz/screen2";
import MasonryGrid from "./sparkz/mansory";
import CoverflowSlider from "./sparkz/youtubeswiper/slidermiddlebig";
import TwoColorCircularProgressBar from "./sparkz/progressspark";
import MyResponsiveForm from "./antgutter/antgutter";
import NestedFormList from "./antformlist/listsssss";
import MarqueeText from "./wrapperanime/childcomos/homeanime";
import Gridtablevisa from "./gridtablevisa/gridtablevisa";
import ParentComponentGridTable from "./gridtablevisa/parentgridvisatable";

function App() {
  const [progress, setProgress] = useState(50);
  const [internetConnection, setInternetConnection] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const [direction, setDirection] = useState(1); // Direction can be -1 or +1 to alternate
  const [isExpanded, setIsExpanded] = useState(false); // To track if the item is expanded or collapsed
  const [scrollTriggered, setScrollTriggered] = useState(false); // Track if scroll event has triggered

  const divRef = useRef(null);

  // Function to handle the translation on click (expand or collapse)
  const handleTranslate = () => {
    if (isExpanded) {
      // Collapse
      setTranslateX((prevTranslateX) => prevTranslateX - 30);
    } else {
      // Expand
      setTranslateX((prevTranslateX) => prevTranslateX + 30);
    }
    setIsExpanded((prev) => !prev); // Toggle between expanded and collapsed
  };

  // Log the coordinates of the element
  const logCoordinates = () => {
    if (divRef.current) {
      const rect = divRef.current.getBoundingClientRect();
      console.log("Element Coordinates:", rect);
      console.log("Top:", rect.top, "Left:", rect.left);
      console.log("Width:", rect.width, "Height:", rect.height);
    }
  };

  // Effect to log the coordinates whenever translateX changes
  useEffect(() => {
    logCoordinates();
  }, [translateX]);

  // Scroll event handler (collapse only once when scrolling)
  useEffect(() => {
    const handleScroll = () => {
      if (!isExpanded && !scrollTriggered && window.scrollY >= 200) {
        console.log("Scrolled 200px or more! Collapsing...");

        // Collapse the element when scrolling (only once)
        setTranslateX((prevTranslateX) => prevTranslateX - 30); // Moves the element by -30px on scroll

        // Set scrollTriggered to true to ensure the event only runs once
        setScrollTriggered(true);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup by removing the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollTriggered, isExpanded]); // Dependency array to track changes in scrollTriggered and isExpanded

  // Effect for internet connection status
  useEffect(() => {
    window.addEventListener("offline", function () {
      setInternetConnection(true);
    });
    window.addEventListener("online", function () {
      setInternetConnection(false);
    });

    return () => {
      window.removeEventListener("offline", () => {});
      window.removeEventListener("online", () => {});
    };
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
    <div className="relative transition-all duration-500  ">
      <ParentComponentGridTable />
      <Grid></Grid>
      <Gridtablevisa />
      <MyResponsiveForm />
      <NestedFormList />
      <AnimatedParent anime="bounce" />
      <AnimatedParent anime="magnetic" />
      <AnimatedParent anime="flip" />
      <AnimatedParent anime="shake" /> <AnimatedParent anime="neon" />
      <MarqueeText />
      <TwoColorCircularProgressBar
        foregroundColor="black"
        backgroundColor="red"
        size={120}
        speed={50}
        maxProgress={85}
      />{" "}
      <TwoColorCircularProgressBar
        foregroundColor="black"
        backgroundColor="yellow"
        size={120}
        speed={50}
        maxProgress={progress}
      />
      <AntTableParent2></AntTableParent2>
      <button
        onClick={() => setProgress((prev) => (prev >= 100 ? 50 : prev + 10))}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Increase Progress
      </button>
      <AnimatedDashedProgress />
      <Card8 />
      <Card9 />
      <Card10 />
      <Card11 />
      <div className="flex flex-col justify-center items-center h-screen space-y-4">
        {/* Pass the progress state */}

        {/* Button to Update Progress */}
      </div>
      <div className="relative my-10 ">
        <div className="fixed top-1/2 left-0  -translate-y-1/2 transform transition-all duration-1000 ease-out">
          <div
            ref={divRef}
            onClick={handleTranslate}
            style={{ transform: `translateX(${translateX}px)` }}
            className="flex flex-col items-center justify-center relative"
          >
            <div className="rounded-full bg-purple-400 py-4 pr-2 relative">
              <div className="bg-white w-10 h-[41px] rounded-full absolute -top-10 right-0"></div>
              <div className="bg-white w-10 h-[41px] rounded-full absolute -bottom-10 right-0"></div>

              {/* Red circles */}
              <div className=" border-2 w-8 h-8"></div>
              <div className="border-2 w-8 h-8"></div>
              <div className="border-2 w-8 h-8"></div>
              <div className="border-2 w-8 h-8"></div>
              <div className="border-2 w-8 h-8"></div>
              <div className="border-2 w-8 h-8"></div>
              <div className="border-2 w-8 h-8"></div>
              <div className="border-2 w-8 h-8"></div>
              <div className="border-2 w-8 h-8"></div>
            </div>

            {/* Pseudo-elements (using absolute positioning) */}
            <div className="absolute -z-10 bg-purple-400 w-6 h-12 -top-5 left-0"></div>
            <div className="absolute -z-10 bg-purple-400 w-6 h-12 -bottom-5 left-0"></div>
          </div>
        </div>
      </div>
      {/* <div
        className={`fixed left-0 top-1/2  rounded-lg overflow-hidden bg-black  -translate-y-1/2 h-[40vh] transition-all duration-500 ${
          isExpanded ? "min-w-[80px] max-h-[60vh]" : "min-w-[200px] h-[40vh]"
        }`}
      >
        <div className="flex justify-start rounded-lg  bg-green-500 items-center h-full">
          <div
            className="   backdrop:bg-gray-500 flex items-center text-white font-bold cursor-pointer  p-4 
          overflow-hidden break-words w-full h-full"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex flex-col bg-white/20 backdrop-blur-lg shadow-lg border border-white/30 rounded-lg p-4">
              <div className="h-7 flex items-center w-7 bg-red-500 overflow-hidden">
                hiiiiiiiiiiiiiiiiiiiiiiiii
              </div>
              <div className="h-7 w-7 bg-red-500 overflow-hidden">
                hiiiiiiiiiiiiiiiiiiiiiiiii
              </div>
              <div className="h-7 w-7 bg-red-500"></div>
              <div className="h-7 w-7 bg-red-500"></div>
              <div className="h-7 w-7 bg-red-500"></div>
            </div>
          </div>
        </div>
      </div> */}
      {/* <CompetitionForm />
      <Toothpick4></Toothpick4> <Checkant></Checkant> */}
      {/* <PdfParent></PdfParent> */}
      {/*
      <Tooltip5></Tooltip5> */}
      {/*
       */}
      <div className="w-64"> {/* <AnimatedParent anime="tilt" /> */}</div>
      {/*
      <FormAntParent></FormAntParent>
      <FormAntParentV2></FormAntParentV2> */}
      {/* <SampleTable></SampleTable> */}
      {/* <DynamicTable></DynamicTable> */}
      {/* <AntTableParent2></AntTableParent2>
      <Glass></Glass>
      <Parentdateclear></Parentdateclear> */}
      {/* <Datecros></Datecros> */}
      <div className="flex flex-col justify-center  items-center gap-10 ">
        {/* <Apptable></Apptable> */}
        {/* <TextToSpeech></TextToSpeech> */}
        {/* <UserForm></UserForm> */}
        {/* <CustomModal></CustomModal> */}
        {/*
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
        {/* <ParentForm2></ParentForm2> */}
        {/*
        <DataDisplayComponent></DataDisplayComponent> */}
        <ThemeProvider>
          {/* <NoInternet connectionStatus={internetConnection} /> */}
          <Router>
            <ScrollToTop />
            <Routes>
              {/* Protected Routes (Require Authentication) */}
              <Route
                path="/"
                element={
                  <RequireAuth> {/* <DashboardLayout /> */}</RequireAuth>
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
                path="/tail"
                element={
                  <>
                    {" "}
                    <Tailwindparent />
                  </>
                }
              />{" "}
              <Route
                path="/tails"
                element={
                  <>
                    {" "}
                    <Loginsplax />
                  </>
                }
              />{" "}
              <Route
                path="/s2"
                element={
                  <>
                    {" "}
                    <VisaOffers />
                  </>
                }
              />{" "}
              <Route
                path="/s3"
                element={
                  <>
                    {" "}
                    <MasonryGrid />
                  </>
                }
              />{" "}
              <Route
                path="/ytbeslide"
                element={
                  <>
                    {" "}
                    <CoverflowSlider />
                  </>
                }
              />{" "}
              <Route
                path="/progress"
                element={
                  <>
                    {" "}
                    <AnimatedDashedProgress />
                    {/* <DashedSteps /> */}
                  </>
                }
              />{" "}
              <Route
                path="/invert"
                element={
                  <>
                    {" "}
                    <InvertedBorderRadiusBar />
                    {/* <DashedSteps /> */}
                  </>
                }
              />{" "}
              <Route
                path="/ImageGrid"
                element={
                  <>
                    {" "}
                    <ImageGrid />
                    {/* <DashedSteps /> */}
                  </>
                }
              />{" "}
              <Route
                path="/wave"
                element={
                  <>
                    {" "}
                    <AnimatedWave />
                    {/* <DashedSteps /> */}
                  </>
                }
              />{" "}
              <Route
                path="/side"
                element={
                  <>
                    {" "}
                    <Sidebar />
                    {/* <DashedSteps /> */}
                  </>
                }
              />{" "}
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
    </div>
  );
}

export default App;
