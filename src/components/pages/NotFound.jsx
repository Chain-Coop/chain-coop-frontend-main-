import notfound from "../../Assets/svg/notfound.svg";
import corner from "../../Assets/svg/topcorner.svg";
const NotFound = () => {
  const handleReturnBack = () => {
    window.history.back();
  };

  return (
    <main className="flex h-screen items-center justify-center bg-not font-sans">
      <div className="content text-center">
        <div>
          <img src={notfound} alt="404 Not Found" />
        </div>
        <header>
          <h1 className="text-2xl font-bold text-text2">
            Oops! PAGE NOT FOUND
          </h1>
          <p className="mt-[1em] font-medium">
            {`The page you're looking for might have been removed or it's temporarily unavailable`}
          </p>
        </header>
        <button
          className="mt-4 h-[45px] w-[140px] rounded-md bg-text2 px-4 text-lg font-medium text-text3 outline-none focus:outline-none"
          onClick={handleReturnBack}
        >
          Return Back
        </button>
      </div>
      <div className="absolute left-0 top-0 sm:hidden lg:block">
        <img src={corner} alt="trianle-shape" />
      </div>
    </main>
  );
};

export default NotFound;
