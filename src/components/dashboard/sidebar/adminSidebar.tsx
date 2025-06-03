import { Link, useLocation } from "react-router-dom";
import { adminSideBarLinks } from "../../../data/Data";

const AdminSidebar = () => {
  const location = useLocation();

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
      </nav>
    </aside>
  );
};

export default AdminSidebar;
