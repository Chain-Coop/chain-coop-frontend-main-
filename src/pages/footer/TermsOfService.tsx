import React from "react";
import Footer from "../../components/common/Footer";
import NavBar from "../../components/common/NavBar";
import { Terms } from "../../data/Data";

const TermsOfService: React.FC = () => {
  return (
    <main>
      <NavBar />
      <div className="min-h-screen bg-white">
        <div className="mx-auto px-4 py-12 lg:max-w-7xl">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold">Terms of Service</h1>
            <p className="text-gray-600">Effective Date: 09-12-2024</p>
          </div>

          <p className="mb-8 text-center text-[#1E1E1E]">
            Please read these terms of service carefully before accessing our
            platform. By accessing and/or using our services, you acknowledge
            that you have read, understood, and agree to be bound by these
            terms.
          </p>

          {Terms.map((section, index) => (
            <div key={index} className="mb-8">
              <h2 className="mb-4 text-2xl font-bold">{section.title}</h2>
              <p className="leading-relaxed text-[#1E1E1E]">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default TermsOfService;
