import React, { useState, useRef } from "react";
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
import circle from "../../../Assets/png/contact/circle.png";
import { useDispatch } from "react-redux";
import { PublicContact } from "../../../shared/redux/slices/landing.slices";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";
import "../../../general.css";
import { AppDispatch } from "../../../shared/redux/store";
import { Button, Typography } from "@material-tailwind/react";
import FormInput from "../../common/FormInput";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_Number] = useState("");
  const [message, setMessage] = useState("");

  const dispatch: AppDispatch = useDispatch();
  const editorRef = useRef<ClassicEditor | null>(null);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const body = {
      name,
      phone_number,
      email,
      message,
    };

    dispatch(PublicContact(body))
      .unwrap()
      .then(() => {
        setName("");
        setEmail("");
        setPhone_Number("");
        setMessage("");
        if (editorRef.current) {
          editorRef.current.setData("");
        }
        setLoading(false);
        toast.success("Message sent");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error);
      });
  };

  return (
    <>
      <NavBar />
      <main className="h-auto bg-background font-sans">
        <section className="pt-8 md:pt-12 lg:pt-[4em]">
          <header className="mx-auto px-4 text-center sm:px-6 md:px-8 lg:w-[65%]">
            <p className="text-lg font-semibold text-text2">Get in touch</p>
            <h1 className="text-2xl font-semibold md:text-3xl lg:text-[2.5em]">
              CONTACT US
            </h1>
            <Typography
              variant="small"
              className="mt-2 font-normal tracking-tight"
            >
              Meet our Chain Coop, our business-oriented community designed into
              a cooperative with open membership, through Chain Wallet Simple,
              Safe and transparent way.
            </Typography>
          </header>

          <div className="mt-8 flex flex-col md:mt-12 lg:ml-auto lg:mt-[5em] lg:w-[90%] lg:flex-row">
            <div className="w-full px-4 sm:px-6 md:px-8 lg:w-[70%] lg:p-3">
              <form onSubmit={sendMessage} className="space-y-6">
                <FormInput
                  label="Name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  disabled={loading}
                  className="rounded-md"
                />
                <FormInput
                  label="Email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  autoComplete="new-email"
                  disabled={loading}
                  className="rounded-md"
                />

                <FormInput
                  label="Phone Number"
                  type="number"
                  onChange={(e) => setPhone_Number(e.target.value)}
                  placeholder="Enter your phone number"
                  disabled={loading}
                  className="rounded-md"
                />

                <label htmlFor="message" className="block text-lg font-medium">
                  Message
                </label>
                <div className="custom-ckeditor mt-2 w-full rounded-md border shadow-md focus:border-text2 focus:outline-none focus:ring-text2">
                  <CKEditor
                    editor={ClassicEditor}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setMessage(data);
                    }}
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

                <Button
                  type="submit"
                  loading={loading}
                  disabled={loading}
                  className="w-[12rem] bg-text2 px-8 py-3 text-sm normal-case text-text5 lg:px-[3em]"
                >
                  <Typography className="font-normal">
                    {!loading ? "Send" : ""}
                  </Typography>
                </Button>
              </form>
            </div>
            <div className="relative mt-12 w-full md:mt-16 lg:mt-0 lg:w-[500px]">
              <img src={circle} alt="" className="h-auto w-full" />

              <section className="absolute inset-0 flex items-center justify-center text-text5 lg:pb-[8em]">
                <div className="mx-auto w-[75%] space-y-4">
                  <div className="space-y-2">
                    <h1 className="ml-5 text-lg font-semibold">
                      Connect With Us
                    </h1>
                    <div className="flex items-center gap-2 rounded-md bg-fbg p-2">
                      <FiPhoneCall size={20} />
                      <p className="text-sm">+234 809 322 7696</p>
                    </div>
                    <div className="flex items-center gap-2 rounded-md bg-fbg p-2">
                      <MdMedicalInformation size={20} fill="white" />
                      <Typography variant="small">
                        info@Chainerative.com.ng
                      </Typography>
                    </div>
                  </div>

                  <div>
                    <h1 className="mb-1 text-lg font-semibold">Find Us</h1>
                    <div className="flex items-start gap-2">
                      <CiLocationOn size={20} fill="white" className="mt-1" />
                      <Typography variant="small">
                        No 9. Ogulano Street, Ikosi Ketu, Lagos. Nigeria
                      </Typography>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-start gap-3">
                      <h1 className="text-lg font-semibold">Follow Us</h1>
                      <div className="space-y-2">
                        <div className="flex gap-3">
                          <a
                            href="https://twitter.com/ChainCoop"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img src={tweeter} alt="twitter-img" />
                          </a>
                          <a
                            href="https://www.linkedin.com/company/chain-coop/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img src={linkdln} alt="linkedin-img" />
                          </a>
                        </div>
                        <div className="flex justify-center">
                          <a
                            href="https://medium.com/@Chain-Coop/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img src={medium} alt="medium-img" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <div className="mt-12 md:mt-16 lg:mt-[8em]">
            <Footer />
          </div>
        </section>
      </main>
    </>
  );
};

export default Contact;
