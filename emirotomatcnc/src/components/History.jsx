import { useTranslation, Trans } from "react-i18next";
import { motion } from "framer-motion";

function History() {
  const { t, i18n } = useTranslation();

  const timelineData = [
    { year: "1986", key: "history.1986" },
    { year: "2004", key: "history.2004" },
    { year: "2013", key: "history.2013" },
    { year: "2014", key: "history.2014" },
    { year: "2018", key: "history.2018" },
    { year: "2021", key: "history.2021" },
    { year: "2024", key: "history.2024" },
  ];

  return (
    <div className="w-full max-w-screen-xl mx-auto py-20 px-4 md:px-8 bg-transparent relative">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-gray-900"
        >
          {i18n.language === "tr" ? "Tarihçemiz" : "Our History"}
        </motion.h2>
      </div>

      <div className="relative wrap overflow-hidden p-2 md:p-10 h-full">
        {/* Dikey Çizgi */}
        <div className="absolute h-full border-l-4 border-gray-200 top-0 left-[2.25rem] md:left-1/2 transform md:-translate-x-1/2 rounded-full"></div>
        
        {timelineData.map((item, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div key={index} className={`relative mb-12 flex justify-between items-center w-full flex-col md:flex-row ${isLeft ? 'md:flex-row-reverse' : ''}`}>
              <div className="hidden md:block order-1 w-5/12"></div>
              
              {/* Dairesel Yıl Rozeti */}
              <motion.div 
                initial={{ scale: 0, rotate: -90 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                viewport={{ once: true, margin: "-100px" }}
                className="z-20 flex items-center justify-center order-1 bg-white shadow-card-hover w-16 h-16 md:w-24 md:h-24 rounded-full border-[6px] border-primary-blue absolute left-1 md:relative md:left-auto md:top-auto top-2 md:top-0"
              >
                <h1 className="font-bold text-base md:text-xl text-primary-blue">{item.year}</h1>
              </motion.div>
              
              {/* İçerik Kartı */}
              <motion.div 
                initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, margin: "-50px" }}
                className="order-1 card-elevated w-[calc(100%-4.5rem)] ml-auto md:w-5/12 md:ml-0 p-6 bg-white"
              >
                <div className="flex flex-col gap-2 relative">
                  <h3 className="font-bold text-primary-blue text-xl md:hidden mb-1">{item.year}</h3>
                  <p className="text-sm md:text-base leading-relaxed text-gray-700 font-medium">
                    <Trans i18nKey={item.key} />
                  </p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default History;
