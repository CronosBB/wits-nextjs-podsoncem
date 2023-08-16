export default function EnableLocationAlert() {
  return (
    <div>
      <h1 className="text-7xl font-bold font-worksans text-center">
        Hey sunshine!
      </h1>
      <div className="text-6xl text-center mt-4">😃</div>
      <p className="text-2xl text-center mt-10 font-medium mb-15">
        Where are you at this moment?
      </p>
      <div className="px-8 pt-6 pb-9 bg-white rounded-4xl text-center max-w-sm mx-auto">
        <h2 className="text-5xl mb-4">🤝</h2>
        <p className="leading-6 font-medium text-gray-900 mb-4">
          Please allow your browser to share your location with us.
        </p>
        <p className="leading-6 font-medium text-gray-500">
          We’ll use it to generate suggestions where to travel today, nothing
          else.
        </p>
      </div>
    </div>
  );
}
