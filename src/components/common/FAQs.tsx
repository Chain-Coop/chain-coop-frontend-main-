import { useState } from "react";
import { Link } from "react-router-dom";
import { faqData } from "../../data/Data";

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="from-slate-50 relative min-h-screen overflow-hidden bg-gradient-to-br via-blue-50 to-indigo-100 py-12 sm:py-16 lg:py-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 h-48 w-48 animate-pulse rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-3xl sm:h-64 sm:w-64 lg:h-80 lg:w-80"></div>
        <div className="absolute -bottom-20 -left-20 h-48 w-48 animate-pulse rounded-full bg-gradient-to-br from-indigo-400/20 to-cyan-400/20 blur-3xl delay-1000 sm:h-64 sm:w-64 lg:h-80 lg:w-80"></div>
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-gradient-to-br from-purple-400/10 to-pink-400/10 blur-3xl delay-500 sm:h-80 sm:w-80 lg:h-96 lg:w-96"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center sm:mb-12 lg:mb-16">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg sm:h-14 sm:w-14 lg:h-16 lg:w-16">
              <svg
                className="h-6 w-6 text-white sm:h-7 sm:w-7 lg:h-8 lg:w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-2xl font-bold leading-tight text-transparent sm:text-3xl lg:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg lg:text-xl">
              Find answers to common questions about Chain Coop membership and
              platform usage. We're here to help you understand everything you
              need to know.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {faqData.map((faq, index) => (
              <div key={index} className="group relative">
                <div className="relative rounded-2xl border border-white/20 bg-white/70 shadow-xl backdrop-blur-xl transition-all duration-500 hover:scale-[1.01] hover:bg-white/80 hover:shadow-2xl sm:hover:scale-[1.02]">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100"></div>

                  <button
                    onClick={() => toggleAccordion(index)}
                    className="relative w-full rounded-2xl px-4 py-4 text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-transparent sm:px-6 sm:py-5 lg:px-8 lg:py-6"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg sm:h-9 sm:w-9 lg:h-10 lg:w-10">
                          <span className="text-xs font-bold text-white sm:text-sm">
                            Q{index + 1}
                          </span>
                        </div>
                        <h3 className="pr-2 text-base font-bold leading-relaxed text-gray-900 sm:text-lg">
                          {faq.question}
                        </h3>
                      </div>
                      <div className="ml-2 flex-shrink-0 sm:ml-4">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-md transition-all duration-300 sm:h-11 sm:w-11 lg:h-12 lg:w-12 ${openIndex === index ? "rotate-180 bg-gradient-to-br from-blue-100 to-purple-100" : ""}`}
                        >
                          <svg
                            className="h-5 w-5 text-gray-600 sm:h-5 sm:w-5 lg:h-6 lg:w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-out ${
                      openIndex === index
                        ? "max-h-96 pb-6 opacity-100 sm:pb-8"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-4 sm:px-6 lg:px-8">
                      <div className="border-gradient-to-r border-t from-blue-200 via-purple-200 to-pink-200 pt-4 sm:pt-6">
                        <div className="rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 p-4 shadow-inner sm:p-6">
                          <p className="text-sm leading-relaxed text-gray-700 sm:text-base lg:text-lg">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 sm:mt-16 lg:mt-20">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-8 text-center shadow-2xl sm:p-10 lg:p-12">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              <div className="absolute left-0 top-0 h-full w-full opacity-10">
                <div className="absolute left-4 top-4 h-24 w-24 rounded-full border-2 border-white/30 sm:h-28 sm:w-28 lg:h-32 lg:w-32"></div>
                <div className="absolute bottom-4 right-4 h-16 w-16 rounded-full border-2 border-white/30 sm:h-20 sm:w-20 lg:h-24 lg:w-24"></div>
                <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-white/30 sm:h-36 sm:w-36 lg:h-40 lg:w-40"></div>
              </div>

              <div className="relative z-10">
                <div className="sm:h-18 sm:w-18 mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 shadow-xl backdrop-blur-sm lg:h-20 lg:w-20">
                  <svg
                    className="h-8 w-8 text-white sm:h-9 sm:w-9 lg:h-10 lg:w-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>

                <h3 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
                  Still have questions?
                </h3>
                <p className="mx-auto mb-6 max-w-xl text-base leading-relaxed text-blue-100 sm:text-lg">
                  Our dedicated team is here to help you understand more about
                  Chain Coop membership and benefits. Get personalized support
                  whenever you need it.
                </p>

                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <button className="group relative transform rounded-2xl bg-white px-6 py-3 font-bold text-blue-600 shadow-xl transition-all duration-300 hover:scale-105 hover:bg-blue-50 hover:shadow-2xl sm:px-8 sm:py-4">
                    <Link to="/contact">
                      <span className="relative z-10">Contact Support</span>
                    </Link>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQs;
