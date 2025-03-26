interface SubSection {
  title?: string;
  content?: string;
  list?: string[];
  footer?: string;
}

interface Section {
  title: string;
  content?: string | string[];
  list?: string[];
  sections?: SubSection[];
  footer?: string;
}

import React from "react";
import NavBar from "../../components/common/NavBar";
import Footer from "../../components/common/Footer";
import { PrivacyData } from "../../data/Data";

const PrivacyPolicy: React.FC = () => {
  return (
    <main>
      <NavBar />
      <div className="min-h-screen bg-white">
        <div className="mx-auto px-4 py-12 lg:max-w-7xl">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold">Privacy Policy</h1>
            <p className="text-gray-600">Effective Date: 09-12-2024</p>
          </div>

          {PrivacyData.map((section: Section, index) => (
            <div key={index} className="mb-8">
              <h2 className="mb-4 text-2xl font-bold">{section.title}</h2>

              {section.content &&
                (typeof section.content === "string" ? (
                  <p className="text-[#1E1E1E]">{section.content}</p>
                ) : (
                  <div className="space-y-3">
                    {section.content.map((item, idx) => (
                      <p key={idx} className="text-[#1E1E1E]">
                        {item}
                      </p>
                    ))}
                  </div>
                ))}

              {section.list && (
                <ul className="mt-4 list-disc space-y-2 pl-5">
                  {section.list.map((item, idx) => (
                    <li key={idx} className="text-[#1E1E1E]">
                      {item}
                    </li>
                  ))}
                </ul>
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

                      {subsection.content && (
                        <p className="mb-2 text-[#1E1E1E]">
                          {subsection.content}
                        </p>
                      )}

                      {subsection.list && (
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

              {section.footer && (
                <p className="mt-4 text-[#1E1E1E]">{section.footer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default PrivacyPolicy;
