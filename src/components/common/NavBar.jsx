import { HiOutlineBars3 } from "react-icons/hi2";
import { HiX } from "react-icons/hi";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../public/images/png/chain.png";
import { LoginButton } from "./Button";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Divider } from "@mui/material";
import PropTypes from "prop-types";

const navLinksData = [
  { to: "/", text: "Why Chain Coop" },
  { to: "/our-story", text: "Our Story" },
  { to: "/membership", text: "Membership" },
  { to: "/contact", text: "Contact" },
];

const NavBar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginClick = () => {
    navigate("/login");
  };
  return (
    <nav className="flex h-[75px] w-full items-center border-b border-text5 font-sans">
      <div className="mx-auto flex w-[92%] items-center justify-between">
        <Link to="/">
          <img src={logo} alt="Chain Co-op Logo" />
        </Link>
        <div className="flex items-center">
          <div className="mr-8 hidden flex-grow justify-center space-x-12 lg:flex">
            {navLinksData.map((link, index) => (
              <NavLink
                key={index}
                isActive={location.pathname === link.to}
                to={link.to}
              >
                {link.text}
              </NavLink>
            ))}
          </div>
        </div>
        <div className="flex flex-grow justify-end lg:hidden">
          <HiOutlineBars3
            className="cursor-pointer"
            size={30}
            onClick={() => setOpenMenu(!openMenu)}
          />
        </div>
        <div className="lg:hidden">
          <Drawer
            open={openMenu}
            onClose={() => setOpenMenu(false)}
            anchor="right"
          >
            <div className="flex h-full w-screen flex-col items-center justify-start">
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  padding: "1rem",
                }}
              >
                <HiX
                  className="cursor-pointer"
                  onClick={() => setOpenMenu(false)}
                  size={30}
                />
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                  alignItems: "center",
                  fontWeight: "10px",
                }}
              >
                <List>
                  {navLinksData.map((item, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemButton component={Link} to={item.to}>
                        <ListItemText
                          className="flex justify-center text-3xl font-extrabold"
                          primary={item.text}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                  <Divider />
                  <List>
                    <ListItem disablePadding>
                      <ListItemButton
                        component={Link}
                        to="/login"
                        onClick={() => setOpenMenu(false)}
                      >
                        <ListItemText
                          primary="Login"
                          className="flex justify-center text-xl font-bold"
                        />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </List>
              </Box>
            </div>
          </Drawer>
        </div>
        <div className="hidden lg:block">
          <LoginButton text="Login" onClick={handleLoginClick} />
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children, isActive }) => {
  return (
    <Link
      to={to}
      className={`mr-8 font-sans lg:ml-8 lg:mr-0 ${isActive ? "font-semibold text-text2" : ""}`}
    >
      {children}
    </Link>
  );
};

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default NavBar;
