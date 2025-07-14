import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation  } from "react-i18next";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

function VisionMission() {
  const [select, setSelect] = useState("vision");
  const [check, setCheck] = useState(true);

  useEffect(() => {
    if (check) {
      const timer = setTimeout(() => {
        setSelect(select === "vision" ? "mission" : "vision");
        setCheck(true);
      }, 20000);
      return () => clearTimeout(timer);
    }
    setCheck(false);
  }, [select,check]);

  const { t } = useTranslation();

  return (
    <>
      <section className="h-[450px] md:h-[400px] flex-col flex items-center justify-start w-full bg-blue-gray-50 dark:bg-gradient-to-b dark:from-[#2A2A2A] dark:to-[#252525] border-t border-b dark:border-gray-700 relative z-0">
        {/* Decorative elements for visual interest */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-5 left-1/4 w-16 h-16 rounded-full bg-blue-100 opacity-10 dark:bg-blue-400 dark:opacity-5"></div>
          <div className="absolute bottom-10 right-1/4 w-24 h-24 rounded-full bg-blue-100 opacity-10 dark:bg-blue-400 dark:opacity-5"></div>
        </div>

        <Card className="h-full overflow-hidden flex flex-col pt-5 w-full shadow-transparent rounded-none bg-blue-gray-50 dark:bg-transparent z-0">
          <div className="flex justify-center mb-2">
            <h1 className="text-center font-bold text-pretty relative z-0 mb-5">
                <motion.span
                initial={{ opacity: 0 }}
                whileInView={{
                  opacity: 1,
                  transition: { duration: 1.4, ease: "easeInOut" },
                }}
                viewport={{ once: true }}
                onMouseEnter={() => setSelect("vision")}
                onClick={() => setSelect("vision")}
                className={`text-primary-blue text-5xl cursor-pointer underline transition-colors duration-[1500ms] drop-shadow-md ${
                  select == "vision"
                    ? "decoration-primary-blue font-bold dark:text-blue-400"
                    : "decoration-blue-gray-50 dark:decoration-transparent opacity-80"
                }`}
              >
                {t("visionmission.vision")}
              </motion.span>{" "}
              <span className="text-gray-700 dark:text-gray-300 text-3xl mx-2">{t("visionmission.and")}</span>{" "}
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{
                  opacity: 1,
                  transition: { duration: 1.4, ease: "easeInOut" },
                }}
                viewport={{ once: true }}
                onMouseEnter={() => setSelect("mission")}
                onClick={() => setSelect("mission")}
                className={`text-primary-blue text-5xl cursor-pointer underline transition-colors duration-[1500ms] drop-shadow-md ${
                  select == "mission"
                    ? "decoration-primary-blue font-bold dark:text-blue-400"
                    : "decoration-blue-gray-50 dark:decoration-transparent opacity-80"
                }`}
              >
                {t("visionmission.mission")}
              </motion.span>
            </h1>
          </div>
          <div className="flex flex-col items-center w-full">
            <div
              className="text-center md:hidden font-montserrat font-bold max-w-lg text-pretty mb-2 text-4xl"
            >
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{
                  opacity: 1,
                  transition: { duration: 1.4, ease: "easeInOut" },
                }}
                viewport={{ once: true }}
                onMouseEnter={() => setSelect("vision")}
                onClick={() => setSelect("vision")}
                className={`text-primary-blue text-3xl cursor-pointer underline transition-colors duration-[1500ms] ${
                  select == "vision"
                    ? "decoration-primary-blue font-bold dark:text-blue-400"
                    : "decoration-blue-gray-50 dark:decoration-transparent opacity-80"
                }`}
              >
                {t("visionmission.vision")}
              </motion.span>{" "}
              <span className="text-gray-700 dark:text-gray-300">{t("visionmission.and")}</span>{" "}
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{
                  opacity: 1,
                  transition: { duration: 2.4, ease: "easeInOut" },
                }}
                viewport={{ once: true }}
                onMouseEnter={() => setSelect("mission")}
                onClick={() => setSelect("mission")}
                className={`text-primary-blue text-3xl cursor-pointer underline transition-colors duration-[1500ms] ${
                  select == "mission"
                    ? "decoration-primary-blue font-bold dark:text-blue-400"
                    : "decoration-blue-gray-50 dark:decoration-transparent"
                }`}
              >
                {t("visionmission.mission")}
              </motion.span>
            </div>
            <div className="w-full flex flex-col items-center justify-center mt-5 md:mt-4 h-[300px] md:h-[250px] z-0">
              <div
                className={`${
                  select == "vision" ? " block" : "hidden"
                } text-center md:text-left max-w-3xl mx-auto w-full px-6 z-0`}
              >
                <p className="text-gray-800 dark:text-gray-300 leading-relaxed text-base md:text-lg mb-5">{t("visionmission.visionDesc")}</p>
              </div>
              <div
                className={`${
                  select == "mission" ? " block" : "hidden"
                } text-center md:text-left max-w-3xl mx-auto w-full px-6 z-0`}
              >
                <p className="text-gray-800 dark:text-gray-300 leading-relaxed text-base md:text-lg mb-5">{t("visionmission.missionDesc")}</p>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </>
  );
}

export default VisionMission;
