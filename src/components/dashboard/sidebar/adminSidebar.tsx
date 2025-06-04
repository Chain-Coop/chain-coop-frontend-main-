import { Link, useLocation, useNavigate } from "react-router-dom";
import { adminSideBarLinks } from "../../../data/Data";
import { useDispatch } from "react-redux";
import { handleLoggout } from "../../../shared/utils/auth";
import { AppDispatch } from "../../../shared/redux/store";
import logout from "../../../../src/Assets/svg/logout.svg";
import { LogOut } from "lucide-react";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    handleLoggout(dispatch, navigate);
  };
  return (
    <aside className="font-outfit flex h-screen w-[19em] flex-col bg-white py-[1.5em]">
      <nav className="flex flex-grow flex-col justify-center px-5">
        {adminSideBarLinks?.map((link, index) => {
          const isActive = link.pathsToCheck.some((path) =>
            location.pathname.startsWith(path),
          );

          return (
            <Link
              key={index}
              to={link.to}
              className={`flex items-center px-4 py-3 text-[14px] ${
                isActive ? "font-bold text-text2" : "text-gray-500"
              }`}
            >
              <img
                src={isActive ? link.imgActive : link.img}
                alt={link?.text}
                className="mr-3"
              />
              {link?.text}
            </Link>
          );
        })}
        <a
          href="#"
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-[14px] text-gray-500"
        >
          <LogOut />
          Logout
        </a>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
