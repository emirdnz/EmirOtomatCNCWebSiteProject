import cover from "@/assets/2004.jpg";

import AboutContainer from "@/layouts/AboutContainer";

function About() {
  return (
    <section className="flex items-center justify-center flex-col mt-10 bg-white text-gray-900 relative">
      {/* components */}
      <AboutContainer cover={cover} />
      {/* components */}
    </section>
  );
}

export default About;
