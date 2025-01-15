import { useLocation } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const Header = () => {
  const location = useLocation();
  
  const getPageTitle = (path) => {
    switch (path) {
      case '/':
        return <a className="text-blue-500 hover:underline cursor-pointer" href="/">Home</a>;
      case '/documents':
        return (
          <span>
            <a className="text-blue-500 hover:underline cursor-pointer" href="/">Home</a>
            <span className="mx-2"> &gt; </span>
            <span className="font-bold text-sm text-gray-700">कागजात व्यवस्थापन</span>
          </span>
        );
      case '/chalani':
        return (
          <span>
            <a className="text-blue-500 hover:underline cursor-pointer" href="/">Home</a>
            <span className="mx-2"> &gt; </span>
            <span className="font-bold text-sm text-gray-700">चलानी</span>
          </span>
        );
      case '/darta':
        return (
          <span>
            <a className="text-blue-500 hover:underline cursor-pointer" href="/" >Home</a>
            <span className="mx-2"> &gt; </span>
            <span className="font-bold text-sm text-gray-700">दर्ता</span>
          </span>
        );
      case '/addDarta':
        return (
          <span>
            <a className="text-blue-500 hover:underline cursor-pointer" href="/" >Home</a>
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
      default:
        return <span>Page Not Found</span>;
    }
  };

  return (     

    <div className="bg-gray-200 shadow-sm p-3 flex">
      <div className='p-4 text-xl'>
      <FaHome />
      </div>
      <div className='p-4'>
      {getPageTitle(location.pathname)}
      </div>
      </div>
  );
};

export default Header;
