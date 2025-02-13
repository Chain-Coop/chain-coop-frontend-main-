import React from "react";
import { Terms } from "../../../data/Data";
import NavBar from "../../common/NavBar";
import Footer from "../../common/Footer";

type Link = {
  text: string;
  url: string;
};

const parseTextWithLinks = (text: string): (string | Link)[] => {
  const result: (string | Link)[] = [];
  const linkPattern =
    /(?:https:\/\/)?(?:www\.)?chaincoop\.org(?:\/[a-zA-Z0-9-/]*)?|\(https:\/\/(?:www\.)?chaincoop\.org(?:\/[a-zA-Z0-9-/]*)?\)/g;

  let lastIndex = 0;
  let match;

  while ((match = linkPattern.exec(text)) !== null) {
    if (match?.index > lastIndex) {
      result.push(text.slice(lastIndex, match.index));
    }

    const matchedText = match?.[0] ?? "";
    const isWrappedInParentheses =
      matchedText.startsWith("(") && matchedText.endsWith(")");
    const url = isWrappedInParentheses
      ? matchedText.slice(1, -1)
      : matchedText.startsWith("http")
        ? matchedText
        : `https://${matchedText}`;

    result.push({
      text: isWrappedInParentheses ? matchedText.slice(1, -1) : matchedText,
      url,
    });

    lastIndex = (match?.index ?? 0) + matchedText.length;
  }

  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex));
  }

  return result;
};

const LinkRenderer = ({ content }: { content: string | Link }) => {
  if (typeof content === "string") {
    return <span>{content}</span>;
  }

  return (
    <a
      href={content.url}
      className="text-purple-600 underline transition-colors hover:text-purple-800"
      target="_blank"
      rel="noopener noreferrer"
    >
      {content.text}
    </a>
  );
};

const TextWithLinks = ({ text }: { text: string }) => {
  const parsedContent = parseTextWithLinks(text);
  return (
    <>
      {parsedContent.map((content, index) => (
        <LinkRenderer key={index} content={content} />
      ))}
    </>
  );
};

const TermsOfService: React.FC = () => {
  const renderContent = (content: any) => {
    if (typeof content === "string") {
      return <TextWithLinks text={content} />;
    }

    if (Array.isArray(content)) {
      if (content.every((item) => typeof item === "string")) {
        return (
          <div className="space-y-3">
            {content.map((item, idx) => (
              <p key={idx} className="text-[#1E1E1E]">
                <TextWithLinks text={item} />
              </p>
            ))}
          </div>
        );
      }

      if (content.some((item) => typeof item === "object" && "term" in item)) {
        return (
          <div className="space-y-4">
            {content.map((item: any, idx) => (
              <div key={idx} className="flex flex-col space-y-1">
                <p className="text-[#1E1E1E]">
                  <span className="font-bold text-black">
                    <TextWithLinks text={item.term} />
                  </span>{" "}
                  <TextWithLinks text={item.definition} />
                </p>
              </div>
            ))}
          </div>
        );
      }
    }

    return null;
  };

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
            website,{" "}
            <a
              href="https://www.chaincoop.org"
              className="text-purple-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              chaincoop.org
            </a>{" "}
            ("Site"), and using any of our services. These Terms of Service
            govern your access to and use of the Site, which provides
            information about Chain Co-op, its services, and membership. By
            accessing and/or using the Site, you acknowledge that you have read,
            understood, and agree to be bound by these terms.
          </p>

          {Terms.map((section, index) => (
            <div key={index} className="mb-8">
              <h2 className="mb-4 text-2xl font-bold">{section.title}</h2>

              {renderContent(section.content)}

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
                          <TextWithLinks text={subsection.content} />
                        </p>
                      ) : (
                        Array.isArray(subsection.content) && (
                          <div className="space-y-3">
                            {subsection.content.map((item, i) => (
                              <p key={i} className="text-[#1E1E1E]">
                                <TextWithLinks text={item} />
                              </p>
                            ))}
                          </div>
                        )
                      )}

                      {Array.isArray(subsection.list) && (
                        <ul className="mb-3 list-disc space-y-2 pl-5">
                          {subsection.list.map((item, i) => (
                            <li key={i} className="text-[#1E1E1E]">
                              <TextWithLinks text={item} />
                            </li>
                          ))}
                        </ul>
                      )}

                      {subsection.footer && (
                        <p className="mt-2 text-[#1E1E1E]">
                          <TextWithLinks text={subsection.footer} />
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
