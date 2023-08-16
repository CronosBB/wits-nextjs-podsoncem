import LocationTypeIcon from "./LocationTypeIcon";
import cx from "classnames";
import { motion } from "framer-motion";

export default function LocationBubbleMobile({ location, index, onClick }) {
  return (
    <motion.div
      className={cx(
        "mx-2 bg-white text-gray-900 cursor-pointer pl-3 pr-2 py-1.5 rounded-2xl shadow-locationBubble hover:shadow-locationBubbleHover transition-shadow duration-200 ease-in-out inline-block"
      )}
      key={index}
      onClick={onClick}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.2 },
      }}
      // style={{
      //   transform: "scale(" + location.size + ")",
      // }}
    >
      <span className="flex items-center">
        <span className="font-worksans font-semibold text-xl">
          {location.name}
        </span>
        <span className="ml-2.5">
          <LocationTypeIcon locationType={location.type} />
        </span>
      </span>
    </motion.div>
  );
}
