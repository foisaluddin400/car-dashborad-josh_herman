
import logo from "../../assets/header/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaChevronRight, FaHome } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { logout } from "../../page/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { FiUser } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { TbCategory2 } from "react-icons/tb";
import items from "../item.json";
import { LiaUsersCogSolid } from "react-icons/lia";
import { GiCarrion, GiKnightBanner } from "react-icons/gi";
import { BsJournalBookmark } from "react-icons/bs";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const icons = {
  FaHome,
  FiUser,
  LiaUsersCogSolid,
  GiCarrion,
  BsJournalBookmark,
  MdOutlineAdminPanelSettings,
  GiKnightBanner,
  TbCategory2,
  IoSettingsOutline,
};


const SidBar = () => {
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [expandedKeys, setExpandedKeys] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const contentRef = useRef({});
  const dispatch = useDispatch();

  useEffect(() => {
    const currentPath = location.pathname;

    let activeParent = null;

    items.forEach((item) => {
      if (item.link === currentPath) {
        activeParent = item;
      } else if (
        item.children &&
        item.children.some((child) => child.link === currentPath)
      ) {
        activeParent = item;
      }
    });

    if (activeParent) {
      setSelectedKey(
        activeParent.children
          ? activeParent.children.find((child) => child.link === currentPath)
              ?.key || activeParent.key
          : activeParent.key
      );

      if (activeParent.children && !expandedKeys.includes(activeParent.key)) {
        setExpandedKeys([...expandedKeys, activeParent.key]);
      }
    }
  }, [location]);

  const onParentClick = (key) => {
    setExpandedKeys((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  // Logout Function
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="custom-sidebar h-[100vh] bg-white">
      <div className="custom-sidebar-logo flex justify-center">
        <img src={logo} alt="Logo" className="w-[50px] mt-3 mb-5" />
      </div>
      <div className="menu-items">
        {items.map((item) => {
          const isSettingsActive =
            item.key === "settings" &&
            item.children.some((child) => child.link === location.pathname);

          const isCreatorActive =
            item.key === "creatorManagement" &&
            item.children.some((child) => child.link === location.pathname);

          const isCategoriesActive =
            item.key === "categoriesManagement" &&
            item.children.some((child) => child.link === location.pathname);
          const Icon = icons[item.icon];
          return (
            <div key={item.key}>
              <Link
                to={item.link}
                className={`menu-item my-2 mr-3 py-[10px] px-3 flex items-center cursor-pointer ${
                  selectedKey === item.key ||
                  isSettingsActive ||
                  isCreatorActive ||
                  isCategoriesActive
                    ? "bg-[#D7B473] text-white rounded-r-3xl "
                    : "bg-white rounded-r-3xl hover:bg-gray-200"
                }`}
                onClick={(e) => {
                  if (item.children) {
                    e.preventDefault();
                    onParentClick(item.key);
                  } else {
                    setSelectedKey(item.key);
                  }
                }}
              >
                <h1 className="w-5 mr-2">
                  <Icon />
                </h1>

                <span className="block w-full ">{item.label}</span>

                {/* Show dropdown arrow if children exist */}
                {item.children && (
                  <FaChevronRight
                    className={`ml-auto transform transition-all text-[10px] duration-300 ${
                      expandedKeys.includes(item.key) ? "rotate-90" : ""
                    }`}
                  />
                )}
              </Link>

              {/* Show children menu if expanded */}
              {item.children && (
                <div
                  className={`children-menu bg-white ml-6 mx-2  transition-all duration-300 ${
                    expandedKeys.includes(item.key) ? "expanded" : ""
                  }`}
                  style={{
                    maxHeight: expandedKeys.includes(item.key)
                      ? `${contentRef.current[item.key]?.scrollHeight}px`
                      : "0",
                  }}
                  ref={(el) => (contentRef.current[item.key] = el)}
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.key}
                      to={child.link}
                      className={`menu-item p-2 flex items-center cursor-pointer ${
                        selectedKey === child.key
                          ? "bg-[#D7B473] text-white"
                          : "hover:bg-gray-200"
                      }`}
                      onClick={() => {
                        setSelectedKey(child.key); // Set the selected key for children
                        setExpandedKeys([]); // Close all expanded items
                      }}
                    >
                      <span className="block w-full ">{child.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Logout Button */}
      <div className="  w-full p-4 border-t mt-4">
        <button
          onClick={handleLogout}
          className="w-full flex  text-black text-start rounded-md  "
        >
          <span className="text-2xl">
            <IoIosLogIn />
          </span>
          <span className="ml-3">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default SidBar;
