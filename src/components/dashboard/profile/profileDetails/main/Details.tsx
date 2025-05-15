import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import TierOneFirstModal from "../kyc/teirOne/phoneNumber/TierOneFirstModal";
import { Typography } from "@material-tailwind/react";
import Success from "../../../../common/Success";
import UpdateBvnModal from "../kyc/teirTwo/bvn/UpdateBvnModal";
import { useUserProfile } from "../../../../../shared/Hooks/useUserProfile";

const Details = () => {
  const navigate = useNavigate();
  const { profileDetails } = useUserProfile();
  const [showTierOneModal, setShowTierOneModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [showBvnFirstModal, setShowBvnFirstModal] = useState(false);

  const sections = [
    {
      title: profileDetails?.isVerified ? (
        "Manage Limit"
      ) : (
        <div className="flex w-full items-center justify-between">
          <span>ID Verification</span>
          <button className="rounded-full bg-red-600 px-4 py-1 text-sm font-medium text-white shadow-md">
            {profileDetails?.isVerified ? "1/2 verified" : "0/2 verified"}
          </button>
        </div>
      ),
      description: profileDetails?.isVerified ? (
        <div className="flex items-center justify-between gap-[1em]">
          <Typography variant="small" className="font-normal text-gray-500">
            Daily Credit Limit: N20,000 Daily withdrawal Limit: N500
          </Typography>
          <div className="flex items-center gap-2">
            <button className="rounded-full bg-[#FF0000] px-[1em] py-[2px] font-semibold text-white">
              Upgrade
            </button>
          </div>
        </div>
      ) : null,
      onClick: () => setShowTierOneModal(true),
    },
    {
      title: "Accounts & Card",
      to: "/dashboard/profile/manage-cards",
    },
  ];

  const handleModalClose = () => {
    setShowTierOneModal(false);
    setShowSuccessModal(false);
    setShowBvnFirstModal(false);
  };

  const handleBvnStepClick = () => {
    setShowTierOneModal(false);
    setShowBvnFirstModal(true);
  };

  const handleSectionClick = (section: any) => {
    if (section.to) {
      navigate(section.to);
    } else if (section.onClick) {
      section.onClick();
    }
  };

  return (
    <main className="mt-4">
      <header>
        <Typography
          variant="h5"
          className="text-md font-bold uppercase text-[#B3B3B3]"
        >
          profile
        </Typography>
      </header>
      <section className="mt-[1.2em]">
        {sections?.map((section, index) => (
          <div
            key={index}
            className="mb-2 flex cursor-pointer flex-col"
            onClick={() => handleSectionClick(section)}
          >
            <hr className="h-[1px] rounded-full bg-gray-200" />
            <div className="flex w-full items-center justify-between py-1">
              <div className="flex w-full flex-col">
                <div className="font-semibold">{section.title}</div>
                {section.description}
              </div>
              <div className="ml-2 flex items-center">
                <IoIosArrowForward size={20} className="text-black" />
              </div>
            </div>
          </div>
        ))}
      </section>

      <TierOneFirstModal
        isOpen={showTierOneModal}
        onClose={handleModalClose}
        onBvnStepClick={handleBvnStepClick}
        isVerified={profileDetails?.isVerified ?? false}
      />
      <UpdateBvnModal isOpen={showBvnFirstModal} onClose={handleModalClose} />
      <Success
        isOpen={showSuccessModal}
        onClose={handleModalClose}
        title="Your phone number has now been verified you are now in Teir 0."
      />
    </main>
  );
};

export default Details;
