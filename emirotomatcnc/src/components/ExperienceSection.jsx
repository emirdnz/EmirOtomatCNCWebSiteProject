import { Typography } from "@material-tailwind/react";
import { useTranslation, Trans } from "react-i18next";
import { motion } from "framer-motion";
import {
  FaRegClock,
  FaIndustry,
  FaCubes,
  FaMicroscope,
} from "react-icons/fa";

function ExperienceSection() {
  const { t } = useTranslation();

  const items = [
    { icon: FaRegClock, key: "item1" },
    { icon: FaIndustry, key: "item2" },
    { icon: FaCubes, key: "item3" },
    { icon: FaMicroscope, key: "item4" },
  ];

  return (
    <>
      <section className="h-full md:h-[30rem] flex flex-col items-center justify-center my-16 md:my-0 page-surface">
        <div className="h-full w-full md:max-w-screen-xl md:flex flex-col justify-center item-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }}
            viewport={{ once: true }}
            className="flex justify-center items-center h-full mb-4"
          >
            <Typography
              variant="h4"
              color="gray"
              className="mb-4 text-2xl md:text-3xl lg:text-4xl font-montserrat text-end font-light text-gray-700"
            >
              {t("experienceSection.title")} <br />{" "}
              <span className="font-semibold text-primary-blue">
                {t("experienceSection.subtitle")}
              </span>
            </Typography>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-row md:items-stretch md:h-full md:border-y-2 border-border-soft">
            {items.map(({ icon: Icon, key }, idx) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: idx * 0.1, ease: "easeOut" },
                }}
                viewport={{ once: true }}
                className={`group md:flex md:flex-col p-10 py-14 mx-4 sm:m-0 border-2 ${
                  idx < items.length - 1
                    ? "md:border-r-2 md:border-l-0 md:border-y-0"
                    : "md:border-none"
                } md:w-full border-border-soft hover:bg-primary-blue-light transition-colors duration-300 cursor-default`}
              >
                <div className="mb-4">
                  <Icon
                    className="text-4xl text-gray-400 group-hover:text-primary-blue transition-colors duration-500"
                  />
                </div>
                <div className="mt-2">
                  <h3 className="text-gray-900 font-semibold leading-relaxed group-hover:text-primary-blue transition-colors duration-300">
                    <Trans i18nKey={`experienceSection.${key}`} />
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default ExperienceSection;
