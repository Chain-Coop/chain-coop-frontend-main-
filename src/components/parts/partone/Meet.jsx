import person1 from "../../../Assets/jpg/home/person1.jpg";
import person2 from "../../../Assets/jpg/home/person2.jpg";
import person3 from "../../../Assets/jpg/home/person3.jpg";

const image = [
  {
    src: person1,
  },
  {
    src: person2,
  },
  {
    src: person3,
  },
];

const Meet = () => {
  return (
    <main className="mx-auto grid items-center justify-center sm:-mt-[1em] sm:px-[1em] lg:mt-[7em] lg:w-[86%] lg:px-[0]">
      <div>
        <header className="text-center text-text4">
          <h1 className="mb-2 gap-1 font-bold sm:text-2xl lg:text-3xl">
            Meet some
            <span className="ml-1 font-sans text-text2  sm:text-2xl lg:text-3xl">
              like-minded people
            </span>
          </h1>
        </header>
        <div className="mt-[2em] grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-3">
          {image.map((item, index) => (
            <img
              key={index}
              src={item.src}
              alt={`Person ${index + 1}`}
              className="h-[20em] w-[26em] rounded-md"
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Meet;
