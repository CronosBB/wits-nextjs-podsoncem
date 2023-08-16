import Head from "next/head";
import { useState, useEffect } from "react";
import cx from "classnames";

import LoadingAnimation from "../components/Loading";
import Footer from "../components/Footer";
import EnableLocationAlert from "../components/EnableLocationAlert";
import LocationBubble from "../components/LocationBubble";
import LocationBubbleMobile from "../components/LocationBubbleMobile";
import MailingListModal from "../components/MailingListModal";
import FeedbackModal from "../components/FeedbackModal";
import LocationModal from "../components/LocationModalNew";
import IntroScreen from "../components/IntroScreen";

const sunnyLocationsPage1 = [
  { name: "Vrhnika", type: "nature", timeDistance: 1800000, size: 1 },
  { name: "Novo mesto", type: "history", timeDistance: 3000000, size: 1.2 },
  { name: "Trieste", type: "art", timeDistance: 6000000, size: 1.45 },
  { name: "Rijeka", type: "art", timeDistance: 6180000, size: 1.25 },
  { name: "Pula", type: "history", timeDistance: 9790000, size: 1 },
];

const sunnyLocationsPage2 = [
  { name: "Milano", type: "nature", timeDistance: 10000000, size: 1 },
  { name: "Sevilla", type: "history", timeDistance: 10900000, size: 1.2 },
  { name: "Skofja Loka", type: "art", timeDistance: 12090000, size: 1.45 },
  { name: "Hamburg", type: "art", timeDistance: 15000000, size: 1.25 },
  { name: "Berlin", type: "history", timeDistance: 19000000, size: 1 },
];

export default function Home() {
  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("Geolocation is not supported by your browser");
    } else {
      setLocationStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setLocationStatus("Unable to retrieve your location");
        }
      );
    }
  };

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [LocationStatus, setLocationStatus] = useState(null);
  const [sunnyLocations, setSunnyLocations] = useState(sunnyLocationsPage1);

  const [showTransportPickerScreen, setShowTransportPickerScreen] = useState(
    true
  );
  const [showMailingListModal, setShowMailingListModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showLocationDetailsModal, setShowLocationDetailsModal] = useState(
    false
  );

  useEffect(() => {
    if (showTransportPickerScreen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [showTransportPickerScreen]);

  useEffect(() => {
    getLocation();
  }, []);

  // current idea is to make timeRange equal from 0 to timeDistance of the last location show
  // update 0 to first location shown after users shows next 5 location (maybe, or just transition elements up and out of view)
  const [timeRange, setTimeRange] = useState({
    start: sunnyLocations[0].timeDistance,
    end:
      sunnyLocations[sunnyLocations.length - 1].timeDistance +
      sunnyLocations[0].timeDistance,
  });

  // define time blocks used in the vertical timeline
  const [timeBlocks, setTimeBlocks] = useState(
    new Array(Math.floor(timeRange.end / 1800000)).fill({
      start: 0,
      end: 0,
      numOfLocationsInBlock: 0,
      locations: [],
      numOfSkippedBlocks: 0,
    })
  );
  // save count of skipped blocks
  const [numOfAllSkippedBlocks, setNumOfAllSkippedBlocks] = useState(0);
  useEffect(() => {
    let tempTimeBlocks = [];
    let countSkippedBlocks = 0;
    for (let i = 0; i < timeBlocks.length; i++) {
      // set block start & end time in ms:
      let blockStart = 1800000 * i;
      let blockEnd = 1800000 * (i + 1);
      // save number of locations in block
      let countLocationsInBlock = 0;
      // save locations names that are in current time block
      let locationsInBlock = [];
      sunnyLocations.forEach((location) => {
        if (
          location.timeDistance >= blockStart &&
          location.timeDistance < blockEnd
        ) {
          countLocationsInBlock++;
          locationsInBlock.push(location.name);
        }
      });
      // check how many time blocks were empty/skipped before current block:
      let countEmptyBeforeCurrent = 0;
      for (let y = 0; y < i; y++) {
        if (tempTimeBlocks[y].numOfLocationsInBlock === 0)
          countEmptyBeforeCurrent++;
      }

      tempTimeBlocks[i] = {
        start: blockStart,
        end: blockEnd,
        numOfLocationsInBlock: countLocationsInBlock,
        locations: locationsInBlock,
        numOfSkippedBlocks: countEmptyBeforeCurrent,
      };
      if (countLocationsInBlock === 0) countSkippedBlocks++;
    }
    setTimeBlocks(tempTimeBlocks);
    setNumOfAllSkippedBlocks(countSkippedBlocks);

    setTimeRange({
      start: sunnyLocations[0].timeDistance,
      end:
        sunnyLocations[sunnyLocations.length - 1].timeDistance +
        sunnyLocations[0].timeDistance,
    });
  }, [sunnyLocations]);

  const [indexOfShownLocation, setIndexOfShownLocation] = useState(-1);

  return (
    <div className="min-h-screen bg-beige">
      <Head>
        <title>Where Is The Sun?</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MailingListModal
        isOpen={showMailingListModal}
        onClose={() => setShowMailingListModal(false)}
      />

      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
      />

      <IntroScreen
        isOpen={showTransportPickerScreen}
        onTransportConfirm={() => {
          setShowTransportPickerScreen(false);
        }}
      />

      <main>
        {/* <EnableLocationAlert /> */}
        {/* <div className="mt-32">
          <LoadingAnimation />
        </div> */}
        {/* <div>
          <h1>Coordinates:</h1>
          <p>{LocationStatus}</p>
          {lat && <p>Latitude: {lat}</p>}
          {lng && <p>Longitude: {lng}</p>}
        </div> */}

        <LocationModal
          locationIndex={indexOfShownLocation}
          locations={sunnyLocations}
          isOpen={showLocationDetailsModal}
          onClose={() => {
            setShowLocationDetailsModal(false);
          }}
        />
        {sunnyLocations && (
          <div className="md:h-screen md:px-10">
            <div className="pt-20 md:py-32 h-full">
              <h1 className="font-worksans font-bold text-[32px] md:text-7xl md:text-center px-7 md:px-0">
                Here’s the <span className="text-3xl md:text-6xl">☀️</span>
              </h1>
              <div className="pb-56 h-full relative hidden md:block">
                <div className="w-[2px] h-full bg-gray-200 bg-opacity-40 mx-auto">
                  {[
                    ...Array(
                      Math.floor((timeRange.end - timeRange.start) / 1800000)
                    ),
                  ].map(
                    // 1800000 == 30m -> split timeline into 30m blocks
                    (e, i) => (
                      <span
                        className="relative left-1/2 top-1/3"
                        style={{
                          // top:
                          //   (1800000 *
                          //     (i + 1 - timeBlocks[i].numOfSkippedBlocks) *
                          //     100) /
                          //     (timeRange.end -
                          //       1800000 * numOfAllSkippedBlocks) +
                          //   "%",
                          top:
                            (1800000 * (i + 1) * 100) /
                              (timeRange.end - timeRange.start) +
                            "%",
                        }}
                        key={i}
                      >
                        {/* {timeBlocks[i].numOfLocationsInBlock > 0 && ( */}
                        <span className="absolute transform -translate-x-1/2 bg-beige py-2 text-gray-200 text-sm font-worksans font-semibold whitespace-nowrap">
                          <span
                            className={cx(
                              Math.floor((30 * (i + 1)) / 60) === 0
                                ? "hidden"
                                : ""
                            )}
                          >
                            {Math.floor((30 * (i + 1)) / 60)}h{" "}
                          </span>
                          <span
                            className={cx(
                              (30 * (i + 1)) % 60 === 0 ? "hidden" : ""
                            )}
                          >
                            {(30 * (i + 1)) % 60}m
                          </span>
                        </span>
                        {/* )} */}
                      </span>
                    )
                  )}
                </div>

                <div className="h-full w-full pb-56 absolute top-0">
                  <div className="relative h-full">
                    {/* {sunnyLocations.map((location, index) => (
                      <LocationBubble
                        location={location}
                        index={index}
                        timeRange={timeRange}
                        timeBlocks={timeBlocks}
                        numOfAllSkippedBlocks={numOfAllSkippedBlocks}
                        onClick={() => {
                          setIndexOfShownLocation(index);
                          setShowLocationDetailsModal(true);
                        }}
                        key={index}
                      />
                    ))} */}
                    {sunnyLocations.map((location, index) => (
                      <span
                        className={cx(
                          "absolute mx-10 transform",
                          index % 2 === 0
                            ? "right-1/2 origin-right"
                            : "left-1/2 origin-left"
                        )}
                        style={{
                          top:
                            (location.timeDistance * 100) /
                              sunnyLocations[sunnyLocations.length - 1]
                                .timeDistance +
                            "%",
                          transform: "scale(" + location.size + ")",
                        }}
                      >
                        <div className="transform -translate-y-1/2">
                          <LocationBubbleMobile
                            location={location}
                            index={index}
                            onClick={() => {
                              setIndexOfShownLocation(index);
                              setShowLocationDetailsModal(true);
                            }}
                            key={index}
                          />
                        </div>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center">
                  {/* <button
                    className="bg-red-500 text-white font-worksans font-semibold text-xl py-[14px] px-8 rounded-[18px] hover:bg-red-600 transition-colors duration-75 ease-in-out cursor-pointer relative z-10 mt-12"
                    onClick={() => {
                      setSunnyLocations(sunnyLocationsPage2);
                    }}
                  >
                    Show next 5 closest
                  </button> */}
                </div>
              </div>
              {/* mobile locations: */}
              <div className="mt-6 pb-8 relative md:hidden">
                {/* time marks: */}
                <div>
                  {[
                    ...Array(
                      Math.floor(
                        sunnyLocations[sunnyLocations.length - 1].timeDistance /
                          1800000
                      )
                    ),
                  ].map(
                    // 1800000 == 30m -> split timeline into 30m blocks
                    (e, i) => (
                      <div className="pt-32 text-right text-xs text-gray-300 font-semibold font-worksans">
                        <span className="pr-2 border-b-2 border-gray-100 pb-2">
                          <span
                            className={cx(
                              Math.floor((30 * (i + 1)) / 60) === 0
                                ? "hidden"
                                : ""
                            )}
                          >
                            {Math.floor((30 * (i + 1)) / 60)}h{" "}
                          </span>
                          <span
                            className={cx(
                              (30 * (i + 1)) % 60 === 0 ? "hidden" : ""
                            )}
                          >
                            {(30 * (i + 1)) % 60}m
                          </span>
                        </span>
                      </div>
                    )
                  )}
                </div>
                {/* locations: */}
                {sunnyLocations.map((location, index) => (
                  <span
                    className={cx(
                      "absolute transform -translate-y-1/2 -mt-3",
                      index % 2 === 0
                        ? "right-3 origin-right"
                        : "left-3 origin-left"
                    )}
                    style={{
                      top:
                        (location.timeDistance * 100) /
                          sunnyLocations[sunnyLocations.length - 1]
                            .timeDistance +
                        "%",
                      transform: "scale(" + location.size + ")",
                    }}
                  >
                    <LocationBubbleMobile
                      location={location}
                      index={index}
                      onClick={() => {
                        setIndexOfShownLocation(index);
                        setShowLocationDetailsModal(true);
                      }}
                      key={index}
                    />
                  </span>
                ))}
              </div>
              {/* show next button: */}
              <div className="flex justify-center md:hidden">
                <button
                  className="bg-red-500 text-white font-worksans font-semibold text-xl py-[14px] px-8 rounded-[18px] mt-32 mb-20 active:bg-red-600 transition-colors duration-75 ease-in-out"
                  onClick={() => {
                    setSunnyLocations(
                      sunnyLocations.concat(sunnyLocationsPage2)
                    );
                  }}
                >
                  Show next 5 closest
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <div className="absolute left-0 bottom-0 px-10 pb-10 hidden md:block">
        <Footer
          openMailingListModal={() => setShowMailingListModal(true)}
          openFeedbackModal={() => setShowFeedbackModal(true)}
        />
      </div>
    </div>
  );
}
