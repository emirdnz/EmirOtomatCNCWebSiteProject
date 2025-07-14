import cover from "../../assets/2004.jpg";

import AboutContainer from "../../container/AboutContainer";

function About() {
  return (
    <section className="flex items-center justify-center flex-col mt-10 bg-white dark:bg-[#2A2A2A] text-gray-900 dark:text-dark-text relative">
      {/* components */}
      <AboutContainer cover={cover} />
      {/* components */}
    </section>
  );
}

export default About;
