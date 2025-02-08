import React from "react";
import { Terms } from "../../../data/Data";
import NavBar from "../../common/NavBar";
import Footer from "../../common/Footer";

const TermsOfService: React.FC = () => {
  return (
    <main>
      <NavBar />
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold">Terms of Service</h1>
            <p className="text-gray-600">Effective Date: 09-12-2024</p>
          </div>

          <p className="mb-8 text-center text-[#1E1E1E]">
            Please read these terms of service carefully before accessing our
            website, <span className="text-purple-600">chaincoop.org</span>{" "}
            ("Site"), and using any of our services. These Terms of Service
            govern your access to and use of the Site, which provides
            information about Chain Co-op, its services, and membership. By
            accessing and/or using the Site, you acknowledge that you have read,
            understood, and agree to be bound by these terms.
          </p>

          {Terms.map((section, index) => (
            <div key={index} className="mb-8">
              <h2 className="mb-4 text-2xl font-bold">{section.title}</h2>

              {typeof section.content === "string" && (
                <p className="text-[#1E1E1E]">{section.content}</p>
              )}

              {Array.isArray(section.content) &&
                section.content.every((item) => typeof item === "string") && (
                  <div className="space-y-3">
                    {section.content.map((item, idx) => (
                      <p key={idx} className="text-[#1E1E1E]">
                        {item}
                      </p>
                    ))}
                  </div>
                )}

              {Array.isArray(section.content) &&
                section.content.some(
                  (item) => typeof item === "object" && "term" in item,
                ) && (
                  <div className="space-y-4">
                    {section.content.map((item: any, idx) => (
                      <div key={idx} className="flex flex-col space-y-1">
                        <p className="text-[#1E1E1E]">
                          <span className="font-bold text-black">
                            {item.term}
                          </span>{" "}
                          {item.definition}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

              {section.sections && (
                <div className="mt-4 space-y-6">
                  {section.sections.map((subsection, subIndex) => (
                    <div key={subIndex}>
                      {subsection.title && (
                        <h3 className="mb-3 text-xl font-semibold">
                          {subsection.title}
                        </h3>
                      )}

                      {typeof subsection.content === "string" ? (
                        <p className="mb-2 text-[#1E1E1E]">
                          {subsection.content}
                        </p>
                      ) : (
                        Array.isArray(subsection.content) && (
                          <div className="space-y-3">
                            {subsection.content.map((item, i) => (
                              <p key={i} className="text-[#1E1E1E]">
                                {item}
                              </p>
                            ))}
                          </div>
                        )
                      )}

                      {Array.isArray(subsection.list) && (
                        <ul className="mb-3 list-disc space-y-2 pl-5">
                          {subsection.list.map((item, i) => (
                            <li key={i} className="text-[#1E1E1E]">
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}

                      {subsection.footer && (
                        <p className="mt-2 text-[#1E1E1E]">
                          {subsection.footer}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default TermsOfService;
