import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Spinner } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import "./App.css";
import "./styles/animations.css";
import Header from "./components/Header";
import Homepage from "./pages/homepage/Homepage";
import About from "./pages/about/About";
import OurWorks from "./pages/ourworks/OurWorks";
import Career from "./pages/Career";
import Certificates from "./pages/Certificates";
import Footer from "./components/Footer";
import ContactUs from "./pages/ContactUs";
import OnlineProcess from "./components/OnlineProcess";
import ScrollToTop from "./components/ScrollToTop";
import Machines from "./pages/Machines";
import { ThemeProvider } from "@material-tailwind/react";
import UploadModel from "./pages/UploadModel";
import { ThemeProvider as CustomThemeProvider } from "./contexts/ThemeContext";

function App() {

  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage); // Set the language from localStorage on mount
    }
  }, [i18n]);

  const theme = {
    dialog: {
      defaultProps: {
        size: "md",
        dismiss: {},
        animate: {
          unmount: {},
          mount: {},
        },
        className: "",
      },
      valid: {
        sizes: ["xs", "sm", "md", "lg", "xl", "xxl"],
      },
      styles: {
        base: {
          backdrop: {
            display: "grid",
            placeItems: "place-items-center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "w-screen",
            height: "h-screen",
            backgroundColor: "bg-black",
            backgroundOpacity: "bg-opacity-60",
            backdropFilter: "backdrop-blur-sm",
          },
          container: {
            position: "relative",
            bg: "bg-white",
            m: "m-4",
            borderRadius: "rounded-lg",
            boxShadow: "shadow-2xl",
            color: "text-blue-gray-500",
            fontSmoothing: "antialiased",
            fontFamily: "font-sans",
            fontSize: "text-base",
            fontWeight: "font-light",
            lineHeight: "leading-relaxed",
          },
        },
        sizes: {
          xs: {
            width: "w-full md:w-3/5 lg:w-2/5 2xl:w-1/4",
            minWidth: "min-w-[80%] md:min-w-[60%] lg:min-w-[40%] 2xl:min-w-[25%]",
            maxWidth: "max-w-[80%] md:max-w-[60%] lg:max-w-[40%] 2xl:max-w-[25%]",
          },
          sm: {
            width: "w-full md:w-2/3 lg:w-2/4 2xl:w-1/3",
            minWidth: "min-w-[80%] md:min-w-[66.666667%] lg:min-w-[50%] 2xl:min-w-[33.333333%]",
            maxWidth: "max-w-[80%] md:max-w-[66.666667%] lg:max-w-[50%] 2xl:max-w-[33.333333%]",
          },
          md: {
            width: "w-full md:w-3/4 lg:w-3/5 2xl:w-2/5",
            minWidth: "min-w-[85%] md:min-w-[70%] lg:min-w-[50%] 2xl:min-w-[30%]",
            maxWidth: "max-w-[85%] md:max-w-[70%] lg:max-w-[50%] 2xl:max-w-[30%]",
          },
          lg: {
            width: "w-full md:w-5/6 lg:w-3/4 2xl:w-3/5",
            minWidth: "min-w-[90%] md:min-w-[83.333333%] lg:min-w-[75%] 2xl:min-w-[60%]",
            maxWidth: "max-w-[90%] md:max-w-[83.333333%] lg:max-w-[75%] 2xl:max-w-[60%]",
          },
          xl: {
            width: "w-full md:w-5/6 2xl:w-3/4",
            minWidth: "min-w-[95%] md:min-w-[83.333333%] 2xl:min-w-[75%]",
            maxWidth: "max-w-[95%] md:max-w-[83.333333%] 2xl:max-w-[75%]",
          },
          xxl: {
            display: "flex",
            flexDirection: "flex-col",
            width: "w-screen",
            minWidth: "min-w-[100vw]",
            maxWidth: "max-w-[100vw]",
            height: "h-screen",
            minHeight: "min-h-[100vh]",
            maxHeight: "max-h-[100vh]",
            m: "m-0",
            borderRadius: "rounded-none",
          },
        },
      },
    },
  };

  const [loading] = useState(false);

  return (
    <CustomThemeProvider>
      <ThemeProvider value={theme}>
        <div className="font-montserrat font-medium bg-white dark:bg-[#2A2A2A] text-gray-900 dark:text-dark-text transition-colors duration-300">
          {/* {window.location.pathname == "/" ? null : <Navbar />} */}
          <Header />
          <ScrollToTop />

          {loading ? (
            <div className="flex justify-center items-center  h-[80vh] ">
              <Spinner className="h-12 w-12" color="blue" />
            </div>
          ) : (
            <>
              <Routes>              <Route path="/" element={<Homepage />} />
                <Route path="/anasayfa" element={<Homepage />} />
                <Route path="/hakkimizda" element={<About />} />
                <Route path="/calismalarimiz/urunler" element={<OurWorks />} />
                <Route path="/calismalarimiz/makine-parkuru" element={<Machines />} />
                <Route path="/sertifikalar" element={<Certificates />} />
                <Route path="/kariyer" element={<Career />} />
                <Route path="/staj" element={<Career />} />
                <Route path="/iletisim" element={<ContactUs />} />
                <Route path="/upload-model" element={<UploadModel />} />
                <Route path="*" element={<Homepage />} />
              </Routes>
              <Footer />
            </>
          )}
        </div>
      </ThemeProvider>
    </CustomThemeProvider>
  );
}

export default App;