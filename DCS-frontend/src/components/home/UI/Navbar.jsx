import  { useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { FaBell } from 'react-icons/fa';

const Navbar = () => {
  const [notificationCount, setNotificationCount] = useState(2); 
     
  return (
    <div className="Navbar bg-blue-500 w-full h-12 flex items-center justify-between px-10">
      {/* System Name */}
      <div className="SystemName flex-shrink-0">
        <h3 className="text-white text-sm font-bold">दर्ता चलानी System</h3>
      </div>
      

      {/* Welcome Message */}
      <div className="Welcome px-10">
        <h3 className="text-white text-sm font-bold">स्वागत छ Admin</h3>
      </div>
      

      {/* Logout Button */}
      <div className="logout px-10">
        <button className="flex items-center gap-2 text-white hover:bg-gray-700 py-2 px-4 rounded-md">
          Logout <FaSignOutAlt />
        </button>
      </div>
      <div className='px-13'></div>

      {/* Notification */}
      <div className="Notification flex items-center px-6 py-2">
        <div className="relative flex items-center">
          <FaBell className="Bell" /> 
          {notificationCount > 0 && (
            <span className="NotificationCount">
              {notificationCount}
            </span>
          )}
        </div>
        <h3 className="text-white px-3 font-bold">Notification</h3>
      </div>
    </div>
  );
};

export default Navbar;
