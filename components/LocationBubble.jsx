import LocationTypeIcon from "./LocationTypeIcon";
import cx from "classnames";
import { motion } from "framer-motion";

export default function LocationBubble({
  location,
  index,
  timeRange,
  timeBlocks,
  numOfAllSkippedBlocks,
  onClick,
}) {
  const getNumberOfPreviouselySkippedBlocks = (locationName) => {
    for (let i = 0; i < timeBlocks.length; i++) {
      if (timeBlocks[i].locations.includes(locationName))
        return timeBlocks[i].numOfSkippedBlocks;
    }
    return 0;
  };

  return (
    <motion.div
      className={cx(
        "absolute mx-10 bg-white text-gray-900 cursor-pointer pl-3 pr-2 py-1.5 rounded-2xl shadow-locationBubble hover:shadow-locationBubbleHover transition-shadow duration-200 ease-in-out transform -translate-y-1/2",
        index % 2 === 0 ? "right-1/2 origin-right" : "left-1/2 origin-left"
      )}
      style={{
        top:
          ((location.timeDistance -
            getNumberOfPreviouselySkippedBlocks(location.name) * 1800000) *
            100) /
            (timeRange.end - numOfAllSkippedBlocks * 1800000) +
          "%",
        transform: "scale(" + location.size + ")",
      }}
      key={index}
      onClick={onClick}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.2 },
      }}
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
