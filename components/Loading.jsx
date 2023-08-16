import { useState, useEffect } from "react";
import cx from "classnames";

const messages = [
  "Messaging with the weather service ...",
  "Talking to the map maker ...",
  "Asking locals about interesting things to see ...",
];

export default function loading() {
  const [loadingMsgs, setLoadingMsgs] = useState(messages);

  useEffect(() => {
    const i = setInterval(() => {
      setLoadingMsgs(([first, ...rest]) => [...rest, first]);
    }, 3000);

    return () => clearInterval(i);
  }, []);

  return (
    <div className="text-center">
      <h1 className="font-bold font-worksans text-4xl mb-3">I’m on it!</h1>
      <div className="text-6xl relative z-10">💪️</div>
      <div className="text-medium text-gray-500 leading-6 -mt-6">
        {loadingMsgs.map((msg, index) => (
          <div
            className={cx(
              "mb-2",
              index === 0 ? "opacity-10" : "",
              index === 1 ? "opacity-25" : "",
              index === 2 ? "animate-fade" : ""
            )}
            key={index}
          >
            {msg}
          </div>
        ))}
      </div>
    </div>
  );
}
