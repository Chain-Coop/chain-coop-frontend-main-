import { IoIosArrowBack } from "react-icons/io";
import { DashboardHeader } from "../../../components/common/DashboardHeader";
import { useNavigate, useLocation } from "react-router";
import { Typography } from "@material-tailwind/react";
import { format } from "date-fns";
import { formatRelativeTime } from "../../../shared/utils/format";
import Members_Template from "../savings_detail/member_template";

interface Member {
  _id: string;
  userId: string;
  name?: string;
  contribution?: number;
  progress?: number;
  joined?: string;
  next_deposit?: string;
  last_deposit?: string;
}

const MembersPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};
  const members = Array.isArray(state.members) ? state.members : [];
  const createdBy = state.createdBy;
  const amount = state.amount;

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <main className="mb-[40px] flex flex-col gap-6 font-asap">
      <DashboardHeader
        className="relative cursor-pointer items-center lg:mt-[2em]"
        onClick={handleBackClick}
      >
        <IoIosArrowBack size={25} className="absolute left-0 cursor-pointer" />
        <div className="flex flex-grow items-center justify-center">
          <div className="tracking-wide">Members</div>
        </div>
      </DashboardHeader>

      <h3 className="mt-4 text-[20px] font-[600] tracking-tight text-[#1E1E1E]">
        All Members ({members.length})
      </h3>

      {members.length === 0 ? (
        <Typography className="text-center text-gray-500">
          No members found
        </Typography>
      ) : (
        <ul className="flex w-[100%] flex-col flex-wrap gap-3 3xl:flex-row">
          {members.map((member: Member, index: number) => (
            <Members_Template
              key={member._id || index}
              name={member.name || "John Doe"}
              userType={member.userId === createdBy ? "Admin" : "Member"}
              amount={
                typeof member.contribution === "number"
                  ? `$${member.contribution}`
                  : amount || "N/A"
              }
              progress={
                typeof member.progress === "number" ? member.progress : 0
              }
              index={index}
              showDelete={false}
            />
          ))}
        </ul>
      )}
    </main>
  );
};

export default MembersPage;
