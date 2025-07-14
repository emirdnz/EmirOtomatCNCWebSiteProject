import { useTranslation } from "react-i18next";
import { FaRocket, FaCar, FaShieldAlt, FaMobileAlt, FaIndustry, FaMicrochip, FaMedkit, FaBolt, FaRobot } from "react-icons/fa";

function IndustriesSection() {
  const { t } = useTranslation();

  const industries = [
    {
      icon: FaRocket,
      title: t("industries.aerospace"),
    },
    {
      icon: FaCar,
      title: t("industries.automotive"),
    },
    {
      icon: FaShieldAlt,
      title: t("industries.defense"),
    },
    {
      icon: FaMobileAlt,
      title: t("industries.consumerProducts"),
    },
    {
      icon: FaIndustry,
      title: t("industries.industrial"),
    },
    {
      icon: FaMicrochip,
      title: t("industries.electronics"),
    },
    {
      icon: FaMedkit,
      title: t("industries.medical"),
    },
    {
      icon: FaBolt,
      title: t("industries.energy"),
    },
    {
      icon: FaRobot,
      title: t("industries.robotics"),
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-[#2A2A2A]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-dark-text">
          {t("industries.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {industries.map((industry, index) => {
            const IconComponent = industry.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center p-6 bg-white dark:bg-[#333333] rounded-lg shadow-md hover:shadow-lg transition-shadow border dark:border-gray-700"
              >
                <IconComponent className="text-4xl mb-4 text-blue-500 dark:text-blue-400" />
                <h3 className="text-lg font-semibold text-center text-gray-900 dark:text-dark-text">{industry.title}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default IndustriesSection;
