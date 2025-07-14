import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";
import "../styles/darkModeImages.css";

import cover from "../assets/2007.jpg";
import { Dialog, DialogBody } from "@material-tailwind/react";

import photo1 from "../assets/machines/1.png";
import photo2 from "../assets/machines/2.png";
import photo3 from "../assets/machines/3.png";
import photo4 from "../assets/machines/4.png";
import photo5 from "../assets/machines/5.png";
import photo6 from "../assets/machines/6.png";

import TitleComponent from "../components/TitleComponent";

function Machines() {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  const data = [
    {
      imgelink: photo1,
    },
    {
      imgelink: photo2,
    },
    {
      imgelink: photo3,
    },
    {
      imgelink: photo4,
    },
    {
      imgelink: photo5,
    },
    {
      imgelink: photo6,
    },
  ];

  const [active, setActive] = useState(photo1);
  const [open, setOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  const handleOpen = (e) => {
    if (e.target) {
      setSelectedImg(e.target.currentSrc);
    }

    setOpen((cur) => !cur);
  };

  return (
    <section className="flex items-center justify-center flex-col my-10 bg-white dark:bg-[#2A2A2A]">
      {/* title */}
      <TitleComponent title={t('machines.title')} cover={cover} />
      {/* title */}
      <div className="grid gap-4 max-w-4xl mt-10">
        <div onClick={(e) => handleOpen(e)}>
          <img
            className={`h-auto w-full max-w-full rounded-lg object-contain object-center md:h-[480px] dark-mode-image ${
              isDarkMode 
                ? 'opacity-90 contrast-[1.02] brightness-[0.95] bg-gray-800/10 p-4 border border-gray-700/30 dark:bg-gradient-to-b dark:from-gray-800/30 dark:to-gray-700/20' 
                : ''
            }`}
            src={active}
            alt=""
          />
        </div>
        <div className="grid grid-cols-6 gap-2 px-2">
          {data.map(({ imgelink }, index) => (
            <div className="flex justify-center " key={index}>
              <img
                onClick={() => setActive(imgelink)}
                src={imgelink}
                className={`h-20 w-32 cursor-pointer rounded-lg object-contain object-center border-2 hover:border-gray-400 dark:hover:border-gray-500 dark-mode-image ${
                  isDarkMode 
                    ? 'opacity-90 contrast-[1.02] brightness-[0.95] bg-gray-800/5 dark:bg-gradient-to-b dark:from-gray-800/20 dark:to-gray-700/10' 
                    : ''
                }`}
                alt="gallery-image"
              />
            </div>
          ))}
        </div>
      </div>
      <Dialog size="xl" open={open} handler={handleOpen} className="dark:bg-[#2A2A2A]">
        <DialogBody className="p-1 md:p-2 dark:bg-[#333333]">
          <div className="relative w-full h-full bg-white/5 dark:bg-black/5 rounded-lg overflow-hidden">
            <img
              alt={t('machines.dialogAlt')}
              className={`max-h-[80vh] w-full rounded-lg object-contain object-center mx-auto dark-mode-image dark-mode-dialog-image ${
                isDarkMode 
                  ? 'opacity-90 contrast-[1.02] brightness-[0.95] filter drop-shadow-md border border-gray-700/50 p-2 dark:bg-gradient-to-b dark:from-gray-800/40 dark:to-gray-700/30 white-bg-image' 
                  : ''
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

export default Machines;
