import { useState } from "react";
import PropTypes from 'prop-types';
import { useTheme } from "../contexts/ThemeContext";
import "../styles/darkModeImages.css";

import {
  Dialog,
  DialogBody,
} from "@material-tailwind/react";

import { motion } from "framer-motion";

function WorkCard(props) {
  const [open, setOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const { isDarkMode } = useTheme();

  const handleOpen = (e) => {
    if (e.target) {
      setSelectedImg(e.target.currentSrc);
    }

    setOpen((cur) => !cur);
  };

  return (
    <>
      <section className="h-full md:max-w-screen-xl flex-col flex items-center justify-center w-full">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {props.data.map(({ image }, index) => (
            <motion.div
              initial={{ x: -50 , opacity: 0 }}
              whileInView={{
                x: 0,
                opacity: 1,
                transition: {
                  duration:
                    index % 4 == 0
                      ? 0.55
                      : index % 4 == 1
                      ? 0.50
                      : index % 4 == 2
                      ? 0.45
                      : 0.4,
                  ease: "easeInOut",
                },
              }}
              viewport={{ once: true }}
              className="hover:border-gray-500 dark:hover:border-gray-400 border-2 dark:border-gray-700 rounded-lg transition-all duration-500 cursor-pointer dark:bg-[#333333]"
              onClick={(e) => handleOpen(e)}
              key={index}
            >
              <img
                className={`transition-color duration-1000 h-80 w-full max-w-full rounded-lg p-8 object-scale-down object-center dark-mode-image ${
                  isDarkMode 
                    ? 'opacity-90 contrast-[1.02] brightness-[0.95] shadow-md filter drop-shadow-sm hover:brightness-[1.05] hover:scale-[1.02] border border-gray-700/30 dark:bg-gradient-to-b dark:from-gray-800/30 dark:to-gray-700/20 white-bg-image' 
                    : 'hover:shadow-lg hover:scale-[1.02]'
                } transition-all duration-300`}
                src={image}
                alt="gallery-photo"
              />
            </motion.div>
          ))}
        </div>
      </section>

      <Dialog
        className="flex items-center justify-center transition-all duration-500 dark:bg-[#2A2A2A]"
        size="md"
        open={open}
        handler={handleOpen}
      >
        <DialogBody className="dark:bg-[#333333] p-1 md:p-2">
          <div className="relative w-full h-full bg-white/5 dark:bg-black/5 rounded-lg overflow-hidden">
            <img
              alt="nature"
              className={`rounded-lg object-contain max-h-[80vh] mx-auto dark-mode-image dark-mode-dialog-image ${
                isDarkMode 
                  ? 'opacity-90 contrast-[1.02] brightness-[0.95] shadow-xl filter drop-shadow-md border border-gray-700/50 p-2 dark:bg-gradient-to-b dark:from-gray-800/40 dark:to-gray-700/30 white-bg-image' 
                  : 'shadow-lg'
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
    </>
  );
}

WorkCard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};


export default WorkCard;
