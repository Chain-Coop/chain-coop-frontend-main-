import demologo from "../../../../public/images/png/home/demologo.png";
import "../../parts/partone/animation.css";

const image = [
  { src: demologo },
  { src: demologo },
  { src: demologo },
  { src: demologo },
  { src: demologo },
  { src: demologo },
  { src: demologo },
  { src: demologo },
  { src: demologo },
  { src: demologo },
];

const TrustedPartners = () => {
  return (
    <main className="logos flex justify-center shadow-md sm:p-[3rem] lg:p-[2rem]">
      <div className="logos-slide flex w-[96vw] items-center justify-between whitespace-nowrap">
        <div className="flex space-x-20">
          {image.map((img, index) => (
            <img
              key={index}
              src={img.src}
              alt={`Image ${index + 1}`}
              className="h-13 mr-4"
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default TrustedPartners;
