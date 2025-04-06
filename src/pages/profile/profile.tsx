import { Link, useNavigate } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import { Button, Typography } from "@material-tailwind/react";
import { useAllNotification } from "../../shared/Hooks/useUserProfile";
import { handleLogout } from "../../shared/utils/auth";
import Avatar from "../../components/dashboard/profile/avatar/Avatar";
import Details from "../../components/dashboard/profile/profileDetails/main/Details";
import Security from "../../components/dashboard/profile/security/Security";
import { DashboardHeader } from "../../components/common/DashboardHeader";
import IdVerification from "../../components/dashboard/profile/idVerification/idVerification";

const Profile = () => {
  const navigate = useNavigate();
  const { totalCount } = useAllNotification();

  return (
    <main>
      <section>
        <DashboardHeader className="flex items-center justify-between px-10 text-2xl  md:text-3xl lg:mt-[2em] lg:text-xl">
          <Link to="/dashboard/notification">
            <button
              className="relative inline-flex items-center"
              aria-label="View notifications"
            >
              <IoIosNotifications
                className="cursor-pointer"
                size={27}
                fill="white"
                aria-hidden="true"
              />
              {totalCount > 0 && (
                <span className="absolute -right-2 -top-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {totalCount > 99 ? "99+" : totalCount}
                </span>
              )}
            </button>
          </Link>
          <div>
            <Typography className="text-md font-semibold">Profile</Typography>
          </div>
          <div className="sm:hidden lg:block">
            <Button
              className="rounded-full bg-text3 px-[1.8em] py-[2px] text-sm font-bold text-text2"
              onClick={() => handleLogout(navigate)}
            >
              Logout
            </Button>
          </div>
        </DashboardHeader>
      </section>
      <section className="mt-[2em] flex flex-col gap-[1em] px-4 lg:px-6">
        <Avatar />
        <IdVerification />
        <Details />
        <Security />
      </section>
    </main>
  );
};

export default Profile;
