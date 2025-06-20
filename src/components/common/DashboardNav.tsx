import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { dashboardNav } from "../../data/Data";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Divider } from "@mui/material";
import { HiOutlineBars3 } from "react-icons/hi2";
import { HiX } from "react-icons/hi";
import logo from "./../../Assets/svg/cooplogo.svg";
import member from "../../Assets/jpg/membership/customer.jpg";
import investor from "../../Assets/jpg/membership/investor.jpg";
import { useUserProfile } from "../../shared/Hooks/useUserProfile";
import { Typography } from "@material-tailwind/react";
import { AppDispatch } from "../../shared/redux/store";
import { useDispatch } from "react-redux";
import { handleLoggout } from "../../shared/utils/auth";

const DashboardNav = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { profileDetails } = useUserProfile();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    handleLoggout(dispatch, navigate);
  };

  const getMembershipImage = () => {
    if (profileDetails?.membershipType === "patron") {
      return member;
    } else if (profileDetails?.membershipType === "investor members") {
      return investor;
    }
    return member;
  };

  const getButtonProps = () => {
    if (profileDetails?.membershipStatus === "inactive") {
      return { text: "Inactive", bgColor: "bg-yellow-500" };
    } else if (profileDetails?.membershipStatus === "active") {
      return { text: "Activated", bgColor: "bg-green-500" };
    }
    return { text: "Unknown", bgColor: "bg-gray-400" };
  };

  const { text, bgColor } = getButtonProps();

  const handleMenuClick = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-2 ">
        <img src={logo} alt="Chain Co-op Logo" />
        <HiOutlineBars3
          className="cursor-pointer lg:hidden"
          size={30}
          onClick={handleMenuClick}
        />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="left">
        <Box
          sx={{
            width: "100%",
            maxWidth: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          <img src={logo} alt="Chain Co-op Logo" />
          <HiX
            className="cursor-pointer"
            onClick={() => setOpenMenu(false)}
            size={30}
          />
        </Box>
        <Box
          sx={{ width: 300 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {dashboardNav.map((item, index) => {
              const isAjo = item.text === "Ajo";
              return (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    component={Link}
                    to={isAjo ? "#" : item.to}
                    onClick={isAjo ? (e) => e.preventDefault() : undefined}
                    className={`${isAjo ? "cursor-not-allowed opacity-50" : ""}`}
                  >
                    <img src={item.img} alt="imgs" />
                    <ListItemText
                      className="ml-2 font-extrabold"
                      primary={item.text}
                    />
                    {/* {isAjo && (
                      <Typography
                        variant="small"
                        className="ml-auto text-xs italic text-gray-500"
                      >
                        Coming Soon
                      </Typography>
                    )} */}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          <div>
            <div className="mt-[1em] px-4">
              <button
                className={`rounded-full ${bgColor} px-[2em] py-1  text-text3 shadow-md`}
              >
                {text}
              </button>
            </div>
            <div className="mt-[2em] px-1">
              <img
                src={getMembershipImage()}
                className=""
                alt="membership-card"
              />
            </div>
            <div className="mt-4 flex px-3">
              <p className=" text-sm text-howtext">
                This card grants you access to the Chain Coop Chain Network
                ecosystem. Once activated, it becomes non-transferable.
              </p>
            </div>
          </div>
          <Divider />
          <div className="mb-[2em] mt-[1em] px-4">
            <button
              onClick={handleLogout}
              className="rounded-full bg-red-600 px-[3em] py-1  text-text3 shadow-md"
            >
              Logout
            </button>
          </div>
        </Box>
      </Drawer>
    </div>
  );
};

export default DashboardNav;
