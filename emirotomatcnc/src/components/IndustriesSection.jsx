import { useTranslation } from "react-i18next";
import { 
  FaCar, FaMedkit, FaLightbulb, FaFan, FaMicrochip, 
  FaCogs, FaBolt, FaHome, FaBicycle, FaTractor, 
  FaShip, FaBoxOpen, FaTrain, FaOilCan, FaTshirt, 
  FaMicrophone, FaCouch, FaThLarge 
} from "react-icons/fa";
import { motion } from "framer-motion";

function IndustriesSection() {
  const { t } = useTranslation();

  const industries = [
    { icon: FaCar, title: t("industries.automotive") },
    { icon: FaMedkit, title: t("industries.medical") },
    { icon: FaLightbulb, title: t("industries.lighting") },
    { icon: FaFan, title: t("industries.hvac") },
    { icon: FaMicrochip, title: t("industries.electronics") },
    { icon: FaCogs, title: t("industries.industrial_automation") },
    { icon: FaBolt, title: t("industries.energy") },
    { icon: FaHome, title: t("industries.home_appliances") },
    { icon: FaBicycle, title: t("industries.micromobility") },
    { icon: FaTractor, title: t("industries.agriculture") },
    { icon: FaShip, title: t("industries.maritime") },
    { icon: FaBoxOpen, title: t("industries.food_packaging") },
    { icon: FaTrain, title: t("industries.railway") },
    { icon: FaOilCan, title: t("industries.petrochemical") },
    { icon: FaTshirt, title: t("industries.textile") },
    { icon: FaMicrophone, title: t("industries.audio_stage") },
    { icon: FaCouch, title: t("industries.smart_furniture") },
    { icon: FaThLarge, title: t("industries.modular_shelving") },
  ];

  return (
    <section className="py-16 bg-surface-muted">
      <div className="container mx-auto px-4 max-w-screen-xl">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900"
        >
          {t("industries.title")}
        </motion.h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {industries.map((industry, index) => {
            const IconComponent = industry.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.4, delay: index * 0.03, ease: "easeOut" },
                }}
                viewport={{ once: true }}
                className="industry-card group bg-white shadow-sm hover:shadow-md p-4 rounded-xl border border-gray-100 flex flex-col items-center justify-center transition-all duration-300 min-h-[140px]"
              >
                <IconComponent className="text-3xl md:text-4xl text-gray-400 mb-3 group-hover:text-primary-blue group-hover:scale-110 transition-all duration-300" />
                <h3 className="text-xs md:text-sm font-semibold text-center text-gray-700 group-hover:text-primary-blue transition-colors duration-300">
                  {industry.title}
                </h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default IndustriesSection;

