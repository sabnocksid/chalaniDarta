import { useLocation } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const Header = () => {
  const location = useLocation();
  
  const getPageTitle = (path) => {
    switch (path) {
      case '/dashboard':
        return <a className="text-blue-500 hover:underline cursor-pointer font-bold" href="/">Home</a>;
      case '/documents':
        return (
          <span>
            <a className="text-blue-500 hover:underline cursor-pointer font-bold" href="/">Home</a>
            <span className="mx-2"> &gt; </span>
            <span className="font-bold text-sm text-gray-700">कागजात व्यवस्थापन</span>
          </span>
        );
      case '/chalani':
        return (
          <span>
            <a className="text-blue-500 hover:underline cursor-pointer font-bold" href="/">Home</a>
            <span className="mx-2"> &gt; </span>
            <span className="font-bold text-sm text-gray-700">चलानी</span>
          </span>
        );
      case '/darta':
        return (
          <span>
            <a className="text-blue-500 hover:underline cursor-pointe font-bold" href="/" >Home</a>
            <span className="mx-2"> &gt; </span>
            <span className="font-bold text-sm text-gray-700">दर्ता</span>
          </span>
        );
      case '/addDarta':
        return (
          <span>
            <a className="text-blue-500 hover:underline cursor-pointer font-bold" href="/" >Home</a>
            <span className="mx-2"> &gt; </span>
            <span className="font-bold text-sm text-gray-700">थप्नुहोस्</span>
          </span>
        );
      case '/addChalani':
        return (
          <span>
            <a className="text-blue-500 hover:underline cursor-pointer font-bold" href="/" >Home</a>
            <span className="mx-2"> &gt; </span>
            <span className="font-bold text-sm text-gray-700">थप्नुहोस्</span>
          </span>
        );
      case '/search':
        return (
          <span>
            <a className="text-blue-500 hover:underline cursor-pointer font-bold" href='/'>Home</a>
            <span className="mx-3"> &gt; </span>
            <span className="font-bold text-sm text-gray-700">अग्रिम खोज रिपोर्ट</span>
          </span>
        );
      case '/fiscalYear':
        return (
          <span>
            <a className="text-blue-500 hover:underline cursor-pointer font-bold" href='/'>Home</a>
            <span className="mx-3"> &gt; </span>
            <span className="font-bold text-sm text-gray-700">आर्थिक वर्ष</span>
          </span>
        );
        case '/documentType':
          return (
            <span>
              <a className="text-blue-500 hover:underline cursor-pointer font-bold" href='/'>Home</a>
              <span className="mx-3"> &gt; </span>
              <span className="font-bold text-sm text-gray-700">कागजात को प्रकार</span>
            </span>
          );
        case '/department':
          return (
            <span>
              <a className="text-blue-500 hover:underline cursor-pointer font-bold" href='/'>Home</a>
              <span className="mx-3"> &gt; </span>
              <span className="font-bold text-sm text-gray-700">शाखा</span>
            </span>
          );
        case '/office':
          return (
            <span>
              <a className="text-blue-500 hover:underline cursor-pointer font-bold" href='/'>Home</a>
              <span className="mx-3"> &gt; </span>
              <span className="font-bold text-sm text-gray-700">कार्यालय</span>
            </span>
          );
      default:
        return <span>Page Not Found</span>;
    }
  };

  return (     

    <div className="bg-gray-200 shadow-sm p-3 flex">
      <div className="flex pl-4">
      <div className='p-4 text-xl'>
      <FaHome />
      </div>
      <div className='p-4'>
      {getPageTitle(location.pathname)}
      </div>
      </div>
      </div>
  );
};

export default Header;
