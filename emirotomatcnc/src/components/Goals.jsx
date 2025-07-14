import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";
import { Typography } from "@material-tailwind/react";

function Goals() {
  const { t } = useTranslation();

  return (
    <>
      <section className="h-full py-10 md:h-[26rem] flex flex-col items-center justify-center bg-white dark:bg-[#2A2A2A] z-0 relative">
        <div className="h-full w-full md:max-w-screen-xl md:flex flex-col justify-center items-center gap-3">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{
              opacity: 1,
              transition: { duration: 1, ease: "easeInOut" },
              y: 0,
            }}
            viewport={{ once: true }}
            className="flex justify-center items-center mb-4"
          >
            <Typography
              variant="h1"
              color="gray"
              className="mb-2 text-2xl md:text-3xl lg:text-4xl font-montserrat text-center font-semibold text-primary-blue"
            >
              {t('goals.title')}
            </Typography>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-row md:item-center md:h-full md:border-y-2 dark:border-gray-600 rounded-lg overflow-hidden shadow-md">
            <div className="md:flex group md:flex-col p-8 md:p-8 sm:m-0 border-2 md:border-r-2 md:border-l-0 md:border-y-0 md:w-full dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300">
              <div className="mt-2">
                <h3>
                  <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    whileInView={{
                      opacity: 1,
                      transition: { duration: 1.2, ease: "easeInOut" },
                      y: 0,
                    }}
                    viewport={{ once: true }}
                  >
                    <div className="leading-8 text-lg font-semibold mb-2 group-hover:text-primary-blue group-hover:text-lg group-hover:font-extrabold transition-all ease-in-out duration-500 text-gray-900 dark:text-dark-text">
                      {t('goals.pricing.title')}
                    </div>
                    <div className="text-sm md:text-base group-hover:font-semibold transition-all ease-in-out duration-500 text-gray-700 dark:text-gray-300">
                      {t('goals.pricing.description')}
                    </div>
                  </motion.div>
                </h3>
              </div>
            </div>
            <div className="md:flex group md:flex-col p-8 md:p-8 sm:m-0 border-2 md:border-r-2 md:border-l-0 md:border-y-0 md:w-full dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300">
              <div className="mt-2">
                <h3>
                  <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    whileInView={{
                      opacity: 1,
                      transition: { duration: 1.5, ease: "easeInOut" },
                      y: 0,
                    }}
                    viewport={{ once: true }}
                  >
                    <div className="leading-8 text-lg font-semibold mb-2 group-hover:text-primary-blue group-hover:text-lg group-hover:font-extrabold transition-all ease-in-out duration-500 text-gray-900 dark:text-dark-text">
                      {t('goals.quality.title')}
                    </div>
                    <div className="text-sm md:text-base group-hover:font-semibold transition-all ease-in-out duration-500 text-gray-700 dark:text-gray-300">
                      {t('goals.quality.description')}
                    </div>
                  </motion.div>
                </h3>
              </div>
            </div>
            <div className="md:flex group md:flex-col p-8 md:p-8 sm:m-0 border-2 md:border-x-0 md:border-y-0 md:w-full dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300">
              <div className="mt-2">
                <h3>
                  <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    whileInView={{
                      opacity: 1,
                      transition: { duration: 1.8, ease: "easeInOut" },
                      y: 0,
                    }}
                    viewport={{ once: true }}
                  >
                    <div className="leading-8 text-lg font-semibold mb-2 group-hover:text-primary-blue group-hover:text-lg group-hover:font-extrabold transition-all ease-in-out duration-500 text-gray-900 dark:text-dark-text">
                      {t('goals.satisfaction.title')}
                    </div>
                    <div className="text-sm md:text-base group-hover:font-semibold transition-all ease-in-out duration-500 text-gray-700 dark:text-gray-300">
                      {t('goals.satisfaction.description')}
                    </div>
                  </motion.div>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Goals;
