import NavBar from "../../common/NavBar";
import Footer from "../../common/Footer";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { FiPhoneCall } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import { MdMedicalInformation } from "react-icons/md";
import tweeter from "../../../Assets/svg/contact/tweeter.svg";
import linkdln from "../../../Assets/svg/contact/linkdln.svg";
import medium from "../../../Assets/svg/contact/medium.svg";

import background from "../../../Assets/png/story/background.png";
import circle from "../../../Assets/png/contact/circle.png";

import FooterBox from "../../common/FooterBox";

import "../../../general.css";
import { Primary } from "../../common/Button";

const Contact = () => {
  return (
    <>
      <NavBar />
      <main className="relative h-full font-sans">
        <section className="inset-0 flex items-center">
          <img src={background} className="w-full object-cover" alt="" />
        </section>
        <section className="absolute inset-0 mx-auto ">
          <header className="mx-auto text-center sm:mt-[2em] sm:w-full sm:px-1 md:px-[1em] lg:mt-[9em] lg:w-[65%]">
            <p className="text-lg font-semibold text-text2">Get in touch</p>
            <h1 className=" font-semibold sm:text-[1.5em] lg:text-[2.5em]">
              CONTACT US
            </h1>
            <p className="text-sm">
              Meet our Chain Coop, our business-oriented community designed into
              a cooperative with open membership, through Chain Wallet Simple,
              Safe and transparent way
            </p>
          </header>

          <div className="ml-auto flex flex-col justify-end sm:mt-[2.5em] sm:gap-9 sm:pl-[10px] lg:ml-auto lg:mt-[5em] lg:w-[90%] lg:flex-row lg:gap-[3em]">
            <div className="sm:p-1 sm:px-[1em] md:px-[2em] lg:w-[75%] lg:p-3">
              <form>
                <div>
                  <label htmlFor="name" className="text-lg font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    className="mt-[1em] w-full rounded-md border-none p-4 shadow-md"
                    placeholder="enter your name"
                  />
                </div>

                <div className="email mt-[2em]">
                  <label htmlFor="email" className="text-lg font-medium">
                    Email Address
                  </label>
                  <input
                    type="text"
                    className="mt-[1em] w-full rounded-md border-none p-4 shadow-md"
                    placeholder="enter your e-mail"
                  />
                </div>

                <div className="mt-[2em]">
                  <label htmlFor="phoneNumber" className="text-lg font-medium">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="mt-[1em] w-full rounded-md border-none p-4 shadow-md"
                    placeholder="enter your phone number"
                  />
                </div>
                <div className="mt-[2em]">
                  <label htmlFor="message" className="text-lg font-medium">
                    Message
                  </label>
                  <div className="custom-ckeditor mt-[1em] flex w-full rounded-md border-none shadow-md">
                    <CKEditor
                      editor={ClassicEditor}
                      config={{
                        toolbar: [
                          "Bold",
                          "Italic",
                          "|",
                          "NumberedList",
                          "BulletedList",
                          "|",
                          "Outdent",
                          "Indent",
                        ],
                        placeholder: "Write something...",
                        removePlugins: ["CKEditorLogo"],
                      }}
                    />
                  </div>
                </div>
                <Primary className="mt-[1.5em] bg-text2 px-4 text-text5 lg:px-[2.5em] lg:py-3">
                  Send
                </Primary>
              </form>
            </div>

            <div className="relative sm:p-0 md:pl-[6em] lg:p-0">
              <img src={circle} alt="" className="block h-auto w-full" />
              <section className="absolute left-0 right-0 top-[25px] text-text5 sm:left-[2.5em] sm:right-[1em] md:left-[140px] md:right-[20px] md:p-[4em] lg:left-[20px] lg:right-[20px] lg:p-[2em]">
                <div className="flex flex-col sm:ml-[3.2em] sm:mt-[2em] sm:py-[2px] md:ml-[4em] md:gap-4 md:py-[1.5em] lg:ml-[4em] lg:py-[1.5em]">
                  <h1 className="text-lg font-semibold">Connect With Us</h1>
                  <div className="mt-2 flex items-center gap-4 rounded-md bg-fbg text-center sm:px-1 sm:py-2 md:px-3 md:py-5 lg:px-4 lg:py-3">
                    <FiPhoneCall size={20} />
                    <p>+234 809 322 7696</p>
                  </div>
                  <div className="mt-4 flex items-center gap-4 rounded-md bg-fbg text-center sm:px-1 sm:py-2 md:px-3 md:py-5 lg:px-4 lg:py-3">
                    <MdMedicalInformation size={20} fill="white" />
                    <p>info@Chainerative.com.ng</p>
                  </div>
                </div>
                <h1 className="text-lg font-semibold sm:mt-[1em] md:mt-[1.5em] lg:mt-[1.5em]">
                  Find Us
                </h1>
                <div className="mt-2 flex items-center gap-2 lg:mt-[1.5em]">
                  <CiLocationOn size={20} fill="white" />
                  <p className="text-sm font-medium">
                    No 9. Ogulano Street, Ikosi Ketu, Lagos. Nigeria
                  </p>
                </div>
                <div className="flex flex-row items-center gap-4 px-[2em] text-center sm:mt-[1.5em] md:mt-[4em] lg:mt-[3em] lg:gap-7">
                  <h1 className="text-lg font-semibold">Follow Us</h1>
                  <div className="flex flex-col items-center">
                    <div className="flex gap-4 lg:gap-[2em]">
                      <a
                        href="https://twitter.com/ChainCoop"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={tweeter} alt="twitter-img" />
                      </a>
                      <a
                        href="https://www.linkedin.com/company/chain-coop/?viewAsMember=true"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={linkdln} alt="linkedin-img" />
                      </a>
                    </div>
                    <a
                      href="https://medium.com/@Chain-Coop/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="ml-auto mt-2 flex justify-center lg:mt-0">
                        <img src={medium} alt="medium-img" />
                      </div>
                    </a>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <div className="sm:mt-[4em] lg:mt-[8em]">
            <FooterBox />
            <Footer />
          </div>
        </section>
      </main>
    </>
  );
};

export default Contact;
