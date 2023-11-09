import { useState } from "react";
import { logo } from "../assets";
import { links } from "../assets/constants";
import { NavLink } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { RiCloseLine } from "react-icons/ri";

const Sidebar = ({ handleClick }) => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const NavLinks = () => (
    <div className=" mt-10  ">
      {links.map((item) => (
        <NavLink
          key={item.name}
          to={item.to}
          className=" flex flex-row justify-start items-center text-sm my-8 text-gray-300 hover:text-cyan-400"
          onClick={handleClick && handleClick()}
        >
          <item.icon className=" w-6 h-6 mr-3 " />
          {item.name}
        </NavLink>
      ))}
      s
    </div>
  );

  return (
    <>
      <div className="md:flex hidden w-[240px] flex-col py-10 px-4 bg-[#191634]">
        <img src={logo} alt="logo" className=" w-full h-14 object-contain" />
        <NavLinks />
      </div>
      <div className=" absolute md:hidden block top-6 right-3">
        {mobileMenu ? (
          <RiCloseLine
            className=" w-6 h-6 text-gray-300"
            onClick={() => setMobileMenu(false)}
          />
        ) : (
          <HiOutlineMenu
            className=" w-6 h-6 text-gray-300"
            onClick={() => setMobileMenu(true)}
          />
        )}
      </div>
      <div
        className={`md:hidden absolute top-3 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 transition-all ${
          mobileMenu ? "left-0" : " left-[-100%]"
        }`}
      >
        <img src={logo} alt="logo" className=" w-full h-14 object-contain" />
        <NavLinks onClick={() => setMobileMenu(false)} />
      </div>
    </>
  );
};

export default Sidebar;
