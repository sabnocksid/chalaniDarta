import { useLocation } from 'react-router-dom';
import {FaHome} from 'react-icons/fa';

const Header = () => {
  const location = useLocation();
  
  const getPageTitle = (path) => {
    switch (path) {
      case '/':
        return <span className="text-blue-500 hover:underline cursor-pointer">Home</span>;
      case '/documents':
        return (
          <span>
            <span className="text-blue-500 hover:underline cursor-pointer">Home</span>
            <span className="mx-2"> &gt; </span>
            <span className="font-bold text-sm text-gray-700">कागजात व्यवस्थापन</span>
          </span>
        );
      case '/chalani':
        return (
          <span>
            <span className="text-blue-500 hover:underline cursor-pointer">Home</span>
            <span className="mx-2"> &gt; </span>
            <span className="font-bold text-sm text-gray-700">चलानी</span>
          </span>
        );
      case '/darta':
        return (
          <span>
            <span className="text-blue-500 hover:underline cursor-pointer">Home</span>
            <span className="mx-2"> &gt; </span>
            <span className="font-bold text-sm text-gray-700">दर्ता</span>
          </span>
        );
      case '/search':
        return (
          <span>
            <span className="text-blue-500 hover:underline cursor-pointer">Home</span>
          </span>
        );
      default:
        return <span>Page Not Found</span>;
    }
  };

  return (
    <div className="bg-gray-200 shadow-sm h-14 flex  p-3">
      <div className='HomeIcon p-2 text-gray-400 text-l'> <FaHome /></div>
      
      <h1 className="text-xl font-semibold text-gray-700">
        {getPageTitle(location.pathname)}
      </h1>
    </div>
  );
};

export default Header;


