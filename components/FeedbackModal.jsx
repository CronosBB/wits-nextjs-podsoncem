import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import validator from "validator";

export default function FeedbackModal({ isOpen, onClose }) {
  let [email, setEmail] = useState("");
  let [agreeToTerms, setAgreeToTerms] = useState(false);
  let [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    setFormIsValid(validator.isEmail(email));
  }, [email]);

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          as={motion.div}
          open={isOpen}
          onClose={onClose}
          className="absolute left-0 top-0 min-h-screen w-full flex items-center justify-center"
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
                Submit feedback
              </span>
              <span className="ml-4 text-3xl">🔍</span>
            </Dialog.Title>
            <Dialog.Description>
              <p className="pr-12 mb-8">
                <div className="font-bold text-gray-900">
                  Any and all feedback is greatly appreciated.
                </div>
                <span className="text-gray-500">
                  Let us know what you like/dislike, send suggestions or report
                  bugs. We check all emails! 🤗
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
                className="w-full bg-gray-10 border-2 border-solid border-gray-200 rounded-lg py-2 px-4 mb-4 focus:border-red-500 focus:ring-transparent"
              ></input>
              <label for="feedback" className="block text-xs mb-1 font-bold">
                Your feedback
              </label>

              <textarea
                id="feedback"
                name="feedback"
                rows="7"
                className="w-full resize-none bg-gray-10 border-2 border-solid border-gray-200 rounded-lg p-4 focus:border-red-500 focus:ring-transparent mb-7"
              ></textarea>
              <div className="flex mb-12">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={agreeToTerms}
                  onChange={() => setAgreeToTerms(!agreeToTerms)}
                  className="w-5 h-5 bg-gray-10 border-2 border-solid border-gray-200 rounded text-red-500 focus:border-red-500 focus:ring-transparent cursor-pointer hover:bg-red-100"
                />
                <label for="terms" className="ml-4">
                  <span className="text-gray-900 font-bold">
                    Subscribe to the mailing list
                  </span>
                  <span className="text-gray-500 text-xs block">
                    You’ll recieve info about any significant upgrades that may
                    happen in the future. By scubscribing, you agree to our
                    terms of service.
                  </span>
                </label>
              </div>
              <button
                disabled={!formIsValid}
                onClick={onClose}
                className="py-[14px] w-full text-white text-2xl font-worksans font-semibold bg-red-500 rounded-[18px] hover:bg-red-600 transition-colors duration-150 ease-in-out disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Submit feedback
              </button>
            </Dialog.Description>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
