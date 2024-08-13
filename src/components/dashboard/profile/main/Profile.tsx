import React from "react";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../../../../shared/utils/auth";
import { IoIosNotifications } from "react-icons/io";
import Avatar from "../avatar/Avatar";
import Details from "../profileDetails/main/Details";
import Security from "../security/Security";
import About from "../about/About";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <main className="font-sans">
      <section>
        <header className="flex h-[2.5em] w-full items-center justify-between bg-text2 px-[1.5em] font-sans text-xl font-semibold text-text5 lg:mt-[2em]">
          <div>
            <IoIosNotifications
              className="cursor-pointer fill-text3"
              size={27}
            />
          </div>
          <div>
            <h2>Profile</h2>
          </div>
          <div className="sm:hidden lg:block">
            <button
              className="rounded-full bg-text3 px-[1.8em] py-[2px] text-lg font-semibold text-text2"
              onClick={() => handleLogout(navigate)}
            >
              Logout
            </button>
          </div>
        </header>
      </section>
      <section className="m-auto mt-[2em] flex flex-col gap-[1em] px-4 lg:px-10">
        <Avatar />
        <Details />
        <Security />
        <About />
      </section>
    </main>
  );
};

export default Profile;
