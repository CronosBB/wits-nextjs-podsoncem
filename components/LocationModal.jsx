import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { wrap } from "popmotion";

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      // scale: 0.75,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    // scale: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      // scale: 0.75,
    };
  },
};

const swipeConfidenceThreshold = 30000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export default function LocationModalNew({
  locationIndex,
  locations,
  isOpen,
  onClose,
}) {
  const [[paginationIndex, direction], setPaginationIndex] = useState([
    locationIndex,
    0,
  ]);

  useEffect(() => {
    setPaginationIndex([locationIndex, 0]);
  }, [locationIndex]);

  const shownLocationIndex = wrap(0, locations.length, paginationIndex);

  const paginate = (newDirection) => {
    setPaginationIndex([paginationIndex + newDirection, newDirection]);
  };

  // handle left&right arrow keys for switching between modals
  const keyHandler = ({ key }) => {
    if (key === "ArrowLeft" && shownLocationIndex !== 0) {
      paginate(-1);
    } else if (
      key === "ArrowRight" &&
      shownLocationIndex !== locations.length - 1
    ) {
      paginate(1);
    }
  };
  useEffect(() => {
    window.addEventListener("keyup", keyHandler);

    return () => {
      window.removeEventListener("keyup", keyHandler);
    };
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          as={motion.div}
          open={isOpen}
          onClose={onClose}
          className="fixed md:absolute left-0 top-0 h-screen w-full overflow-hidden"
          initial={{ scale: 0.75, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.75, opacity: 0 }}
          transition={{ duration: 0.12 }}
        >
          <Dialog.Overlay className="fixed inset-0 bg-beige bg-opacity-60 backdrop-blur flex items-center justify-center" />
          <AnimatePresence initial={false} custom={direction}>
            <div className="absolute left-0 bottom-0 right-0 md:top-1/2 md:left-1/2 w-full md:max-w-[588px] md:max-h-[572px] md:transform md:-translate-y-1/2 md:-translate-x-1/2">
              <motion.div
                className="bg-white z-10 w-full md:w-[588px] px-8 pt-14 pb-32 md:p-12 rounded-t-[18px] md:rounded-b-[18px] shadow-modal max-h-[94vh] overflow-y-auto overflow-x-hidden"
                key={paginationIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 600, damping: 50 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (
                    swipe < -swipeConfidenceThreshold &&
                    shownLocationIndex !== locations.length - 1
                  ) {
                    paginate(1);
                  } else if (
                    swipe > swipeConfidenceThreshold &&
                    shownLocationIndex !== 0
                  ) {
                    paginate(-1);
                  }
                }}
              >
                {shownLocationIndex < locations.length - 1 && (
                  <svg
                    width="32"
                    height="32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute -right-16 top-1/2 -mt-4 cursor-pointer hidden md:block"
                    onClick={() => paginate(1)}
                  >
                    <path
                      d="M8.586 27.386a2 2 0 102.828 2.828l-2.828-2.828zM22.8 16l1.414 1.414L25.628 16l-1.414-1.414L22.8 16zM11.414 1.786a2 2 0 10-2.828 2.828l2.828-2.828zm0 28.428l12.8-12.8-2.828-2.828-12.8 12.8 2.828 2.828zm12.8-15.628l-12.8-12.8-2.828 2.828 12.8 12.8 2.828-2.828z"
                      fill="#7C7C7C"
                    />
                  </svg>
                )}
                {shownLocationIndex > 0 && (
                  <svg
                    width="32"
                    height="32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute -left-16 top-1/2 -mt-4 cursor-pointer transform rotate-180 hidden md:block"
                    onClick={() => paginate(-1)}
                  >
                    <path
                      d="M8.586 27.386a2 2 0 102.828 2.828l-2.828-2.828zM22.8 16l1.414 1.414L25.628 16l-1.414-1.414L22.8 16zM11.414 1.786a2 2 0 10-2.828 2.828l2.828-2.828zm0 28.428l12.8-12.8-2.828-2.828-12.8 12.8 2.828 2.828zm12.8-15.628l-12.8-12.8-2.828 2.828 12.8 12.8 2.828-2.828z"
                      fill="#7C7C7C"
                    />
                  </svg>
                )}
                <svg
                  className="absolute right-6 top-6 cursor-pointer"
                  width="28"
                  height="28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={onClose}
                >
                  <circle cx="14" cy="14" r="14" fill="#C5C2BC" />
                  <path
                    d="M9.334 9.333l9.333 9.334M18.667 9.333l-9.333 9.334"
                    stroke="#F7F4EA"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <Dialog.Title className="mb-4 md:mb-7">
                  <span className="font-worksans font-bold text-3xl md:text-4xl">
                    {locations[shownLocationIndex].name}
                  </span>
                </Dialog.Title>
                <Dialog.Description>
                  <div className="flex items-center mb-7 md:mb-10">
                    <span className="text-xl md:text-2xl">🚘</span>
                    <span className="ml-2 text-gray-500 font-bold tetx-lg md:text-xl">
                      1h 8m
                    </span>
                    <span className="text-xl md:text-2xl ml-4 md:ml-5">☀️</span>
                    <span className="ml-2 text-gray-500 font-bold tetx-lg md:text-xl">
                      15℃
                    </span>
                  </div>
                  <p className="text-gray-500 md:pr-12 mb-12">
                    Trieste is the capital city of the Friuli Venezia Giulia
                    region in northeast Italy. A port city, it occupies a thin
                    strip of land between the Adriatic coast and Slovenia’s
                    border on the limestone-dominated Karst Plateau. Italian,
                    Austro-Hungarian and Slovenian influences are all evident in
                    its layout, which encompasses a medieval old city and a ...
                    More @ Wikipedia
                  </p>
                  <div className="mb-4">
                    <button className="bg-gray-800 hover:bg-gray-900 transition-colors duration-75 text-white w-full flex items-center justify-center py-6 px-2 rounded-[18px] font-worksans font-semibold">
                      <svg
                        width="29"
                        height="28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.696.001C6.823-.105.395 6.322.5 14.195.606 21.745 6.755 27.894 14.306 28c7.874.107 14.3-6.32 14.193-14.193C28.395 6.254 22.247.106 14.696.001zm6.199 8.564L15.36 21.118c-.323.704-1.4.47-1.4-.307v-6.003a.27.27 0 00-.268-.27H7.689c-.775 0-1.01-1.068-.307-1.39l12.554-5.542a.722.722 0 01.959.959z"
                          fill="#fff"
                        />
                      </svg>
                      <span className="text-xl ml-3">Show route</span>
                      <svg
                        width="7"
                        height="10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-3 mt-[2px]"
                      >
                        <path
                          d="M.793 8.293a1 1 0 001.414 1.414L.793 8.293zM5.5 5l.707.707L6.914 5l-.707-.707L5.5 5zM2.207.293A1 1 0 00.793 1.707L2.207.293zm0 9.414l4-4-1.414-1.414-4 4 1.414 1.414zm4-5.414l-4-4L.793 1.707l4 4 1.414-1.414z"
                          fill="#CBCBCB"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="md:flex justify-between gap-4">
                    <button className="bg-gray-200 hover:bg-gray-300 transition-colors duration-75 text-white w-full py-3 font-worksans font-semibold rounded-[18px] text-xl flex justify-center items-center mb-4 md:mb-0">
                      <svg
                        width="28"
                        height="28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="28" height="28" rx="8" fill="#fff" />
                        <path
                          d="M20.847 12.797c.09.478.138.978.138 1.499 0 4.076-2.729 6.975-6.85 6.975a7.133 7.133 0 01-6.592-9.866A7.133 7.133 0 0114.136 7c1.926 0 3.536.709 4.771 1.86l-2.011 2.011v-.005c-.749-.713-1.7-1.079-2.76-1.079-2.355 0-4.268 1.99-4.268 4.344 0 2.355 1.913 4.348 4.268 4.348 2.136 0 3.59-1.221 3.889-2.899h-3.89v-2.783h6.713z"
                          fill="#7C7C7C"
                        />
                      </svg>
                      <span className="ml-3">Things to do</span>
                      <svg
                        width="7"
                        height="10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-3 mt-[2px]"
                      >
                        <path
                          d="M.793 8.293a1 1 0 001.414 1.414L.793 8.293zM5.5 5l.707.707L6.914 5l-.707-.707L5.5 5zM2.207.293A1 1 0 00.793 1.707L2.207.293zm0 9.414l4-4-1.414-1.414-4 4 1.414 1.414zm4-5.414l-4-4L.793 1.707l4 4 1.414-1.414z"
                          fill="#FFFFFF"
                        />
                      </svg>
                    </button>
                    <a
                      className="bg-gray-200 hover:bg-gray-300 transition-colors duration-75 text-white w-full py-3 font-worksans font-semibold rounded-[18px] text-xl flex justify-center items-center"
                      href={`https://en.wikipedia.org/wiki/${locations[shownLocationIndex].name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        width="29"
                        height="28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x=".5"
                          width="28"
                          height="28"
                          rx="8"
                          fill="#fff"
                        />
                        <path
                          d="M14.579 15.514c-.82 1.692-1.941 3.982-2.495 5.014-.54.94-.988.814-1.344.024-1.227-2.905-3.756-8.002-4.942-10.856-.218-.526-.386-.865-.543-.998-.158-.13-.482-.208-.981-.235C4.089 8.439 4 8.394 4 8.323v-.4l.045-.038c.81-.003 4.727 0 4.727 0l.044.038v.382c0 .103-.065.154-.198.154l-.492.027c-.424.024-.636.14-.636.38 0 .119.045.29.144.526.947 2.314 4.217 9.204 4.217 9.204l.12.042 2.109-4.207-.424-.934-1.449-2.857s-.277-.57-.376-.762c-.636-1.264-.622-1.33-1.265-1.415-.18-.02-.273-.044-.273-.13v-.41l.051-.041H14.1l.1.034v.393c0 .093-.069.133-.199.133l-.27.042c-.693.05-.577.331-.119 1.244l1.384 2.843 1.538-3.066c.257-.56.206-.7.1-.826-.062-.076-.267-.192-.711-.212l-.178-.017a.205.205 0 01-.127-.045.14.14 0 01-.058-.113v-.373l.054-.041c1.09-.007 3.538 0 3.538 0l.051.041v.38c0 .105-.05.157-.17.157-.564.024-.684.082-.896.383-.102.164-.328.515-.564.909l-2.013 3.739-.059.12 2.444 4.997.15.041 3.846-9.133c.133-.37.112-.633-.055-.783-.174-.15-.304-.24-.752-.26l-.366-.014a.22.22 0 01-.133-.037c-.037-.028-.065-.065-.065-.106v-.379l.052-.041h4.344l.034.041v.383c0 .102-.065.157-.184.157-.564.024-.985.158-1.262.366-.273.225-.489.54-.642.936 0 0-3.538 8.1-4.747 10.794-.462.882-.923.803-1.316-.027-.499-1.022-1.552-3.313-2.318-4.994l.048-.034z"
                          fill="#7C7C7C"
                        />
                      </svg>
                      <span className="ml-3">Info & History</span>
                      <svg
                        width="7"
                        height="10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-3 mt-[2px]"
                      >
                        <path
                          d="M.793 8.293a1 1 0 001.414 1.414L.793 8.293zM5.5 5l.707.707L6.914 5l-.707-.707L5.5 5zM2.207.293A1 1 0 00.793 1.707L2.207.293zm0 9.414l4-4-1.414-1.414-4 4 1.414 1.414zm4-5.414l-4-4L.793 1.707l4 4 1.414-1.414z"
                          fill="#FFFFFF"
                        />
                      </svg>
                    </a>
                  </div>
                </Dialog.Description>
              </motion.div>
            </div>
          </AnimatePresence>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
