import { useState } from "react";
import PropTypes from "prop-types";
import { Dialog, DialogBody } from "@material-tailwind/react";
import { motion } from "framer-motion";

function WorkCard(props) {
  const [open, setOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  const handleOpen = (e) => {
    if (e.target) {
      setSelectedImg(e.target.currentSrc);
    }
    setOpen((cur) => !cur);
  };

  return (
    <>
      <section className="h-full w-full flex-col flex items-center justify-center">
        <motion.div layout className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full">
          {props.data.map((item, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="card-elevated cursor-pointer rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md border border-gray-100"
              onClick={(e) => handleOpen(e)}
              key={item.id !== undefined ? item.id : index}
            >
              <img
                className="transition-transform duration-500 hover:scale-105 h-40 md:h-56 w-full object-cover object-center gallery-image"
                src={item.image}
                alt={`product-${index}`}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <Dialog
        className="flex items-center justify-center transition-all duration-500 dialog-surface"
        size="md"
        open={open}
        handler={handleOpen}
      >
        <DialogBody className="p-1 md:p-2 bg-white">
          <div className="relative w-full h-full rounded-lg overflow-hidden">
            <img
              alt="nature"
              className="rounded-lg object-contain max-h-[80vh] mx-auto shadow-lg"
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
