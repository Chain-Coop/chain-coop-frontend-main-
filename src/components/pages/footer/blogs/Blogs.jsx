import NavBar from "../../../common/NavBar";
import tech from "../../../../../public/images/png/footer/blog/men.png";
import machine from "../../../../../public/images/png/footer/blog/tech.png";
import men2 from "../../../../../public/images/png/footer/blog/image3.png";
import { Blog } from "../../../common/Button";
import avatar from "../../../../../public/images/png/footer/blog/avatar.png";
import Footer from "../../../common/Footer";
import FooterBox from "../../../common/FooterBox";
import { useEffect } from "react";

const Blogs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <NavBar />
      <main className="font-sans">
        <div className="mx-auto mb-[6em] grid w-full grid-cols-1 items-center bg-text2 px-2 pt-[20px] text-center font-sans sm:grid-cols-1 lg:pb-[10px] lg:pt-[50px]">
          <div className="m-auto flex w-full items-center justify-center text-center lg:w-[37%]">
            <header className="flex items-center justify-center text-center lg:mb-[2em]">
              <h1 className="text-lg font-semibold leading-8 text-text5 lg:text-2xl">
                Discover exclusive articles on investment Chain Blocks
              </h1>
            </header>
          </div>
          <div
            className="relative z-10 mx-auto mt-8 flex items-center justify-center rounded-2xl bg-cover bg-center font-sans sm:mb-[-90px] sm:h-[200px] lg:mb-[-130px] lg:h-[270px] lg:w-[50%]"
            style={{ backgroundImage: `url(${tech})` }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="m-auto w-[75%]">
                <Blog className="rounded-md border border-text5 px-2 py-1 text-text5">
                  Blogs
                </Blog>
                <p className="text-medium mt-[1.5em] text-white">
                  Meet our Chain Coop, our business-oriented community designed
                  into a cooperative with open membership, through Chain Wallet
                  Simple, Safe and transparent way.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative m-auto mb-[4em] mt-[7em] px-[6px] lg:mb-[10em] lg:mt-[16em] lg:w-[86%]">
          <div className="flex flex-col justify-between px-4 lg:flex-row">
            <div className="mb-8 lg:mb-0 lg:w-[60%]">
              <div className="h-full w-full lg:w-[25em]">
                <img
                  src={men2}
                  alt="Secondary Image"
                  className="h-auto w-full"
                />
                <div className="mt-[1em]">
                  <div className="flex flex-col justify-between lg:flex-row">
                    <div>
                      <h1 className="text-md font-bold text-text2 lg:text-2xl">
                        Articles of Investment Chain Blocks
                      </h1>
                    </div>
                    <div className="mt-2 flex flex-row items-center gap-3 lg:mt-0">
                      <img src={avatar} alt="" />
                      <p className="font-semibold">John Smith</p>
                    </div>
                  </div>
                  <div className="mt-[1em]">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Natus, suscipit.
                    </p>
                  </div>
                  <div>
                    <p className="font-sm">May 10, 2024</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-blog h-full rounded-2xl px-[3em] pb-[2em] pt-[3em] text-center shadow-md lg:w-[35%]">
              <h1 className="text-xl font-bold">Categories</h1>
              <div className="mt-[2em] flex flex-col space-y-2">
                <div className="flex flex-wrap justify-center gap-2 lg:justify-between">
                  <Blog className="rounded-full border-2 border-text1 px-2">
                    Block Chain
                  </Blog>
                  <Blog className="rounded-full border-2 border-text1 px-2">
                    Investment
                  </Blog>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[3em]">
            <h1 className="text-2xl font-bold">Block Chain</h1>
            <div className="mt-[1em] flex flex-col gap-4 lg:flex-row lg:flex-wrap">
              <div className="border-border h-full w-full border-3 shadow-md lg:w-[30%]">
                <img
                  src={machine}
                  alt="Secondary Image"
                  className="h-auto w-full"
                />
                <div className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <h1 className="text-xl font-bold text-text2">
                        {" "}
                        Articles of Investment Chain Blocks{" "}
                      </h1>
                    </div>
                    <div className="flex flex-row items-center gap-3">
                      <img src={avatar} alt="" />
                      <p className="text-sm font-semibold">John Smith</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p>
                      {" "}
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Natus, suscipit.{" "}
                    </p>
                  </div>
                  <div className="mt-4">
                    <p className="font-sm">May 10, 2024</p>
                  </div>
                </div>
              </div>

              <div className="h-full w-full shadow-md lg:w-[30%]">
                <img
                  src={machine}
                  alt="Secondary Image"
                  className="h-auto w-full"
                />
                <div className="mt-[1em] p-2">
                  <div className="flex justify-between">
                    <div>
                      <h1 className="text-xl font-bold text-text2">
                        Articles of Investment Chain Blocks
                      </h1>
                    </div>
                    <div className="flex flex-row items-center gap-3">
                      <img src={avatar} alt="" />
                      <p className="font-semibold">John Smith</p>
                    </div>
                  </div>
                  <div className="mt-[1em]">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Natus, suscipit.
                    </p>
                  </div>
                  <div className="mt-[1em]">
                    <p className="font-sm">May 10, 2024</p>
                  </div>
                </div>
              </div>
              <div className="h-full w-full shadow-md lg:w-[30%]">
                <img
                  src={machine}
                  alt="Secondary Image"
                  className="h-auto w-full"
                />
                <div className="mt-[1em] p-2">
                  <div className="flex justify-between">
                    <div>
                      <h1 className="text-xl font-bold text-text2">
                        Articles of Investment Chain Blocks
                      </h1>
                    </div>
                    <div className="flex flex-row items-center gap-3">
                      <img src={avatar} alt="" />
                      <p className="font-semibold">John Smith</p>
                    </div>
                  </div>
                  <div className="mt-[1em]">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Natus, suscipit.
                    </p>
                  </div>
                  <div className="mt-[1em]">
                    <p className="font-sm">May 10, 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterBox />
        <Footer />
      </main>
    </>
  );
};

export default Blogs;
