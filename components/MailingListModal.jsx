import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import validator from "validator";

export default function MailingListModal({ isOpen, onClose }) {
  let [email, setEmail] = useState("");
  let [agreeToTerms, setAgreeToTerms] = useState(false);
  let [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    setFormIsValid(validator.isEmail(email) && agreeToTerms);
  }, [email, agreeToTerms]);

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          as={motion.div}
          open={isOpen}
          onClose={onClose}
          className="absolute left-0 top-0 h-screen w-full flex items-center justify-center"
          initial={{ scale: 0.75, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.75, opacity: 0 }}
          transition={{ duration: 0.12 }}
        >
          <Dialog.Overlay className="fixed inset-0 bg-beige bg-opacity-60 backdrop-blur" />
          <div className="bg-white relative z-10 w-[588px] p-12 rounded-[18px] shadow-modal max-h-[96vh] overflow-auto">
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
            <Dialog.Title className="mb-7">
              <span className="font-worksans font-bold text-4xl">
                Join our mailing list
              </span>
              <span className="ml-4 text-3xl">✉️</span>
            </Dialog.Title>
            <Dialog.Description>
              <p className="pr-12 mb-8">
                <div className="font-bold text-gray-900">
                  Great to see you are interested!
                </div>
                <span className="text-gray-500">
                  We will let you know about any significant upgrades that may
                  happen in the future.
                </span>
              </p>
              <label for="email" className="block text-xs mb-1 font-bold">
                Your email address
                {!validator.isEmail(email) && (
                  <span className="text-red-500">*</span>
                )}
              </label>
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-10 border-2 border-solid border-gray-200 rounded-lg py-2 px-4 mb-7 focus:border-red-500 focus:ring-transparent"
              ></input>
              <div className="flex items-center mb-12">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={agreeToTerms}
                  onChange={() => setAgreeToTerms(!agreeToTerms)}
                  className="w-5 h-5 bg-gray-10 border-2 border-solid border-gray-200 rounded text-red-500 focus:border-red-500 focus:ring-transparent cursor-pointer hover:bg-red-100"
                />
                <label for="terms" className="ml-4 text-gray-500">
                  I agree to the{" "}
                  <a href="#" className="underline">
                    terms of service
                  </a>
                  .{!agreeToTerms && <span className="text-red-500">*</span>}
                </label>
              </div>
              <button
                disabled={!formIsValid}
                onClick={onClose}
                className="py-[14px] w-full text-white text-2xl font-worksans font-semibold bg-red-500 rounded-[18px] hover:bg-red-600 transition-colors duration-150 ease-in-out disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Subscribe
              </button>
            </Dialog.Description>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
