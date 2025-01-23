import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  FaHome,
  FaSearch,
  FaDownload,
  FaUpload,
  FaFile,
  FaBook,
  FaCalendarAlt,
  FaRegBuilding,
  FaMapMarkerAlt,
  FaBars,
  FaTimes,
  FaAngleLeft,
} from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/dashboard") setActiveItem("dashboard");
    else if (path === "/search") setActiveItem("search");
    else if (path === "/darta") setActiveItem("darta");
    else if (path === "/chalani") setActiveItem("chalani");
    else if (path === "/documents") setActiveItem("documents");
    else if (path === "/documentType") setActiveItem("documentTypes");
    else if (path === "/fiscalYear") setActiveItem("financialYear");
    else if (path === "/department") setActiveItem("branch");
    else if (path === "/office") setActiveItem("office");
  }, [location]);

  return (
    <div>
      <button
        className="text-white bg-blue-700 rounded-lg text-xl p-1 fixed top-2 left-0 z-50 md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div
        className={`fixed top-0 left-0 h-full bg-blue-500 z-40 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-1/5`}
      >
        <div className="bg-blue-700 text-center font-bold border-b-2 p-2">
          <h1 className="text-white">दर्ता चलानी System</h1>
        </div>
        <div className="sidebar__header flex items-center p-4 bg-blue-700">
          <img src="Logo.png" alt="Logo" className="logoGOV w-12 h-12" />
          <h1 className="text-white font-bold text-xs ml-2">Government of Nepal</h1>
        </div>

        <div className="sidebar-links">
          <ul className="flex flex-col">
            {[{
              id: "dashboard", icon: <FaHome />, label: "ड्यासबोर्ड", link: "/dashboard"
            }, {
              id: "search", icon: <FaSearch />, label: "कागजातको खोजी", link: "/search"
            }, {
              id: "darta", icon: <FaDownload />, label: "दर्ता", link: "/darta"
            }, {
              id: "chalani", icon: <FaUpload />, label: "चलानी", link: "/chalani"
            }, {
              id: "documents", icon: <FaBook />, label: "सबै पत्रहरू", link: "/documents"
            }, {
              id: "documentTypes", icon: <FaFile />, label: "कागजातको प्रकार", link: "/documentType"
            }, {
              id: "financialYear", icon: <FaCalendarAlt />, label: "आर्थिक वर्ष", link: "/fiscalYear"
            }, {
              id: "branch", icon: <FaRegBuilding />, label: "शाखा", link: "/department"
            }, {
              id: "office", icon: <FaMapMarkerAlt />, label: "कार्यालय", link: "/office"
            }].map(({ id, icon, label, link }) => (
              <li
                key={id}
                className={`border-y border-gray-300 text-md p-1 ${
                  activeItem === id ? "bg-gray-800" : ""
                }`}
              >
                <a
                  href={link}
                  className="flex items-center justify-start gap-2 py-2 px-4 text-white hover:bg-black"
                  onClick={() => setActiveItem(id)}
                >
                  {icon} {label}
                  {activeItem === id && <FaAngleLeft className="ml-auto" />}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
