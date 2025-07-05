import { useState } from "react";
import { Link } from "react-router-dom";

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "Who can join Chain Coop?",
      answer:
        "Only individuals who have been approved as members of the cooperative can access our services. The general public is not permitted to use this platform.",
    },
    {
      question: "Is this a financial platform?",
      answer:
        "No. Chain Coop is not a financial institution. We are a registered cooperative society focused on member engagement and community activities.",
    },
    {
      question: "How do I become a member?",
      answer:
        "Membership requires completing a registration process and submitting valid identification. Once approved, you gain access to member-only tools and events.",
    },
    {
      question: "What can members do on the platform?",
      answer:
        "Members can connect, collaborate, and participate in cooperative programs and initiatives aimed at building communal progress.",
    },
    {
      question: "Can non-members view or join activities?",
      answer:
        "No. All activities and opportunities shared on the platform are exclusive to registered members only.",
    },
  ];

  const toggleAccordion = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="from-slate-50 relative min-h-screen overflow-hidden bg-gradient-to-br via-blue-50 to-indigo-100 py-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-80 w-80 animate-pulse rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 animate-pulse rounded-full bg-gradient-to-br from-indigo-400/20 to-cyan-400/20 blur-3xl delay-1000"></div>
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-gradient-to-br from-purple-400/10 to-pink-400/10 blur-3xl delay-500"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:max-w-7xl lg:px-0">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
              <svg
                className="h-8 w-8 text-white"
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
            <h2 className="mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-3xl font-bold leading-tight text-transparent md:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
              Find answers to common questions about Chain Coop membership and
              platform usage. We're here to help you understand everything you
              need to know.
            </p>
          </div>

          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <div key={index} className="group relative">
                <div className="relative rounded-2xl border border-white/20 bg-white/70 shadow-xl backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/80 hover:shadow-2xl">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100"></div>

                  <button
                    onClick={() => toggleAccordion(index)}
                    className="relative w-full rounded-2xl px-8 py-6 text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-transparent"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                          <span className="text-sm font-bold text-white">
                            Q{index + 1}
                          </span>
                        </div>
                        <h3 className="pr-4 text-lg font-bold leading-relaxed text-gray-900">
                          {faq.question}
                        </h3>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-md transition-all duration-300 ${openIndex === index ? "rotate-180 bg-gradient-to-br from-blue-100 to-purple-100" : ""}`}
                        >
                          <svg
                            className="h-6 w-6 text-gray-600"
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
                        ? "max-h-96 pb-8 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-8">
                      <div className="border-gradient-to-r border-t from-blue-200 via-purple-200 to-pink-200 pt-6">
                        <div className="rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 p-6 shadow-inner">
                          <p className="text-lg leading-relaxed text-gray-700">
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

          <div className="mt-20">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-12 text-center shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              <div className="absolute left-0 top-0 h-full w-full opacity-10">
                <div className="absolute left-8 top-8 h-32 w-32 rounded-full border-2 border-white/30"></div>
                <div className="absolute bottom-8 right-8 h-24 w-24 rounded-full border-2 border-white/30"></div>
                <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-white/20"></div>
              </div>

              <div className="relative z-10">
                <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 shadow-xl backdrop-blur-sm">
                  <svg
                    className="h-10 w-10 text-white"
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

                <h3 className="mb-4 text-3xl font-bold text-white">
                  Still have questions?
                </h3>
                <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-blue-100">
                  Our dedicated team is here to help you understand more about
                  Chain Coop membership and benefits. Get personalized support
                  whenever you need it.
                </p>

                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <button className="group relative transform rounded-2xl bg-white px-8 py-4 font-bold text-blue-600 shadow-xl transition-all duration-300 hover:scale-105 hover:bg-blue-50 hover:shadow-2xl">
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
