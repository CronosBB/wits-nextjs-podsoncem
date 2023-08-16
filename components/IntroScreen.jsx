import { motion, AnimatePresence } from "framer-motion";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

const transportOptions = [
  { title: "Car" },
  { title: "Bicycle" },
  { title: "Motorbike" },
];

export default function IntroScreen({ isOpen, onTransportConfirm }) {
  const [selected, setSelected] = useState(transportOptions[0].title);
  const [showTransportPicker, setShowTransportPicker] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.25 }}
          className="bg-beige fixed top-0 bottom-0 left-0 right-0 z-50 px-12 xs:px-15 py-24 md:flex md:items-center overflow-y-auto"
        >
          <div className="max-w-xs mx-auto">
            <div className="text-gray-900 font-worksans font-bold text-6xl xs:text-7xl relative z-10">
              Cheers!
            </div>
            <div className="text-8xl -mt-6 mb-20">🍻</div>
            <p className="font-worksans text-gray-900 text-2xl max-w-[160px] mb-16 font-medium">
              We assume you are going by car?
            </p>
            <button
              className="bg-red-500 text-white font-worksans font-semibold text-xl py-[14px] px-8 rounded-[18px] hover:bg-red-600 transition-colors duration-75 ease-in-out w-full mb-12"
              onClick={onTransportConfirm}
            >
              Thats’ correct
            </button>
            <AnimatePresence>
              {!showTransportPicker && (
                <motion.div
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-beige-dark font-semibold font-worksans mb-2">
                    Not a car person?
                  </div>
                  <button
                    className="text-beige-dark font-worksans underline cursor-pointer hover:text-red-500"
                    onClick={() => {
                      setShowTransportPicker(true);
                    }}
                  >
                    Pick your transport
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {showTransportPicker && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Listbox
                    value={selected}
                    onChange={(selected) => {
                      setSelected(selected);
                      onTransportConfirm();
                    }}
                  >
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full py-3 pl-6 pr-10 text-left bg-white rounded-[18px] shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm shadow-locationBubble">
                        <span className="block truncate font-worksans text-gray-900">
                          {selected}
                        </span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <SelectorIcon
                            className="w-5 h-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-[18px] shadow-locationBubble focus:outline-none">
                          {transportOptions.map((transport, transportIndex) => (
                            <Listbox.Option
                              key={transportIndex}
                              className={({ active }) =>
                                `${
                                  active
                                    ? "text-amber-900 bg-amber-100"
                                    : "text-gray-900"
                                }
                          cursor-default select-none relative py-2 pl-10 pr-4`
                              }
                              value={transport.title}
                            >
                              {({ selected, active }) => (
                                <>
                                  <span
                                    className={`${
                                      selected ? "font-medium" : "font-normal"
                                    } block truncate`}
                                  >
                                    {transport.title}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                      <CheckIcon
                                        className="w-5 h-5 text-red-500"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
