import { IoIosNotifications } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const rememberMe = sessionStorage.getItem("rememberMe") === "true";

    if (rememberMe) {
      const email = sessionStorage.getItem("email");
      const password = sessionStorage.getItem("password");
      sessionStorage.clear();
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("password", password);
      sessionStorage.setItem("rememberMe", true);
    } else {
      sessionStorage.clear();
    }

    navigate("/");
  };

  return (
    <section>
      <div>
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
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </header>
      </div>
    </section>
  );
};

export default Profile;
