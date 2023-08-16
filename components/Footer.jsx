export default function Footer({ openMailingListModal, openFeedbackModal }) {
  return (
    <footer>
      <div className="max-w-sm">
        <h3 className="text-lg font-bold items-center bg-white rounded-xl px-3 mb-4 inline-flex">
          <span>Where’s the️</span>
          <span className="text-3xl px-1">☀️</span>
          <span>?</span>
        </h3>
        <p className="font-medium leading-6 mb-4">
          Find interesting locations with great weather.
        </p>
        <div className="text-gray-500 leading-6 text-sm mb-4">
          <div className="font-bold">
            This project is just an idea ... for now.
          </div>
          It’s beeing developed by a small, but ambitious team with a goal of
          giving you a fun and handy tool!
        </div>
      </div>
      <div className="text-gray-500 text-sm">
        <span>Give it a test run and</span>
        <button
          onClick={openFeedbackModal}
          className="px-1 text-red-500 font-bold underline hover:text-red-600"
        >
          let us know if you like it
        </button>
        <span className="px-1">or</span>
        <button
          onClick={openMailingListModal}
          className="px-1 text-red-500 font-bold underline hover:text-red-600"
        >
          join our mailing list
        </button>
        <span>.</span>
      </div>
    </footer>
  );
}
