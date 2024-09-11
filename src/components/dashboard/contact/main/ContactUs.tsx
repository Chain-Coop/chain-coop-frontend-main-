import React, { useRef, useState } from 'react'
import { DashboardHeader } from '../../../common/DashboardHeader'
import { Primary } from "../../../../components/common/Button";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useAppDispatch } from '../../../../shared/redux/reduxHooks';
import { AppDispatch } from '../../../../shared/redux/store';
import { PublicContact } from '../../../../shared/redux/slices/landing.slices';
import { toast } from "react-toastify";
import ReactLoading from "react-loading";

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone_number, setPhone_Number] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const dispatch: AppDispatch = useAppDispatch();
  const editorRef = useRef<ClassicEditor | null>(null);
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const body = {
      name: name,
      phone_number: phone_number,
      email: email,
      message: message,
    };

    dispatch(PublicContact(body))
      .unwrap()
      .then(() => {
        setName("");
        setEmail("");
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
    <main className='font-sans mb-5'>
         <header className="sm:mt-[0] lg:mt-[2em]">
        <DashboardHeader className="flex items-center justify-center">
          Contact Us
        </DashboardHeader>
      </header>
        <section className='lg:px-[2em] sm:px-[1em] mt-[1.5em]'>
        <p>Send us a message and our term will respond in next 24hrs.</p>
        <form className='mt-[2em]' onSubmit={sendMessage}>
             <div>
                  <label htmlFor="name" className="text-lg font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    className="mt-[1em] w-full  rounded-md border-[1px] p-4 shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
                    placeholder="enter your name"
                  />
                </div>

                <div className="email mt-[2em]">
                  <label htmlFor="email" className="text-lg font-medium">
                    Email Address
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-[1em] w-full rounded-md  border-[1px] p-4 shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
                    placeholder="enter your e-mail"
                  />
                </div>


                <div className="mt-[2em]">
                  <label htmlFor="message" className="text-lg font-medium">
                    Message
                  </label>
                  <div className="custom-ckeditor mt-[1em]  flex w-full rounded-md border-[1px] shadow-md focus:border-text2 focus:outline-none focus:ring-text2">
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
                </div>
                <Primary
                  type="submit"
                  className="mt-[2em] bg-text2 rounded-md px-8 py-2 text-text5 lg:px-[2.5em] lg:py-2"
                >
                  {loading ? (
                    <ReactLoading
                      color="#FFFFFF"
                      width={25}
                      height={25}
                      type="spin"
                    />
                  ) : (
                    "Send"
                  )}
                </Primary>
              </form>
      </section>
    </main>
  )
}

export default ContactUs