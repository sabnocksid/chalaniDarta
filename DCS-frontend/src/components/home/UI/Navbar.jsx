import { useState } from "react";
import { FaSignOutAlt, FaBell } from "react-icons/fa";
import { Link } from 'react-router-dom';


const Navbar = () => {
  const [notificationCount, setNotificationCount] = useState(2);

  return (
<div className="flex items-center h-10 space-x-10 bg-blue-700">
  <div>
    
  </div>
  <div className="grow hidden lg:block">
  <h3 className="text-white font-semibold">स्वागत छ Admin</h3>
  </div>
  <div className="grow">
  <div className="flex text-white font-bold">
    <h3 className="hidden lg:block">Notificaton</h3>
  <div className="Notification flex items-center relative">
          <FaBell className="Bell" />
          {notificationCount > 0 && (
            <span className="NotificationCount">
              {notificationCount}
            </span>
          )}
        </div>
        </div>
  </div>
  <div className="flex-none">
  <Link to="/logout">
  <button className="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 py-2 px-4 rounded-md transition duration-200">
          <span className="hidden md:block">Logout</span>
          <FaSignOutAlt />
        </button>

    </Link>
    </div>

</div>
  );
};

export default Navbar;
