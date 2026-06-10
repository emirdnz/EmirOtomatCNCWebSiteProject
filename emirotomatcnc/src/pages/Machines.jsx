import { useState } from "react";
import { useTranslation } from "react-i18next";
import cover from "@/assets/2007.jpg";
import { Dialog, DialogBody } from "@material-tailwind/react";

import photo1 from "@/assets/machines/1.png";
import photo2 from "@/assets/machines/2.png";
import photo3 from "@/assets/machines/3.png";
import photo4 from "@/assets/machines/4.png";
import photo5 from "@/assets/machines/5.png";
import photo6 from "@/assets/machines/6.png";

import TitleComponent from "@/components/common/TitleComponent";

function Machines() {
  const { t } = useTranslation();

  const data = [
    { imgelink: photo1 },
    { imgelink: photo2 },
    { imgelink: photo3 },
    { imgelink: photo4 },
    { imgelink: photo5 },
    { imgelink: photo6 },
  ];

  const [active, setActive] = useState(photo1);
  const [open, setOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  const handleOpen = (e) => {
    if (e.target) {
      setSelectedImg(e.target.currentSrc);
    }
    setOpen((cur) => !cur);
  };

  return (
    <section className="page-section">
      <TitleComponent title={t("machines.title")} cover={cover} />
      <div className="grid gap-4 max-w-4xl mt-10">
        <div onClick={(e) => handleOpen(e)}>
          <img
            className="h-auto w-full max-w-full rounded-lg object-contain object-center md:h-[480px] gallery-image"
            src={active}
            alt=""
          />
        </div>
        <div className="grid grid-cols-6 gap-2 px-2">
          {data.map(({ imgelink }, index) => (
            <div className="flex justify-center" key={index}>
              <img
                onClick={() => setActive(imgelink)}
                src={imgelink}
                className="h-20 w-32 gallery-thumb"
                alt="gallery-image"
              />
            </div>
          ))}
        </div>
      </div>
      <Dialog size="xl" open={open} handler={handleOpen} className="dialog-surface">
        <DialogBody className="p-1 md:p-2 bg-white">
          <div className="relative w-full h-full rounded-lg overflow-hidden">
            <img
              alt={t("machines.dialogAlt")}
              className="max-h-[80vh] w-full rounded-lg object-contain object-center mx-auto shadow-lg"
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
    </section>
  );
}

export default Machines;
