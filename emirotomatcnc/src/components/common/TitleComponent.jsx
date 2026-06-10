import PropTypes from "prop-types";
import { motion } from "framer-motion";

function TitleComponent({ title, cover }) {
  return (
    <div className="w-full">
      <div className="bg-white border-b border-border-soft py-6 px-4">
        <h1 className="text-2xl md:text-3xl font-bold w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeOut", duration: 0.6 }}
            className="w-full flex flex-col items-center gap-2"
          >
            <span className="text-gray-900">{title}</span>
            <span className="block w-16 h-1 bg-primary-blue rounded-full" />
          </motion.div>
        </h1>
      </div>
      <div className="h-48 md:h-80 lg:h-96 w-full overflow-hidden">
        <motion.img
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="object-cover h-full w-full"
          loading="lazy"
          src={cover}
          alt={title}
        />
      </div>
    </div>
  );
}

TitleComponent.propTypes = {
  title: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
};

export default TitleComponent;

