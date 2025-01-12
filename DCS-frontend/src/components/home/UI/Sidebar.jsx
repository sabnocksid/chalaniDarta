import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaHome, FaSearch, FaDownload, FaUpload, FaFileDownload, FaFileUpload, FaFile, FaBook, FaFolder, FaFolderOpen, FaCalendarAlt, FaRegBuilding, FaMapMarkerAlt, FaAngleLeft } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('');

  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setActiveItem('dashboard');
    else if (path === '/search') setActiveItem('search');
    else if (path === '/darta') setActiveItem('darta');
    else if (path === '/chalani') setActiveItem('chalani');
    else if (path === '/documents') setActiveItem('documents');
    else if (path === '/allDartaPapers') setActiveItem('allDartaPapers');
    else if (path === '#allProcessDocuments') setActiveItem('allProcessDocuments');
    else if (path === '#dms') setActiveItem('dms');
    else if (path === '#dmsArchive') setActiveItem('dmsArchive');
    else if (path === '#documentTypes') setActiveItem('documentTypes');
    else if (path === '#financialYear') setActiveItem('financialYear');
    else if (path === '#branch') setActiveItem('branch');
    else if (path === '#office') setActiveItem('office');
  }, [location]);

  return (
    <div className="sidebar bg-blue-500 w-1/5 h-100">
      <div className="sidebar__header flex">
        <div className="Logo p-5">
          <img src="Logo.png" alt="Logo" className="logoGOV" />
        </div>
        <div className="website-Name">
          <h1 className="font-bold text-xs mt-7">Government of Nepal</h1>
        </div>
      </div>
      <div className="sidebar-links mt-4">
        <ul className="flex flex-col">
          {[
            { id: 'dashboard', icon: <FaHome />, label: 'ड्यासबोर्ड', link: '/' },
            { id: 'search', icon: <FaSearch />, label: 'कागजातको खोजी', link: '/search' },
            { id: 'darta', icon: <FaDownload />, label: 'दर्ता', link: '/darta' },
            { id: 'chalani', icon: <FaUpload />, label: 'चलानी', link: '/chalani' },
            { id: 'documents', icon: <FaBook />, label: 'सबै पत्रहरू', link: '/documents' },
            { id: 'allRegisteredDocuments', icon: <FaFolder />, label: 'सबै दर्ता पत्रहरू', link: '#allRegisteredDocuments' },
            { id: 'allProcessDocuments', icon: <FaFolderOpen />, label: 'सबै चलानी पत्रहरू', link: '#allProcessDocuments' },
            { id: 'dms', icon: <FaFileDownload />, label: 'DMS', link: '#dms' },
            { id: 'dmsArchive', icon: <FaFileUpload />, label: 'DMS Archive', link: '#dmsArchive' },
            { id: 'documentTypes', icon: <FaFile />, label: 'कागजातको प्रकार', link: '#documentTypes' },
            { id: 'financialYear', icon: <FaCalendarAlt />, label: 'आर्थिक वर्ष', link: '#financialYear' },
            { id: 'branch', icon: <FaRegBuilding />, label: 'शाखा', link: '#branch' },
            { id: 'office', icon: <FaMapMarkerAlt />, label: 'कार्यालय', link: '#office' },
          ].map(({ id, icon, label, link }) => (
            <li key={id} className={`border-y border-gray-300 text-sm ${activeItem === id ? 'bg-gray-800' : ''}`}>
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
  );
};

export default Sidebar;
