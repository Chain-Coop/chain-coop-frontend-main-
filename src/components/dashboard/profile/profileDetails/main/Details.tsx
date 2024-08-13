import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Details = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "ID Verification",
      status: "0/2 verified",
      statusColor: "bg-red-600",
    },
    { title: "Accounts & Card" },
    { title: "Transactions", to: "/dashboard/profile/transactions" },
    { title: "Wallet Interest" },
    { title: "Account Statement" },
  ];

  return (
    <main className="mt-4 font-sans">
      <header>
        <h2 className="font-semibold text-howtext">PROFILE</h2>
      </header>
      <section className="mt-[1.2em]">
        {sections.map((section, index) => (
          <div
            key={index}
            className="mb-2 flex flex-col cursor-pointer"
            onClick={() => section.to && navigate(section.to)}
          >
            <hr className="h-[1px] rounded-full bg-gray-200" />
            <div className="flex items-center justify-between py-1">
              <span className="font-semibold">{section.title}</span>
              <div className="flex items-center">
                {section.status && (
                  <button
                    className={`rounded-full px-4 py-1 text-sm font-medium text-white shadow-md ${section.statusColor}`}
                  >
                    {section.status}
                  </button>
                )}
                <IoIosArrowForward size={15} className="text-text2" />
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Details;
