import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { handleLogout } from "../../shared/utils/auth";
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
import membership from "../../Assets/jpg/membership/customer.jpg";

const DashboardNav = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div className="px-5 py-2">
      <div className="flex items-center justify-between font-sans">
        <img src={logo} alt="Chain Co-op Logo" />
        <HiOutlineBars3
          className="cursor-pointer lg:hidden"
          size={30}
          onClick={handleMenuClick}
        />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{
            width: "100%",
            maxWidth: "100%",
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            padding: "1rem",
            position: "relative",
          }}
        >
          <HiX
            className="cursor-pointer"
            onClick={() => setOpenMenu(false)}
            size={30}
            style={{ position: "absolute", top: "10px", right: "10px" }}
          />
        </Box>
        <Box
          sx={{ width: 300 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {dashboardNav.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton component={Link} to={item.to}>
                  <img src={item.img} alt="imgs" />
                  <ListItemText
                    className="ml-2 font-extrabold"
                    primary={item.text}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <div>
            <div className="mt-[1em] px-4">
              <button className="cursor-not-allowed rounded-full bg-act px-[2em] py-1 font-sans text-text3 shadow-md">
                Activated
              </button>
            </div>
            <div className="mt-[2em] px-1">
              <img src={membership} className="" alt="membership-card" />
            </div>
            <div className="mt-4 flex px-3">
              <p className="font-sans text-sm text-howtext">
                This card grant you access to the chain Coop Chain Network
                ecosystem. Once Activated, it becomes non-transferable
              </p>
            </div>
          </div>
          <Divider />
          <div className="mb-[2em] mt-[1em] px-4">
            <button
              onClick={() => handleLogout(navigate)}
              className="rounded-full bg-red-600 px-[3em] py-1 font-sans text-text3 shadow-md"
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
