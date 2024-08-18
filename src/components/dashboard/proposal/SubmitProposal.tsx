import React from "react";
import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";
import { DashboardHeader } from "../../common/DashboardHeader";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router";
import { AppDispatch } from "../../../shared/redux/store";
import { FaCircleQuestion } from "react-icons/fa6";
import { sendProposal } from "../../../shared/redux/slices/transaction.slices";

const SubmitProposal = () => {
  const [fullName, setFullName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [document, setDocument] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const userToken = sessionStorage.getItem("userData");

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleDocumentChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedDocument = e.target.files ? e.target.files[0] : null;
    setDocument(selectedDocument);
  };

  const submitProposal = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("title", title);
    formData.append("description", description);
    if (document) {
      formData.append("document", document);
    }

    try {
      await dispatch(sendProposal(formData)).unwrap();
      setLoading(false);
      toast.success("Proposal submitted successfully!");
      setFullName("");
      setTitle("");
      setDescription("");
      setDocument(null);
    } catch (error) {
      console.log("Error", error);
      setLoading(false);
      const errorMessage =
        (error as any).message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <main className="mb-[2em] font-sans">
      <div className="mt-8">
        <header className="mt-[2em]">
          <DashboardHeader className="cursor-pointer" onClick={handleBackClick}>
            <div className="flex w-[55%] cursor-pointer items-center justify-between">
              <IoIosArrowBack size={25} className="cursor-pointer" />
              <div className="tracking-wide">Proposal</div>
            </div>
          </DashboardHeader>
        </header>
        <form
          onSubmit={submitProposal}
          className="mx-auto mt-8 font-sans sm:px-[1.5em] lg:w-[31em] lg:px-0"
        >
          <div className="mb-4">
            <h2 className="text-lg font-bold">Submit a Proposal</h2>
          </div>
          <div className="mt-[2em]">
            <label htmlFor="title" className="font-semibold">
              Full Name
            </label>
            <div>
              <input
                type="text"
                id="title"
                placeholder="Your full name here"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-[1em] h-12 w-full rounded-lg border-fade pl-4 shadow-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-fade"
                required
              />
            </div>
          </div>
          <div className="mt-[2em]">
            <label htmlFor="title" className="font-semibold">
              Proposal Title
            </label>
            <div>
              <input
                type="text"
                id="title"
                placeholder="Proposal title text here"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-[1em] h-12 w-full rounded-lg border-fade pl-4 shadow-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-fade"
                required
              />
            </div>
          </div>
          <div className="relative mt-[2em]">
            <label htmlFor="description" className="font-sans font-semibold">
              Description
            </label>
            <div className="relative mt-[1em]">
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-[0.5em] h-[15em] w-full rounded-lg border border-gray-300 p-[0.5em] font-sans shadow-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-fade"
                placeholder="Enter description here"
                required
              ></textarea>
            </div>
          </div>
          <div className="relative mt-[2em]">
            <label htmlFor="attachment" className="font-semibold">
              Attachment
            </label>
            <input
              type="file"
              id="attachment"
              onChange={handleDocumentChange}
              className="absolute inset-0 cursor-pointer opacity-0"
            />
            <div className="mt-[1em] flex h-12 w-full items-center rounded-lg border-2 border-dashed border-text2 pl-4 font-semibold placeholder-text2 shadow-md">
              {document ? (
                <span className="truncate">{document.name}</span>
              ) : (
                <span className="text-gray-500">Upload a document</span>
              )}
            </div>
          </div>
          <section className="mt-[2em]">
            <button
              type="submit"
              className="rounded-full bg-text2 px-[2.5em] py-[5px] font-sans text-text3"
            >
              {loading ? (
                <ReactLoading
                  color="#FFFFFF"
                  width={25}
                  height={25}
                  type="spin"
                />
              ) : (
                "Submit"
              )}
            </button>
          </section>
        </form>
      </div>
    </main>
  );
};

export default SubmitProposal;
