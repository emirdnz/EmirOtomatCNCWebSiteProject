import { useEffect, useState } from "react";
import { Typography, Dialog, DialogBody } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";
import { Link } from "react-router-dom";
import "../styles/darkModeImages.css";

import pirinc from "../assets/products/pirinc.png";
import otomat from "../assets/products/otomat.png";
import tibbi from "../assets/products/tibbi.png";
import aluminyum from "../assets/products/aluminyum.png";
import paslanmaz from "../assets/products/paslanmaz.png";
import yuksekKarbon from "../assets/products/yuksek-karbonlu-celik.webp";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

function OurWorksSection() {
  const [autoplay, setAutoplay] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [slides, setSlides] = useState(window.innerWidth >= 1000 ? 2.5 : 1.5);
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  const [works] = useState([
    {
      img: pirinc,
      title: t("ourWorksSection.work1.title"),
      desc: t("ourWorksSection.work1.desc"),
    },
    {
      img: otomat,
      title: t("ourWorksSection.work2.title"),
      desc: t("ourWorksSection.work2.desc"),
    },
    {
      img: tibbi,
      title: t("ourWorksSection.work3.title"),
      desc: t("ourWorksSection.work3.desc"),
    },
    {
      img: aluminyum,
      title: t("ourWorksSection.work4.title"),
      desc: t("ourWorksSection.work4.desc"),
    },
    {
      img: paslanmaz,
      title: t("ourWorksSection.work5.title"),
      desc: t("ourWorksSection.work5.desc"),
    },
    {
      img: yuksekKarbon,
      title: t("ourWorksSection.work6.title"),
      desc: t("ourWorksSection.work6.desc"),
    },
  ]);

  useEffect(() => {
    const handleResize = () => {
      setSlides(window.innerWidth >= 1000 ? 2.5 : 1.5);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setAutoplay(!open);
  }, [open]);

  const handleOpen = (e) => {
    if (e.target) {
      setSelectedImg(e.target.currentSrc);
    }
    setOpen((cur) => !cur);
  };

  return (
    <section className="h-full md:h-[38rem] w-full flex flex-col">
      {/* Başlık Bölümü */}
      <div className="flex justify-center items-center h-1/4 pt-4 md:py-6 md:mt-6 bg-blue-gray-50 dark:bg-[#2A2A2A] w-full !leading-8">
        <Typography
          variant="h1"
          color="gray"
          className="text-2xl md:text-3xl lg:text-4xl font-montserrat text-center font-light dark:text-gray-300"
        >
          <span className="font-semibold text-primary-blue dark:text-gray-200">
            {t("ourWorksSection.title")}
          </span>
        </Typography>
      </div>

      {/* İçerik Bölümü */}
      <section className="h-3/4 flex flex-col md:flex-row bg-blue-gray-50 dark:bg-[#2A2A2A] px-4 md:px-8">
        {/* Sol Container (Yazı Bölümü) */}
        <div className="w-full md:w-1/2 flex flex-col items-end text-end pr-4 mt-24">
          <Typography
            variant="h6"
            className="text-xl md:text-2xl max-w-lg font-montserrat leading-relaxed dark:text-gray-300"
          >
            {t("ourWorksSection.description")}
          </Typography>
          
          {/* Daha fazlası için bağlantısı */}
          <div className="mt-6">
            <Link
              to="/calismalarimiz/urunler"
              className="text-primary-blue hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors duration-300"
            >
              {t("ourWorksSection.viewMore") || "Daha fazlası için →"}
            </Link>
          </div>
        </div>

        {/* Sağ Container (Slider Bölümü) */}
        <div className="w-full md:w-1/2 h-full flex justify-center items-center">
          <Swiper
            autoplay={{
              delay: open ? 1000000 : 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={slides}
            className="w-full h-full p-4 cursor-grab"
          >
            {works.map((work, i) => (
              <SwiperSlide
                className="bg-white dark:bg-[#333333] h-full rounded-md shadow-md"
                key={i}
              >
                <img
                  className={`h-3/4 w-full object-cover rounded-t-md dark-mode-image ${
                    isDarkMode 
                      ? "opacity-90 contrast-[1.02] brightness-[0.95] border-b border-gray-700/30 dark:bg-gradient-to-b dark:from-gray-800/20 dark:to-gray-700/10" 
                      : ""
                  }`}
                  src={work.img}
                  onClick={(e) => handleOpen(e)}
                  alt={work.desc}
                />
                <div className="p-2 text-black dark:text-gray-200 text-center font-semibold text-sm md:text-base">
                  {work.title}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Dialog Bölümü */}
      <Dialog
        className="flex items-center justify-center duration-700 dark:bg-[#2A2A2A]"
        open={open}
        handler={handleOpen}
      >
        <DialogBody className="max-w-xl max-h-xl dark:bg-[#333333] p-1 md:p-2">
          <div className="relative w-full h-full bg-white/5 dark:bg-black/5 rounded-lg overflow-hidden">
            <img
              alt="Selected"
              className={`rounded-lg object-contain object-center max-h-[80vh] mx-auto dark-mode-image dark-mode-dialog-image ${
                isDarkMode 
                  ? "opacity-90 contrast-[1.02] brightness-[0.95] shadow-xl filter drop-shadow-md border border-gray-700/50 p-2 dark:bg-gradient-to-b dark:from-gray-800/40 dark:to-gray-700/30 white-bg-image" 
                  : ""
              }`}
              src={selectedImg}
            />
            <button 
              onClick={handleOpen} 
              className="absolute top-2 right-2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-700 transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </DialogBody>
      </Dialog>
    </section>
  );
}

export default OurWorksSection;
