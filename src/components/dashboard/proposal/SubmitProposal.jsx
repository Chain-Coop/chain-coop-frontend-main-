import { useState } from "react";
import { useDispatch } from "react-redux";
import { SendProposal } from "../../../shared/redux/slices/transaction.slices";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";
import { DashboardHeader } from "../../common/DashboardHeader";

const SubmitProposal = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [document, setDocument] = useState(null); // Store the document
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const userToken = sessionStorage.getItem("userData");

  // Handle document input change
  const handleDocumentChange = (e) => {
    const selectedDocument = e.target.files[0];
    if (selectedDocument) {
      setDocument(selectedDocument); // Store the document object
    }
  };

  const submitProposal = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!userToken) {
      setLoading(false);
      toast.error("User token is missing. Please log in.");
      return;
    }

    const proposalData = {
      title,
      description,
      document: document ? document.name : null, // or other relevant data if needed
    };

    try {
      await dispatch(SendProposal(proposalData)).unwrap();
      setLoading(false);
      toast.success("Proposal submitted successfully!");
    } catch (error) {
      setLoading(false);
      const errorMessage =
        error.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    }
  };

  // const submitProposal = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   if (!userToken) {
  //     setLoading(false);
  //     toast.error("User token is missing. Please log in.");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("title", title);
  //   formData.append("description", description);
  //   if (document) formData.append("document", document);

  //   try {
  //     const response = await dispatch(SendProposal(formData)).unwrap();
  //     setLoading(false);
  //     toast.success("Proposal submitted successfully!");

  //     // Check the documentUrl from response
  //     const documentUrl = response.proposal?.documentUrl;
  //     if (documentUrl) {
  //       console.log("Document URL:", documentUrl); // Log the URL for debugging
  //     } else {
  //       console.warn("Document URL is empty");
  //     }

  //     // Reset the form fields
  //     setTitle("");
  //     setDescription("");
  //     setDocument(null); // Clear the document input
  //     // Reset the file input by updating the key
  //     document.getElementById("attachment").value = null;
  //   } catch (error) {
  //     setLoading(false);
  //     const errorMessage =
  //       error.message || "An error occurred. Please try again.";
  //     toast.error(errorMessage);
  //   }
  // };

  return (
    <main className="mb-[2em] font-sans">
      <div className="mt-8">
        <header>
          <DashboardHeader className="flex items-center justify-center">
            Submit a Proposal
          </DashboardHeader>
        </header>
        <form
          onSubmit={submitProposal}
          className="mx-auto mt-8 font-sans sm:px-[1.5em] lg:w-[31em] lg:px-0"
        >
          <div className="mb-4">
            <h2 className="text-lg font-bold">Submit a Proposal</h2>
          </div>
          <div>
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
