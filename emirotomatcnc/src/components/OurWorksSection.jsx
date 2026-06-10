import { useEffect, useState } from "react";
import { Typography, Dialog, DialogBody } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import pirinc from "@/assets/products/pirinc.png";
import otomat from "@/assets/products/otomat.png";
import tibbi from "@/assets/products/tibbi.png";
import aluminyum from "@/assets/products/aluminyum.png";
import paslanmaz from "@/assets/products/paslanmaz.png";
import yuksekKarbon from "@/assets/products/yuksek-karbonlu-celik.webp";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

function OurWorksSection() {
  const [open, setOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [slides, setSlides] = useState(window.innerWidth >= 1000 ? 2.5 : 1.5);
  const { t } = useTranslation();

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

  const handleOpen = (e) => {
    if (e.target) {
      setSelectedImg(e.target.currentSrc);
    }
    setOpen((cur) => !cur);
  };

  return (
    <section className="h-full md:h-[38rem] w-full flex flex-col">
      <div className="flex justify-center items-center h-1/4 pt-4 md:py-6 md:mt-6 section-muted w-full !leading-8">
        <div className="flex flex-col items-center gap-2">
          <Typography
            variant="h1"
            color="gray"
            className="text-2xl md:text-3xl lg:text-4xl font-montserrat text-center font-semibold text-primary-blue"
          >
            {t("ourWorksSection.title")}
          </Typography>
          <span className="block w-12 h-1 bg-primary-blue rounded-full" />
        </div>
      </div>

      <section className="h-3/4 flex flex-col md:flex-row section-muted px-4 md:px-8">
        <div className="w-full md:w-1/2 flex flex-col items-end text-end pr-4 mt-24">
          <Typography
            variant="h6"
            className="text-xl md:text-2xl max-w-lg font-montserrat leading-relaxed text-gray-700"
          >
            {t("ourWorksSection.description")}
          </Typography>

          <div className="mt-6">
            <Link
              to="/calismalarimiz/urunler"
              className="inline-flex items-center gap-1 text-primary-blue hover:text-primary-blue-hover font-semibold transition-colors duration-200"
            >
              {t("ourWorksSection.viewMore") || "Daha fazlası için"} →
            </Link>
          </div>
        </div>

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
              <SwiperSlide className="card-elevated h-full overflow-hidden" key={i}>
                <img
                  className="h-3/4 w-full object-cover rounded-t-xl gallery-image"
                  src={work.img}
                  onClick={(e) => handleOpen(e)}
                  alt={work.desc}
                />
                <div className="p-3 text-gray-900 text-center font-semibold text-sm md:text-base border-t border-border-soft">
                  {work.title}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <Dialog
        className="flex items-center justify-center duration-700 dialog-surface"
        open={open}
        handler={handleOpen}
      >
        <DialogBody className="max-w-xl max-h-xl p-1 md:p-2 bg-white">
          <div className="relative w-full h-full rounded-lg overflow-hidden">
            <img
              alt="Selected"
              className="rounded-lg object-contain object-center max-h-[80vh] mx-auto shadow-lg"
              src={selectedImg}
            />
            <button onClick={handleOpen} className="dialog-close-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </DialogBody>
      </Dialog>
    </section>
  );
}

export default OurWorksSection;
